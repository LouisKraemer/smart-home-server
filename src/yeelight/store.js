let yeelights = {};

const newYeelight = (id, yeelight) => {
  yeelights = { ...yeelights, [id]: yeelight };
};

const getYeelightInstance = id => yeelights[id];

module.exports = { newYeelight, getYeelightInstance };
