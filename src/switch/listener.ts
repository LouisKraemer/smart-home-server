import * as mqtt from "mqtt";

import { getSwitches, getSwitchWithYeelight } from "../switch/model";
import { getSwitchIdFromTopic, getActionFromMessage } from "./adapter";
import { switchRoutes } from "./routes";

export const initMQTT = async () => {
  const switches = await getSwitches();
  const client = mqtt.connect(`mqtt://${process.env.MQTT_HOST}`);
  client.on("connect", () => {
    switches.map(({ switchId }) => {
      client.subscribe(`zigbee2mqtt/${switchId}`);
    });
  });
  client.on("message", async (topic, message) => {
    const switchId = getSwitchIdFromTopic(topic);
    const action = getActionFromMessage(message);
    const {
      yeelight: { deviceId }
    } = await getSwitchWithYeelight(switchId);
    switchRoutes[action] && switchRoutes[action](deviceId);
  });
};
