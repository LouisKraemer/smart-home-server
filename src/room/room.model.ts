import { Schema, model } from "mongoose";

const roomSchema = new Schema({
  name: String,
  roomId: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  yeelights: [
    {
      type: Schema.Types.ObjectId,
      ref: "Yeelight"
    }
  ]
});

export const Room = model("Room", roomSchema);
