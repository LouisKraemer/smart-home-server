import * as mongoose from "mongoose";
import { isNil } from "ramda";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  pseudo: String,
  password: String,
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room"
    }
  ]
});

const User = mongoose.model("User", userSchema);

export const createUser = user => new User(user).save();

export const findUserByPseudo = pseudo => User.findOne({ pseudo }).exec();

export const findUserById = id => User.findById(id).exec();

export const upsertUserWithRoom = (id, roomId) =>
  User.findByIdAndUpdate(id, { $push: { rooms: roomId } });
