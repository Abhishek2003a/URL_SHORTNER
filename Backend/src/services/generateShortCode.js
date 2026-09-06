const seq = require("../utils/pseudoRandomFn");
const binaryConvertion = require("../utils/binaryConvertion");
const binaryToStringMapping = require("../utils/binarytoStringMapping");
const URL = require("../model/urlsSchema");

const generateShortCode = async () => {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const seqNum = await seq();
    const binaryNum = binaryConvertion(seqNum);
    const shortCode = binaryToStringMapping(binaryNum);
    const exists = await URL.exists({ shortCode });

    if (!exists) {
      return shortCode;
    }
  }

  throw new Error("Unable to generate a unique short code");
};
module.exports = generateShortCode;
