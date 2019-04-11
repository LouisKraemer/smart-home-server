import * as mongoose from "mongoose";
import { isNil } from "ramda";

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

export const createRoom = room => new Room(room).save();

export const upsertRoomWithUsersAndYeelight = (roomId, users, yeelights) =>
  Room.findOneAndUpdate(
    { roomId },
    { users, yeelights },
    { upsert: true }
  ).exec();

export const getRoomsForUser = userId =>
  Room.find({ users: userId })
    .populate("yeelights")
    .exec();
