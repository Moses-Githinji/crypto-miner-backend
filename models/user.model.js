import { Schema, model } from "mongoose";

const User = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 0 },
  role: { type: String, default: "user" }, // user or admin
});

export default model("User", User);