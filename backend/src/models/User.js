import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  name: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
