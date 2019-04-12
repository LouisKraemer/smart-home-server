import { flatten, compose, pluck } from "ramda";

import { getYeelight } from "./yeelight.repository";
import { IYeelight, IYeelightResponse } from "./yeelight.interfaces";
import { getYeelightInstance } from "./yeelight.store";
import { getRoomsForUser } from "../room";
import { GET_ALL, GET } from "smart-home-config/yeelight";
import { Color } from "yeelight-awesome";

const EFFECT = "smooth";

export const getAllYeelightsForUser = async ({
  userId
}): Promise<IYeelightResponse> => {
  const rooms = await getRoomsForUser(userId);
  const yeelights = compose(
    flatten,
    //@ts-ignore
    pluck("yeelights")
  )(rooms);
  return {
    shouldRespond: true,
    payload: {
      type: GET_ALL,
      payload: yeelights
    }
  };
};

export const getOneYeelight = ({ deviceId }) =>
  getYeelight({ deviceId }).then(data => ({
    shouldRespond: true,
    payload: {
      type: GET,
      payload: data
    }
  }));

export const toggle = (deviceId: string): void => {
  const yeelight = getYeelightInstance(deviceId);
  yeelight.toggle();
};

export const setPower = async ({
  deviceId,
  power
}: Partial<IYeelight>): Promise<IYeelightResponse> => {
  const yeelight = getYeelightInstance(deviceId);
  await yeelight.setPower(power, EFFECT);
  return { shouldRespond: false };
};

export const setName = async ({
  deviceId,
  name
}: Partial<IYeelight>): Promise<IYeelightResponse> => {
  const yeelight = getYeelightInstance(deviceId);
  await yeelight.setName(name);
  return { shouldRespond: false };
};

export const setBright = async ({
  deviceId,
  bright
}: Partial<IYeelight>): Promise<IYeelightResponse> => {
  const yeelight = getYeelightInstance(deviceId);
  const { power: currentPower } = await getYeelight({ deviceId });
  if (!currentPower) await yeelight.setPower(true, EFFECT);
  await yeelight.setBright(bright, EFFECT);
  return { shouldRespond: false };
};

export const setColorTemperature = async ({
  deviceId,
  ct
}: Partial<IYeelight>): Promise<IYeelightResponse> => {
  const yeelight = getYeelightInstance(deviceId);
  const { power: currentPower } = await getYeelight({ deviceId });
  if (!currentPower) yeelight.setPower(true, EFFECT);
  await yeelight.setCtAbx(ct, EFFECT);
  return { shouldRespond: false };
};

export const setRGBColor = async ({
  deviceId,
  r,
  g,
  b
}: {
  deviceId: string;
  r: number;
  g: number;
  b: number;
}): Promise<IYeelightResponse> => {
  const yeelight = getYeelightInstance(deviceId);
  const { power: currentPower } = await getYeelight({ deviceId });
  if (!currentPower) yeelight.setPower(true, EFFECT);
  await yeelight.setRGB(new Color(r, g, b), EFFECT);
  return { shouldRespond: false };
};
