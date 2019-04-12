import { Schema, Document, Model, model } from "mongoose";

import { IYeelight } from "./yeelight.interfaces";

export interface IYeelightModel extends IYeelight, Document {}

const yeelightSchema: Schema = new Schema({
  deviceId: String,
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room"
  },
  name: String,
  power: Boolean,
  bright: Number,
  rgb: Number,
  ct: Number,
  color_mode: Number,
  connected: Boolean
});

export const Yeelight: Model<IYeelightModel> = model<IYeelightModel>(
  "Yeelight",
  yeelightSchema
);
