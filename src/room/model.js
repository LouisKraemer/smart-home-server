const mongoose = require("mongoose");
const { isNil } = require("ramda");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  yeelights: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Yeelight"
    }
  ]
});

const Room = mongoose.model("Room", roomSchema);

const createRoom = room => new Room(room).save();

const getUsersFromRoom = roomId =>
  Room.findById({ id: roomId })
    .populate("users")
    .exec();

const getYeelightsFromRoom = roomId =>
  Room.findById({ id: roomId })
    .populate("yeelights")
    .exec();

module.exports = {
  createRoom,
  getUsersFromRoom,
  getYeelightsFromRoom
};
