const Url = require("../model/urlsSchema");
const generateShortCode = require("../services/generateShortCode");
const getAllURLs = async (req, res) => {
  try {
    const userId = req.userId;
    const urls = await Url.find({
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
    const { originalURL } = req.query;
    if (!originalURL) {
      return res.status(400).json({ message: "Original URL is required" });
    }
    const shortCode = await generateShortCode();
    const userId = req.userId;
    await Url.save({ originalURL, shortCode, userId });
    res
      .status(201)
      .json({
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
    const url = await Url.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({ message: "Short URL not found" });
    }
    res.status(200).json({ originalURL: url.originalURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllURLs, putShortURL, getOriginalURL };
