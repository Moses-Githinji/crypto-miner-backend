import { Schema, model } from "mongoose";

const MiningStat = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  hashRate: { type: Number, required: true },
  totalMined: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default model("MiningStat", MiningStat);