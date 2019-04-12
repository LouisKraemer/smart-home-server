import { User } from "./user.model";

export const createUser = user => new User(user).save();

export const findUserByPseudo = pseudo => User.findOne({ pseudo }).exec();

export const findUserById = id => User.findById(id).exec();

export const upsertUserWithRoom = (id, roomId) =>
  User.findByIdAndUpdate(id, { $push: { rooms: roomId } });
