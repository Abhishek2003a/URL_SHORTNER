const mongoose = require("mongoose");

// const refreshTokenSchema = new mongoose.Schema(
//   {
//     sessionId: { type: String, required: true, unique: true },
//     tokenHash: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//   },
//   { _id: false },
// );

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  userName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },
  // refreshToken: { type: [refreshTokenSchema], default: [] },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
