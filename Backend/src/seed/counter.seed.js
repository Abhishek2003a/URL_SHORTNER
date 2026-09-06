const Counter = require("../model/counterSchema");

const seedCounter = async () => {
  try {
    const existing = await Counter.countDocuments();
    if (existing > 0) {
      console.log("Counter collection already seeded");
      // process.exit(0);
      return;
    }
    let counterData = [];
    counterData.push({ id: 1, seq: 10000 });
    for (let i = 2; i <= 1000; i++) {
      counterData.push({ id: i, seq: i * 100000000000 });
    }

    await Counter.insertMany(counterData);
    console.log("Counter seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding counter:", error);
    process.exit(1);
  }
};
module.exports = seedCounter;
