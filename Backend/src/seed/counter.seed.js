const Counter = require("../model/counterSchema");

const seedCounter = async () => {
  try {
    const existing = await Counter.countDocuments();
    if (existing > 0) {
      console.log("Counter collection already seeded");
      process.exit(0);
    }
    await Counter.insertMany([
      { id: 1, seq: 150000 },
      { id: 2, seq: 16666666641667 },
      { id: 3, seq: 33333333283334 },
      { id: 4, seq: 49999999925001 },
      { id: 5, seq: 66666666566668 },
      { id: 6, seq: 83333333208335 },
    ]);
    console.log("Counter seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding counter:", error);
    process.exit(1);
  }
};
module.exports = seedCounter;
