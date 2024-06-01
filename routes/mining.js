import express from "express";
import MiningStat from "../models/miningStat.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";

const router = express.Router()

router.use((req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json("Unauthorized");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json("Unauthorized");
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
});

router.get("/stats", async (req, res) => {
  try {
    const stats = await MiningStat.find({ userId: req.userId });
    res.json(stats);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.post("/stats", async (req, res) => {
  try {
    const { hashRate, totalMined } = req.body;
    const newStat = new MiningStat({
      userId: req.userId,
      hashRate,
      totalMined,
    });
    await newStat.save();
    res.status(201).json("Mining stat added!");
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.post("/sell", async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.userId);
    if (user.balance < amount) {
      return res.status(400).json("Insufficient balance");
    }

    // Assuming integration with an exchange API to sell mined cryptocurrency
    const sellResponse = await axios.post("https://api.exchange.com/sell", {
      amount,
    });
    if (sellResponse.status !== 200) {
      return res.status(400).json("Error selling cryptocurrency");
    }

    user.balance -= amount;
    await user.save();

    const transaction = new Transaction({
      userId: req.userId,
      amount,
      type: "debit",
    });
    await transaction.save();

    res.json("Cryptocurrency sold successfully");
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

export default router;
