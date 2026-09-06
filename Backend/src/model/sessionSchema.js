const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, unique: true, required: true },
  userId: { type: String, required: true },
  refreshTokenHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
