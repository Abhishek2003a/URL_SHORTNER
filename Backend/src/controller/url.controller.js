const URL = require("../model/urlsSchema");
const generateShortCode = require("../services/generateShortCode");
const getAllURLs = async (req, res) => {
  try {
    const userId = req.userId;
    const urls = await URL.find({
      userId,
    });
    res.status(200).json({ urls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const putShortURL = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ message: "Original URL is required" });
    }
    console.log("Original URL received:", originalUrl);
    console.log("Validating original URL...");
    if (!validateURL(originalUrl)) {
      console.log("Invalid URL format:", originalUrl);
      return res.status(400).json({ message: "Invalid URL format" });
    }
    console.log("Original URL is valid. Proceeding to generate short code...");

    console.log("Generating short code...");
    const shortCode = await generateShortCode();
    console.log("Generated short code:", shortCode);

    const userId = 500;

    await URL.create({ originalURL: originalUrl, shortCode, userId });
    res.status(201).json({
      message: "Short URL created successfully",
      shortURL: `${req.protocol}://${req.get("host")}/${shortCode}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getOriginalURL = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await URL.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    res.status(200).json({ originalUrl: url.originalUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const redirecttoOriginalURL = async (req, res) => {
  try {
    console.log("Redirecting short URL...");
    const { shortCode } = req.params;
    console.log("Short code received for redirection:", shortCode);
    const url = await URL.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    res.redirect(url.originalURL);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllURLs,
  putShortURL,
  getOriginalURL,
  redirecttoOriginalURL,
};
