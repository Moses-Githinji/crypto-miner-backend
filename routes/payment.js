import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router()

router.use((req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json("Unauthorized");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json("Unauthorized");
    req.userId = decoded.id;
    next();
  });
});

router.post("/checkout", async (req, res) => {
  try {
    const { amount, token } = req.body;
    const user = await User.findById(req.userId);

    // const charge = await stripe.charges.create({
    //   amount: amount * 100,
    //   currency: "usd",
    //   description: "Crypto Mining Payment",
    //   source: token.id,
    // });

    await stripe.charges.create({
      amount: amount * 100,
      currency: "usd",
      description: "Crypto Mining Payment",
      source: token.id,
    });

    user.balance += amount;
    await user.save();

    // const transaction = new Transaction({
    //   userId: req.userId,
    //   amount,
    //   type: "credit",
    // });

    const transaction = {
      userId: req.userId,
      amount,
      type: "credit",
    };
    await transaction.save();

    res.json("Payment successful");
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

export default router;
