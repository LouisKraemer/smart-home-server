const { getYeelightInstance } = require("./store");

const { Color } = require("yeelight-awesome");

const EFFECT = "smooth";

const setPower = ({ deviceId, power }) => {
  const yeelight = getYeelightInstance(deviceId);
  if (yeelight) yeelight.setPower(power, EFFECT);
};

const setName = ({ deviceId, name }) => {
  const yeelight = getYeelightInstance(deviceId);
  if (yeelight) yeelight.setName(name);
};

const setBright = ({ deviceId, bright }) => {
  const yeelight = getYeelightInstance(deviceId);
  if (yeelight) yeelight.setBright(bright, EFFECT);
};

const setColorTemperature = ({ deviceId, colorTemperature }) => {
  const yeelight = getYeelightInstance(deviceId);
  if (yeelight) yeelight.setCtAbx(colorTemperature, EFFECT);
};

const setRGBColor = ({ deviceId, r, g, b }) => {
  const yeelight = getYeelightInstance(deviceId);
  if (yeelight) yeelight.setRGB(new Color(r, g, b), EFFECT);
};

module.exports = {
  setPower,
  setName,
  setBright,
  setColorTemperature,
  setRGBColor
};
