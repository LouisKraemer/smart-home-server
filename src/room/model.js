const mongoose = require("mongoose");
const { isNil } = require("ramda");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: String,
  roomId: String,
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

const upsertRoomWithUsersAndYeelight = (roomId, users, yeelights) =>
  Room.findOneAndUpdate(
    { roomId },
    { users, yeelights },
    { upsert: true }
  ).exec();

module.exports = {
  createRoom,
  upsertRoomWithUsersAndYeelight
};
