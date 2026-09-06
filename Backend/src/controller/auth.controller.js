const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const { v4: uuidv4 } = require("uuid");

const SignupHandler = async (req, res) => {
  const { email, password, username } = req.body;
  const userName = username || req.body.userName;
  console.log(req.body);
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("User already exists");
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    userId: uuidv4(),
    userName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    token,
    user: {
      id: newUser.userId,
      username: newUser.userName,
      email: newUser.email,
    },
  });
};

const LoginHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token,
    user: {
      id: user.userId,
      username: user.userName,
      email: user.email,
    },
  });
};

module.exports = { SignupHandler, LoginHandler };
