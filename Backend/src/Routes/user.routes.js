const {
  getAllURLs,
  getOriginalURL,
  putShortURL,
} = require("../controller/url.controller");
const validateRequest = require("../middleware/validateRequest");
const router = require("express").Router();
router.get("/:shortCode", validateRequest, getOriginalURL);
router.get("/user/urls", validateRequest, getAllURLs);
router.post("/shorten", putShortURL);
module.exports = router;
