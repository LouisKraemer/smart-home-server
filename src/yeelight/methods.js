const { getYeelights, getYeelight } = require("./model");
const { setPower, setName, setBright } = require("./actions");
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
  setBright({ deviceId, bright });
  return { shouldRespond: false };
};

module.exports = {
  getAllYeelights,
  getOneYeelight,
  setYeelightPower,
  setYeelightName,
  setYeelightBright
};
