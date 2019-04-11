import { DevicePropery } from "yeelight-awesome";

import { PROPS } from "./constants";

const { BRIGHT, RGB, POWER, CT, COLOR_MODE } = DevicePropery;

import { getRoomFromYeelight } from "./model";

export const formatProps = properties =>
  properties.reduce((yeelight, currentProp, currentIndex) => {
    const propName = PROPS[currentIndex];
    if (propName === POWER)
      return { ...yeelight, [POWER]: currentProp === "on" };
    if (
      propName === RGB ||
      propName === BRIGHT ||
      propName === CT ||
      propName === COLOR_MODE
    )
      return { ...yeelight, [propName]: parseInt(currentProp) };
    return { ...yeelight, [propName]: currentProp };
  }, {});

export const getPower = params => params[0] === "on";

export const getName = params => params[0];

export const getBright = params => params[0];

export const getColorTemperature = params => params[0];

export const getRBGColor = params => params[0];

export const isUserAllowedToReceiveUpdates = async (deviceId, userId) => {
  const {
    room: { users }
  } = await getRoomFromYeelight(deviceId);
  return users.filter(user => user.equals(userId)).length !== 0;
};
