const mongoose = require("mongoose");
const seedCounter = require("../seed/counter.seed");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    // await mongoose.connection.db.command({ ping: 1 });
    console.log("MongoDB Connected...");
    await seedCounter();
  } catch (err) {
    console.error("MongoDB Connection Failed...");
    console.error(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
