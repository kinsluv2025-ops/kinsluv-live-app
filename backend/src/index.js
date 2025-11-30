import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import User from "./models/User.js";
import LiveSession from "./models/LiveSession.js";
import { generateZegoToken } from "./token.js";

dotenv.config();
const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000"
}));
app.use(express.json());

const PORT = process.env.PORT || 4000;
const { MONGO_URI, ZEGO_APP_ID, ZEGO_SERVER_SECRET } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => res.send("Kinsluv Backend API Running"));

app.post("/api/token", async (req, res) => {
  const { userID, liveID } = req.body;
  if (!userID || !liveID)
    return res.status(400).json({ error: "userID & liveID required" });

  const token = generateZegoToken(
    ZEGO_APP_ID,
    ZEGO_SERVER_SECRET,
    userID,
    liveID
  );

  res.json({ appID: ZEGO_APP_ID, token });
});

app.post("/api/session", async (req, res) => {
  const { liveId, hostId, title } = req.body;
  const session = new LiveSession({
    liveId,
    hostId,
    title,
    startedAt: new Date(),
    status: "live"
  });

  await session.save();
  res.json(session);
});

app.post("/api/session/end", async (req, res) => {
  const { liveId } = req.body;
  const s = await LiveSession.findOne({ liveId });
  if (!s) return res.status(404).json({ error: "not found" });
  s.status = "ended";
  await s.save();
  res.json(s);
});

app.listen(PORT, () =>
  console.log(`Backend server running on http://localhost:${PORT}`)
);

import giftsRouter from './gifts.js';
app.use('/api/gifts', giftsRouter);
