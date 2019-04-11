let yeelights = {};

export const newYeelight = (id, yeelight) => {
  yeelights = { ...yeelights, [id]: yeelight };
};

export const getYeelightInstance = id => yeelights[id];
