const counter = require("../model/counterSchema");

const getNextSequence = async () => {
  const randomInt = Math.floor(Math.random() * 1000) + 1;
  const result = await counter.findOneAndUpdate(
    { id: randomInt },
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true },
  );
  return result.seq;
};
module.exports = getNextSequence;
