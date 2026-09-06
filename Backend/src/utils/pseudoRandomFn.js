const counter = require("../model/counterSchema");
let randomInt = (Math.random() * 10) % 6;
randomInt++;
const getNextSequence = async () => {
  const result = await counter.findOneAndUpdate(
    { id: randomInt },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );
  return result.seq;
};
module.exports = getNextSequence;
