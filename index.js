import express from "express";
import mongoose from "mongoose";
import {Web3} from "web3";
// const io = require("socket.io")(server);
import dotenv from "dotenv";
import cors from "cors";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// import bitcoin from "bitcoinjs-lib";

// initialize our app
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Web3 setup
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
  )
);

// Socket.io setup
// const server = require("http").createServer(app);
// const io = socketio(server, { cors: { origin: "*" } });

// io.on("connection", socket => {
//   console.log("New client connected");
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// Models
// import User from "./models/user.model";
// import MiningStat from "./models/miningStat.model";
// import Transaction from "./models/transaction.model";

// Routes
import authRouter from "./routes/auth.js";
import miningRouter from "./routes/mining.js";
import paymentRouter from "./routes/payment.js";
import adminRouter from "./routes/admin.js";

app.use("/auth", authRouter);
app.use("/mining", miningRouter);
app.use("/payment", paymentRouter);
app.use("/admin", adminRouter);

const connectDB = () => {
  mongoose.set("strictQuery", true);
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("The database has been connected successfully");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log(`mongoDB disconnected!`);
});

mongoose.connection.on("connected", () => {
  console.log(`mongoDB has reconnected successfully!`);
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Your backend is running on port ${PORT}`);
});
