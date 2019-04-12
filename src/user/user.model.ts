import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  pseudo: String,
  password: String,
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room"
    }
  ]
});

export const User = model("User", userSchema);
