import mongoose from "mongoose";

const LiveSessionSchema = new mongoose.Schema({
  liveId: { type: String, unique: true },
  hostId: String,
  title: String,
  startedAt: Date,
  status: {
    type: String,
    enum: ["created", "live", "ended"],
    default: "created"
  },
  viewersCount: { type: Number, default: 0 }
});

export default mongoose.model("LiveSession", LiveSessionSchema);
