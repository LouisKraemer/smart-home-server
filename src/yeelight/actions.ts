import { getYeelightInstance } from "./store";

import { Color } from "yeelight-awesome";

const EFFECT = "smooth";

export const toggle = ({ deviceId }) => {
  const yeelight = getYeelightInstance(deviceId);
  if (yeelight) yeelight.toggle();
};

export const setPower = ({ deviceId, power }) => {
  const yeelight = getYeelightInstance(deviceId);
  if (yeelight) yeelight.setPower(power, EFFECT);
};

export const setName = ({ deviceId, name }) => {
  const yeelight = getYeelightInstance(deviceId);
  if (yeelight) yeelight.setName(name);
};

export const setBright = ({ deviceId, bright }) => {
  const yeelight = getYeelightInstance(deviceId);
  if (yeelight) yeelight.setBright(bright, EFFECT);
};

export const setColorTemperature = ({ deviceId, ct }) => {
  const yeelight = getYeelightInstance(deviceId);
  if (yeelight) yeelight.setCtAbx(ct, EFFECT);
};

export const setRGBColor = ({ deviceId, r, g, b }) => {
  const yeelight = getYeelightInstance(deviceId);
  if (yeelight) yeelight.setRGB(new Color(r, g, b), EFFECT);
};
