const { flatten, compose, pluck } = require("ramda");

const { getYeelights, getYeelight } = require("./model");
const { getRoomsForUser } = require("../room/model");
const {
  toggle,
  setPower,
  setName,
  setBright,
  setColorTemperature,
  setRGBColor
} = require("./actions");
const { GET_ALL, GET } = require("smart-home-config/yeelight");

const getAllYeelightsForUser = async ({ userId }) => {
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

const getOneYeelight = ({ deviceId }) =>
  getYeelight({ deviceId }).then(data => ({
    shouldRespond: true,
    payload: {
      type: GET,
      payload: data
    }
  }));

const toggleYeelight = deviceId => toggle({ deviceId });

const setYeelightPower = ({ deviceId, power }) => {
  setPower({ deviceId, power });
  return { shouldRespond: false };
};

const setYeelightName = ({ deviceId, name }) => {
  setName({ deviceId, name });
  return { shouldRespond: false };
};

const setYeelightBright = async ({ deviceId, bright }) => {
  const { power } = await getYeelight({ deviceId });
  if (!power) setPower({ deviceId, power: true });
  setBright({ deviceId, bright });
  return { shouldRespond: false };
};

const setYeelightColorTemperature = async ({ deviceId, ct }) => {
  const { power } = await getYeelight({ deviceId });
  if (!power) setPower({ deviceId, power: true });
  setColorTemperature({ deviceId, ct });
  return { shouldRespond: false };
};

const setYeelightRGBColor = async ({ deviceId, r, g, b }) => {
  const { power } = await getYeelight({ deviceId });
  if (!power) setPower({ deviceId, power: true });
  setRGBColor({ deviceId, r, g, b });
  return { shouldRespond: false };
};

module.exports = {
  getAllYeelightsForUser,
  getOneYeelight,
  toggleYeelight,
  setYeelightPower,
  setYeelightName,
  setYeelightBright,
  setYeelightColorTemperature,
  setYeelightRGBColor
};
