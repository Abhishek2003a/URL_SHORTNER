const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");
const Session = require("../model/sessionSchema");
const User = require("../model/userSchema");
const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");

const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const sanitizeUser = (user) => ({
  id: user.userId,
  userId: user.userId,
  userName: user.userName,
  username: user.userName,
  email: user.email,
});

const createSession = async (res, user) => {
  const refreshToken = generateRefreshToken(user);
  const sessionId = randomUUID();
  const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

  await Session.create({
    sessionId,
    userId: user.userId,
    refreshTokenHash,
  });

  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.cookie("sessionId", sessionId, cookieOptions);
};

router.post("/register", async (req, res) => {
  try {
    const { userName, username, email, password } = req.body;
    const name = userName || username;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const user = await User.create({
      userId: randomUUID(),
      userName: name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await createSession(res, user);

    return res.status(201).json({
      success: true,
      token: generateAccessToken(user),
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Register failed:", error);
    return res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password || "", user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    await createSession(res, user);

    return res.json({
      success: true,
      token: generateAccessToken(user),
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken, sessionId } = req.cookies;

    if (!refreshToken || !sessionId) {
      return res.status(401).json({
        success: false,
        message: "REFRESH_TOKEN_MISSING",
      });
    }

    const session = await Session.findOne({ sessionId });
    if (!session || !(await bcrypt.compare(refreshToken, session.refreshTokenHash))) {
      return res.status(401).json({
        success: false,
        message: "REFRESH_TOKEN_INVALID",
      });
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findOne({ userId: payload.userId });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "USER_NOT_FOUND",
      });
    }

    return res.json({
      success: true,
      token: generateAccessToken(user),
    });
  } catch (error) {
    console.error("Refresh failed:", error);
    return res.status(401).json({
      success: false,
      message: "REFRESH_TOKEN_INVALID",
    });
  }
});

router.delete("/logout", async (req, res) => {
  try {
    if (req.cookies.sessionId) {
      await Session.deleteOne({ sessionId: req.cookies.sessionId });
    }

    res.clearCookie("refreshToken");
    res.clearCookie("sessionId");

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout failed:", error);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
});

module.exports = router;
