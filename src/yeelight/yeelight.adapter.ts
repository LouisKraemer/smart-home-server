import { DevicePropery } from "yeelight-awesome";

import { PROPS } from "./yeelight.constants";

const { BRIGHT, RGB, POWER, CT, COLOR_MODE } = DevicePropery;

import { getRoomFromYeelight } from "./yeelight.repository";

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

export const getPower = (params: any[]): boolean => params[0] === "on";

export const getName = (params: any[]): string => params[0];

export const getBright = (params: any[]): number => parseInt(params[0]);

export const getColorTemperature = (params: any[]): number =>
  parseInt(params[0]);

export const getRBGColor = (params: any[]): number => parseInt(params[0]);

export const isUserAllowedToReceiveUpdates = async (
  deviceId: string,
  userId: string
): Promise<boolean> => {
  const {
    room: { users }
  } = await getRoomFromYeelight(deviceId);
  return users.filter(user => user.equals(userId)).length !== 0;
};
