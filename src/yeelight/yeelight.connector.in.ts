import {
  Yeelight,
  Discover,
  IDevice,
  IEventResult,
  CommandType
} from "yeelight-awesome";

import {
  formatProps,
  getPower,
  getName,
  getBright,
  getColorTemperature,
  getRBGColor
} from "./yeelight.adapter";

import { upsertYeelight } from "./yeelight.repository";
import { newYeelightInstance } from "./yeelight.store";
import { broadcastNewYeelightState } from "./yeelight.connector.out";
import { PROPS } from "./yeelight.constants";

const {
  GET_PROPS,
  SET_BRIGHT,
  SET_NAME,
  SET_POWER,
  SET_RGB,
  SET_CT_ABX,
  TOGGLE
} = CommandType;

export const discoverYeelight = () => {
  console.log("Discovering yeelights");
  const discover: Discover = new Discover({
    port: 1982,
    debug: true,
    fallback: false
  });
  discover.on("deviceAdded", async (device: IDevice) => {
    const yeelight: Yeelight = new Yeelight({
      lightIp: device.host,
      lightPort: device.port
    });

    yeelight.autoReconnect = true;

    yeelight.on(
      GET_PROPS,
      async ({ success, result }: IEventResult): Promise<void> => {
        if (success) {
          const formatedProperties = formatProps(result.result);
          await upsertYeelight(device.id, formatedProperties);
          broadcastNewYeelightState(device.id, formatedProperties);
        }
      }
    );

    yeelight.on(
      SET_BRIGHT,
      async ({ success, command: { params } }: IEventResult): Promise<void> => {
        if (success) {
          const bright = getBright(params);
          await upsertYeelight(device.id, { bright });
          broadcastNewYeelightState(device.id, { bright });
        }
      }
    );

    yeelight.on(
      SET_NAME,
      async ({ success, command: { params } }: IEventResult): Promise<void> => {
        if (success) {
          const name = getName(params);
          await upsertYeelight(device.id, { name });
          broadcastNewYeelightState(device.id, { name });
        }
      }
    );

    yeelight.on(
      SET_POWER,
      async ({ success, command: { params } }: IEventResult): Promise<void> => {
        if (success) {
          const power = getPower(params);
          await upsertYeelight(device.id, { power });
          broadcastNewYeelightState(device.id, { power });
        }
      }
    );

    yeelight.on(
      SET_CT_ABX,
      async ({ success, command: { params } }: IEventResult): Promise<void> => {
        if (success) {
          const ct = getColorTemperature(params);
          await upsertYeelight(device.id, { ct, color_mode: 2 });
          broadcastNewYeelightState(device.id, { ct, color_mode: 2 });
        }
      }
    );

    yeelight.on(
      SET_RGB,
      async ({ success, command: { params } }: IEventResult): Promise<void> => {
        if (success) {
          const rgb = getRBGColor(params);
          await upsertYeelight(device.id, { rgb, color_mode: 1 });
          broadcastNewYeelightState(device.id, { rgb, color_mode: 1 });
        }
      }
    );

    yeelight.on("connected", async () => {
      console.log(`Yeelight ${device.id} connected`);
      await upsertYeelight(device.id, { connected: true });
      newYeelightInstance(device.id, yeelight);
    });

    yeelight.on("disconnected", () => {
      upsertYeelight(device.id, { connected: false });
      console.log(`Yeelight ${device.id} disconnected`);
    });
    await yeelight.connect();
    yeelight.getProperty(PROPS);
  });

  discover.start();
};
