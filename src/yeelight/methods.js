const { getYeelights, getYeelight } = require("./model");
const {
  setPower,
  setName,
  setBright,
  setColorTemperature
} = require("./actions");
const { GET_ALL, GET } = require("./constants");

const getAllYeelights = () =>
  getYeelights().then(data => ({
    shouldRespond: true,
    payload: {
      endpoint: GET_ALL,
      payload: data
    }
  }));

const getOneYeelight = ({ deviceId }) =>
  getYeelight({ deviceId }).then(data => ({
    shouldRespond: true,
    payload: {
      endpoint: GET,
      payload: data
    }
  }));

const setYeelightPower = ({ deviceId, power }) => {
  setPower({ deviceId, power });
  return { shouldRespond: false };
};

const setYeelightName = ({ deviceId, name }) => {
  setName({ deviceId, name });
  return { shouldRespond: false };
};

const setYeelightBright = ({ deviceId, bright }) => {
  getYeelight({ deviceId })
    .then(({ power }) => {
      if (!power) return setPower({ deviceId, power: true });
      return Promise.resolve();
    })
    .then(() => setBright({ deviceId, bright }));
  return { shouldRespond: false };
};

const setYeelightColorTemperature = async ({ deviceId, colorTemperature }) => {
  const { power } = await getYeelight({ deviceId });
  if (!power) setPower({ deviceId, power: true });
  setColorTemperature({ deviceId, colorTemperature });
  return { shouldRespond: false };
};

module.exports = {
  getAllYeelights,
  getOneYeelight,
  setYeelightPower,
  setYeelightName,
  setYeelightBright,
  setYeelightColorTemperature
};
