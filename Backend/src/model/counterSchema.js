const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Counter", counterSchema);
