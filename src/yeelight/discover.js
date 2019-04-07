const y = require("yeelight-awesome");

const {
  formatProps,
  getPower,
  getName,
  getBright,
  getColorTemperature,
  getRBGColor
} = require("./utils");

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
  GET,
  SET_CT_ABX
} = require("./constants");

const broadcastNewYeelightState = (deviceId, newState) =>
  broadcast(
    JSON.stringify({
      type: GET,
      payload: { deviceId, ...newState }
    })
  );

const discoverYeelight = () => {
  console.log("Discovering yeelights");
  const discover = new y.Discover({
    port: 1982,
    debug: true,
    fallback: false
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
          upsertYeelight(device.id, { bright }).then(() =>
            broadcastNewYeelightState(device.id, { bright })
          );
        }
      });

      yeelight.on(SET_NAME, ({ success, command: { params } }) => {
        if (success) {
          const name = getName(params);
          upsertYeelight(device.id, { name }).then(() =>
            broadcastNewYeelightState(device.id, { name })
          );
        }
      });

      yeelight.on(SET_POWER, ({ success, command: { params } }) => {
        if (success) {
          const power = getPower(params);
          upsertYeelight(device.id, { power }).then(() =>
            broadcastNewYeelightState(device.id, { power })
          );
        }
      });

      yeelight.on(SET_CT_ABX, ({ success, command: { params } }) => {
        if (success) {
          const ct = getColorTemperature(params);
          upsertYeelight(device.id, { ct, color_mode: 2 }).then(() =>
            broadcastNewYeelightState(device.id, { ct, color_mode: 2 })
          );
        }
      });

      yeelight.on(SET_RGB, ({ success, command: { params } }) => {
        if (success) {
          const rgb = getRBGColor(params);
          upsertYeelight(device.id, { rgb, color_mode: 1 }).then(() =>
            broadcastNewYeelightState(device.id, { rgb, color_mode: 1 })
          );
        }
      });

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
