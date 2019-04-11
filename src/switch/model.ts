import * as mongoose from "mongoose";
import { isNil } from "ramda";

const Schema = mongoose.Schema;

const switchSchema = new Schema({
  switchId: String,
  yeelight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Yeelight"
  }
});

const Switch = mongoose.model("Switch", switchSchema);

export const upsertSwitch = (switchId, props) =>
  Switch.findOneAndUpdate({ switchId }, props, { upsert: true }).exec();

export const getSwitches = () => Switch.find().exec();

export const getSwitchWithYeelight = switchId =>
  Switch.findOne({ switchId })
    .populate("yeelight")
    .exec();
