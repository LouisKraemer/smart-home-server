const mqtt = require("mqtt");

const { getSwitches, getSwitchWithYeelight } = require("../switch/model");
const { getSwitchIdFromTopic, getActionFromMessage } = require("./adapter");
const { switchRoutes } = require("./routes");

initMQTT = async () => {
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

module.exports = { initMQTT };
