export { upsertSwitch } from "./switch.repository";

import { connect } from "mqtt";

import { getSwitches, getSwitchWithYeelight } from "./switch.repository";
import { getSwitchIdFromTopic, getActionFromMessage } from "./switch.adapter";
import { switchRoutes } from "./switch.router";

export const initMQTT = async () => {
  const switches = await getSwitches();
  const client = connect(`mqtt://${process.env.MQTT_HOST}`);
  client.on("connect", () => {
    //@ts-ignore
    switches.map(({ switchId }) => {
      client.subscribe(`zigbee2mqtt/${switchId}`);
    });
  });
  client.on("message", async (topic, message) => {
    const switchId = getSwitchIdFromTopic(topic);
    const action = getActionFromMessage(message);
    const {
      //@ts-ignore
      yeelight: { deviceId }
    } = await getSwitchWithYeelight(switchId);
    switchRoutes[action] && switchRoutes[action](deviceId);
  });
};
