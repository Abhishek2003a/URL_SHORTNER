const Counter = require("../model/counterSchema");

const seedCounter = async () => {
  try {
    const existing = await Counter.countDocuments();
    if (existing > 0) {
      console.log("Counter collection already seeded");
      return;
    }
    let counterData = [];
    counterData.push({ id: 1, seq: 10000 });
    for (let i = 2; i <= 1000; i++) {
      counterData.push({ id: i, seq: i * 100000000000 });
    }

    await Counter.insertMany(counterData);
    console.log("Counter seeded successfully");
  } catch (error) {
    console.error("Error seeding counter:", error);
    throw error;
  }
};
module.exports = seedCounter;
