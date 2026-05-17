const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const { v4: uuidv4 } = require("uuid");

const SignupHandler = async (req, res) => {
  const { email, password, userName } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    userId: uuid.v4(),
    userName,
    email,
    password: hashedPassword,
  });
  res.status(201).json({ message: "User registered successfully" });
};

const LoginHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ message: "User logged in successfully", token });
};

module.exports = { SignupHandler, LoginHandler };
