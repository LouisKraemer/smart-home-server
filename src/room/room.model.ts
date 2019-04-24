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

const test = "oui";

export const Room = model("Room", roomSchema);
