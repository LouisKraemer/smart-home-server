const {
  BRIGHT,
  RGB,
  PROPS,
  POWER,
  COLOR_TEMPERATURE,
  COLOR_MODE
} = require("./constants");

const { getRoomFromYeelight } = require("./model");

const formatProps = properties =>
  properties.reduce((yeelight, currentProp, currentIndex) => {
    const propName = PROPS[currentIndex];
    if (propName === POWER)
      return { ...yeelight, [POWER]: currentProp === "on" };
    if (
      propName === RGB ||
      propName === BRIGHT ||
      propName === COLOR_TEMPERATURE ||
      propName === COLOR_MODE
    )
      return { ...yeelight, [propName]: parseInt(currentProp) };
    return { ...yeelight, [propName]: currentProp };
  }, {});

const getPower = params => params[0] === "on";

const getName = params => params[0];

const getBright = params => params[0];

const getColorTemperature = params => params[0];

const getRBGColor = params => params[0];

const isUserAllowedToReceiveUpdates = async (deviceId, userId) => {
  const {
    room: { users }
  } = await getRoomFromYeelight(deviceId);
  return users.filter(user => user.equals(userId)).length !== 0;
};

module.exports = {
  formatProps,
  getPower,
  getName,
  getBright,
  getColorTemperature,
  getRBGColor,
  isUserAllowedToReceiveUpdates
};
