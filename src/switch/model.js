const mongoose = require("mongoose");
const { isNil } = require("ramda");

const Schema = mongoose.Schema;

const switchSchema = new Schema({
  switchId: String,
  yeelight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Yeelight"
  }
});

const Switch = mongoose.model("Switch", switchSchema);

const upsertSwitch = (switchId, props) =>
  Switch.findOneAndUpdate({ switchId }, props, { upsert: true }).exec();

const getSwitches = () => Switch.find().exec();

const getSwitchWithYeelight = switchId =>
  Switch.findOne({ switchId })
    .populate("yeelight")
    .exec();

module.exports = {
  upsertSwitch,
  getSwitchWithYeelight,
  getSwitches
};
