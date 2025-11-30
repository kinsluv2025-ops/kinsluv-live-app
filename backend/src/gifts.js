/**
 * Placeholder gift routes (simple in-memory example).
 * For production: persist to DB and secure payment flows.
 */
import express from "express";
const router = express.Router();

let gifts = []; // in-memory

router.post("/send", (req, res) => {
  const { fromUserId, toLiveId, giftType, amount } = req.body;
  if (!fromUserId || !toLiveId || !giftType) return res.status(400).json({error:'missing'});
  const g = { id: Date.now().toString(), fromUserId, toLiveId, giftType, amount, createdAt: new Date() };
  gifts.push(g);
  // TODO: emit real-time event (WebSocket / Zego IM)
  res.json(g);
});

router.get("/list/:liveId", (req, res) => {
  const list = gifts.filter(g => g.toLiveId === req.params.liveId);
  res.json(list);
});

export default router;
