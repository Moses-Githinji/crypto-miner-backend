import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import MiningStat from "../models/miningStat.model.js";
import Transaction from "../models/transaction.model.js";

const router = express.Router()

router.use((req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json("Unauthorized");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json("Unauthorized");
    if (decoded.role !== "admin") return res.status(403).json("Forbidden");
    req.userId = decoded.id;
    next();
  });
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.get("/stats", async (req, res) => {
  try {
    const stats = await MiningStat();
    res.json(stats);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction();
    res.json(transactions);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

export default router;
