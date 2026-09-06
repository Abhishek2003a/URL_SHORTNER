const counter = require("../model/counterSchema");

const getNextSequence = async () => {
  let randomInt = Math.floor(Math.random() * 1000)+1;
  randomInt++;
  const result = await counter.findOneAndUpdate(
    { id: randomInt },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );
  return result.seq;
};
module.exports = getNextSequence;
