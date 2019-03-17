const { getYeelightInstance } = require("./store");

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

module.exports = {
  setPower,
  setName,
  setBright
};
