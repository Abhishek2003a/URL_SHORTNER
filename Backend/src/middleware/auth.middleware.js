const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token || token === "null") {
    return res.status(401).json({
      success: false,
      message: "ACCESS_TOKEN_MISSING",
    });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "ACCESS_TOKEN_EXPIRED",
      });
    }

    return res.status(401).json({
      success: false,
      message: "ACCESS_TOKEN_INVALID",
    });
  }
};

module.exports = authMiddleware;
