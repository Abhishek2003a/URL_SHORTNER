const express = require("express");
const {
  deleteUserUrl,
  generateShortUrl,
  getUserAllUrls,
} = require("../controller/url.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/my-urls", getUserAllUrls);
router.post("/generateShortUrl", generateShortUrl);
router.delete("/my-urls/:urlId", deleteUserUrl);

module.exports = router;
