const { BRIGHT, RGB, PROPS, POWER } = require("./constants");

const formatProps = properties =>
  properties.reduce((yeelight, currentProp, currentIndex) => {
    const propName = PROPS[currentIndex];
    if (propName === POWER)
      return { ...yeelight, [POWER]: currentProp === "on" };
    if (propName === RGB || propName === BRIGHT)
      return { ...yeelight, [propName]: parseInt(currentProp) };
    return { ...yeelight, [propName]: currentProp };
  }, {});

const getPower = params => params[0] === "on";

const getName = params => params[0];

const getBright = params => params[0];

module.exports = {
  formatProps,
  getPower,
  getName,
  getBright
};
