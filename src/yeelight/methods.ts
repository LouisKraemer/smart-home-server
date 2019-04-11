import { flatten, compose, pluck } from "ramda";

import { getYeelights, getYeelight } from "./model";
import { getRoomsForUser } from "../room/model";
import {
  toggle,
  setPower,
  setName,
  setBright,
  setColorTemperature,
  setRGBColor
} from "./actions";
import { GET_ALL, GET } from "smart-home-config/yeelight";

export const getAllYeelightsForUser = async ({ userId }) => {
  const rooms = await getRoomsForUser(userId);
  const yeelights = compose(
    flatten,
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

export const toggleYeelight = deviceId => toggle({ deviceId });

export const setYeelightPower = ({ deviceId, power }) => {
  setPower({ deviceId, power });
  return { shouldRespond: false };
};

export const setYeelightName = ({ deviceId, name }) => {
  setName({ deviceId, name });
  return { shouldRespond: false };
};

export const setYeelightBright = async ({ deviceId, bright }) => {
  const { power } = await getYeelight({ deviceId });
  if (!power) setPower({ deviceId, power: true });
  setBright({ deviceId, bright });
  return { shouldRespond: false };
};

export const setYeelightColorTemperature = async ({ deviceId, ct }) => {
  const { power } = await getYeelight({ deviceId });
  if (!power) setPower({ deviceId, power: true });
  setColorTemperature({ deviceId, ct });
  return { shouldRespond: false };
};

export const setYeelightRGBColor = async ({ deviceId, r, g, b }) => {
  const { power } = await getYeelight({ deviceId });
  if (!power) setPower({ deviceId, power: true });
  setRGBColor({ deviceId, r, g, b });
  return { shouldRespond: false };
};
