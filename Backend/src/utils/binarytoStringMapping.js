const binarytoStringMapping = (binary) => {
  const chars = process.env.chars.split("")
  // if (!alphabet || alphabet.length < 64) {
  //   throw new Error("Environment variable chars must contain at least 64 characters");
  // }
  // const chars = alphabet.split("");
  let result = "";
  for (let i = 0; i < binary.length; i += 6) {
    const chunk = binary.slice(i, i + 6);
    const index = parseInt(chunk, 2);
    result += chars[index];
  }
  return result;
};
module.exports = binarytoStringMapping;
