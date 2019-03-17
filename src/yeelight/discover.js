const y = require("yeelight-awesome");

const { formatProps, getPower, getName, getBright } = require("./utils");

const { upsertYeelight } = require("./model");
const { newYeelight } = require("./store");
const { broadcast } = require("../websocket");

const {
  PROPS,
  GET_PROPS,
  SET_BRIGHT,
  SET_NAME,
  SET_POWER,
  SET_RGB,
  GET
} = require("./constants");

const broadcastNewYeelightState = (deviceId, newState) =>
  broadcast(
    JSON.stringify({
      endpoint: GET,
      payload: { deviceId, ...newState }
    })
  );

const discoverYeelight = () => {
  console.log("Discovering yeelights");
  const discover = new y.Discover({
    port: 1982,
    debug: true
  });
  discover.on("deviceAdded", device => {
    if (device.id === "0x0000000007dd1760") {
      const yeelight = new y.Yeelight({
        lightIp: device.host,
        lightPort: device.port
      });

      yeelight.autoReconnect = true;

      yeelight.on(GET_PROPS, ({ success, result }) => {
        if (success) {
          const formatedProperties = formatProps(result.result);
          upsertYeelight(device.id, formatedProperties).then(
            broadcastNewYeelightState(device.id, formatedProperties)
          );
        }
      });

      yeelight.on(SET_BRIGHT, ({ success, command: { params } }) => {
        if (success) {
          const bright = getBright(params);
          upsertYeelight(device.id, { bright }).then(data =>
            broadcastNewYeelightState(device.id, { bright })
          );
        }
      });

      yeelight.on(SET_NAME, ({ success, command: { params } }) => {
        if (success) {
          const name = getName(params);
          upsertYeelight(device.id, { name }).then(data =>
            broadcastNewYeelightState(device.id, { name })
          );
        }
      });

      yeelight.on(SET_POWER, ({ success, command: { params } }) => {
        if (success) {
          const power = getPower(params);
          upsertYeelight(device.id, { power }).then(data =>
            broadcastNewYeelightState(device.id, { power })
          );
        }
      });

      yeelight.on(SET_RGB, data => console.log(SET_RGB, data));

      yeelight.on("connected", () => {
        console.log(`Yeelight ${device.id} connected`);
        upsertYeelight(device.id, { connected: true }).then(() =>
          newYeelight(device.id, yeelight)
        );
      });

      yeelight.on("disconnected", () => {
        upsertYeelight(device.id, { connected: false });
        console.log(`Yeelight ${device.id} disconnected`);
      });

      yeelight
        .connect()
        .then(() => yeelight.getProperty(PROPS))
        .then(() => upsertYeelight(device.id, { connected: true }));
      // .then(formatProps)
      // .then(data => console.log("data", data));
      // .then(() => addYeelight(device.id, {}));
    }
  });

  discover.start();
};

module.exports = { discoverYeelight };
