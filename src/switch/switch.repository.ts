import { Switch } from "./swicth.model";

export const upsertSwitch = (switchId, props) =>
  Switch.findOneAndUpdate({ switchId }, props, { upsert: true }).exec();

export const getSwitches = () => Switch.find().exec();

export const getSwitchWithYeelight = switchId =>
  Switch.findOne({ switchId })
    .populate("yeelight")
    .exec();
