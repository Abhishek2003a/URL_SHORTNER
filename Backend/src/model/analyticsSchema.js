const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "URL",
    required: true,
    index: true,
  },
  userId: { type: String, required: true, index: true },
  shortCode: { type: String, required: true, index: true },
  ipAddress: { type: String, default: "Unknown" },
  browser: { type: String, default: "Unknown" },
  device: { type: String, default: "Desktop" },
  country: { type: String, default: "Unknown" },
  location: { type: String, default: "Unknown" },
  visitedAt: { type: Date, default: Date.now, index: true },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);
module.exports = Analytics;
