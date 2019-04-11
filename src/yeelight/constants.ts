import { DevicePropery } from "yeelight-awesome";

const { BRIGHT, POWER, NAME, RGB, CT, COLOR_MODE } = DevicePropery;

export const PROPS = [POWER, NAME, BRIGHT, RGB, CT, COLOR_MODE];

export const SET_POWER = "set_power";
export const SET_BRIGHT = "set_bright";
export const SET_NAME = "set_name";
export const SET_RGB = "set_rgb";
export const GET_PROPS = "get_prop";
export const SET_CT_ABX = "set_ct_abx";
