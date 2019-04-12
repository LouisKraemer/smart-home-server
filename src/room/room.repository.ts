import { Room } from "./room.model";

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
