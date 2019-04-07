const mongoose = require("mongoose");
const { isNil } = require("ramda");

const Schema = mongoose.Schema;

const yeelightSchema = new Schema({
  deviceId: String,
  name: String,
  power: Boolean,
  bright: Number,
  rgb: Number,
  ct: Number,
  color_mode: Number,
  connected: Boolean
});

const Yeelight = mongoose.model("Yeelight", yeelightSchema);

const upsertYeelight = (deviceId, props) =>
  Yeelight.findOneAndUpdate({ deviceId }, props, { upsert: true }).exec();

const getYeelights = () =>
  Yeelight.find(
    {},
    "deviceId name power bright rgb connected ct color_mode"
  ).exec();

const getYeelight = ({ deviceId }) =>
  Yeelight.findOne(
    { deviceId },
    "deviceId name power bright rgb connected ct color_mode"
  ).exec();

module.exports = {
  upsertYeelight,
  getYeelight,
  getYeelights
};
