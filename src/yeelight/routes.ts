import { yeelight } from "smart-home-config";

import {
  getAllYeelightsForUser,
  getOneYeelight,
  setYeelightPower,
  setYeelightName,
  setYeelightBright,
  setYeelightColorTemperature,
  setYeelightRGBColor
} from "./methods";

const {
  GET_ALL,
  GET,
  SET_POWER_ENDPOINT,
  SET_NAME_ENDPOINT,
  SET_BRIGHT_ENDPOINT,
  SET_COLOR_TEMPERATURE,
  SET_RGB_COLOR
} = yeelight;

export const yeelightRoutes = {
  [GET_ALL]: getAllYeelightsForUser,
  [GET]: getOneYeelight,
  [SET_POWER_ENDPOINT]: setYeelightPower,
  [SET_NAME_ENDPOINT]: setYeelightName,
  [SET_BRIGHT_ENDPOINT]: setYeelightBright,
  [SET_COLOR_TEMPERATURE]: setYeelightColorTemperature,
  [SET_RGB_COLOR]: setYeelightRGBColor
};
