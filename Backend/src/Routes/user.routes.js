const express = require("express");
const {
  deleteUserUrl,
  generateShortUrl,
  getUrlAnalytics,
  getUserAllUrls,
} = require("../controller/url.controller");
const authMiddleware = require("../middleware/auth.middleware");
const createRateLimiter = require("../middleware/rateLimit.middleware");

const router = express.Router();
const createUrlRateLimiter = createRateLimiter({ windowMs: 10 * 1000 });

router.use(authMiddleware);

router.get("/my-urls", getUserAllUrls);
router.get("/analytics", getUrlAnalytics);
router.get("/analytics/:shortCode", getUrlAnalytics);
router.post("/generateShortUrl", createUrlRateLimiter, generateShortUrl);
router.delete("/my-urls/:urlId", deleteUserUrl);

module.exports = router;
