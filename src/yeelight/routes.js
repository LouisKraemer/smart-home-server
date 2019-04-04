const {
  GET_ALL,
  GET,
  SET_POWER_ENDPOINT,
  SET_NAME_ENDPOINT,
  SET_BRIGHT_ENDPOINT,
  SET_COLOR_TEMPERATURE,
  SET_RGB_COLOR
} = require("./constants");

const {
  getAllYeelights,
  getOneYeelight,
  setYeelightPower,
  setYeelightName,
  setYeelightBright,
  setYeelightColorTemperature,
  setYeelightRGBColor
} = require("./methods");

const yeelightRoutes = {
  [GET_ALL]: getAllYeelights,
  [GET]: getOneYeelight,
  [SET_POWER_ENDPOINT]: setYeelightPower,
  [SET_NAME_ENDPOINT]: setYeelightName,
  [SET_BRIGHT_ENDPOINT]: setYeelightBright,
  [SET_COLOR_TEMPERATURE]: setYeelightColorTemperature,
  [SET_RGB_COLOR]: setYeelightRGBColor
};

module.exports = {
  yeelightRoutes
};
