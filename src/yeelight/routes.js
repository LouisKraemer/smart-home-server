const {
  GET_ALL,
  GET,
  SET_POWER_ENDPOINT,
  SET_NAME_ENDPOINT,
  SET_BRIGHT_ENDPOINT
} = require("./constants");

const {
  getAllYeelights,
  getOneYeelight,
  setYeelightPower,
  setYeelightName,
  setYeelightBright
} = require("./methods");

const yeelightRoutes = {
  [GET_ALL]: getAllYeelights,
  [GET]: getOneYeelight,
  [SET_POWER_ENDPOINT]: setYeelightPower,
  [SET_NAME_ENDPOINT]: setYeelightName,
  [SET_BRIGHT_ENDPOINT]: setYeelightBright
};

module.exports = {
  yeelightRoutes
};
