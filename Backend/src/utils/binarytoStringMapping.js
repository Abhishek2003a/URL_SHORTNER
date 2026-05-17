const chars = process.env.chars.split("");
const binarytoStringMapping = (binary) => {
  let result = "";
    for (let i = 0; i < binary.length; i += 6) {
      const chunk = binary.slice(i, i + 6);
      const index = parseInt(chunk, 2);
      result += chars[index];
    }
  return result;
};
module.exports = binarytoStringMapping;