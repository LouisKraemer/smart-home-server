import { Schema, model } from "mongoose";

const switchSchema = new Schema({
  switchId: String,
  yeelight: {
    type: Schema.Types.ObjectId,
    ref: "Yeelight"
  }
});

export const Switch = model("Switch", switchSchema);
