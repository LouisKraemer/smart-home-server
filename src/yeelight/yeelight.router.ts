import { yeelight } from "smart-home-config";

import {
  getAllYeelightsForUser,
  getOneYeelight,
  setPower,
  setBright,
  setName,
  setColorTemperature,
  setRGBColor
} from "./yeelight.workflows";

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
  [SET_POWER_ENDPOINT]: setPower,
  [SET_NAME_ENDPOINT]: setName,
  [SET_BRIGHT_ENDPOINT]: setBright,
  [SET_COLOR_TEMPERATURE]: setColorTemperature,
  [SET_RGB_COLOR]: setRGBColor
};
