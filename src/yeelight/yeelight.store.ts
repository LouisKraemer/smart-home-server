import { Yeelight } from "yeelight-awesome";

let yeelights = {};

export const newYeelightInstance = (id: string, yeelight: Yeelight): void => {
  yeelights = { ...yeelights, [id]: yeelight };
};

export const getYeelightInstance = (id: string): Yeelight => yeelights[id];
