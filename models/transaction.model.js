import { Schema, model } from "mongoose";

const Transaction = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true }, // 'credit' or 'debit'
  timestamp: { type: Date, default: Date.now },
});

export default model("Transaction", Transaction);
