const mongoose = require("mongoose");
const URL = require("../model/urlsSchema");
const generateShortCode = require("../services/generateShortCode");
const validateURL = require("../utils/validateURL");

const getShortUrl = (req, shortCode) => `${req.protocol}://${req.get("host")}/${shortCode}`;

const generateShortUrl = async (req, res) => {
  try {
    const { originalUrl, customCode } = req.body;

    if (!validateURL(originalUrl)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid URL",
      });
    }

    const shortCode = customCode || (await generateShortCode());
    const existingUrl = await URL.findOne({ shortCode });

    if (existingUrl) {
      return res.status(409).json({
        success: false,
        message: "Short code already exists",
      });
    }

    const url = await URL.create({
      originalUrl,
      shortCode,
      userId: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      url: {
        id: url._id,
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: getShortUrl(req, url.shortCode),
        clicks: url.clicks,
        createdAt: url.createdAt,
        status: "Active",
      },
    });
  } catch (error) {
    console.error("Generate short URL failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create short URL",
    });
  }
};

const getUserAllUrls = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
    const skip = (page - 1) * limit;

    const [urls, total] = await Promise.all([
      URL.find({ userId: req.user.userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      URL.countDocuments({ userId: req.user.userId }),
    ]);

    return res.json({
      success: true,
      page,
      limit,
      total,
      urls: urls.map((url) => ({
        id: url._id,
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: getShortUrl(req, url.shortCode),
        clicks: url.clicks,
        createdAt: url.createdAt,
        status: "Active",
      })),
    });
  } catch (error) {
    console.error("Fetch user URLs failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch URLs",
    });
  }
};

const deleteUserUrl = async (req, res) => {
  try {
    const { urlId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(urlId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL id",
      });
    }

    const deletedUrl = await URL.findOneAndDelete({
      _id: urlId,
      userId: req.user.userId,
    });

    if (!deletedUrl) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    return res.json({
      success: true,
      message: "URL deleted successfully",
    });
  } catch (error) {
    console.error("Delete URL failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete URL",
    });
  }
};

const redirecttoOriginalURL = async (req, res) => {
  try {
    const url = await URL.findOneAndUpdate(
      { shortCode: req.params.shortCode },
      { $inc: { clicks: 1 } },
      { new: true },
    );

    if (!url) {
      return res.status(404).send("URL not found");
    }

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Redirect failed:", error);
    return res.status(500).send("Failed to redirect");
  }
};

module.exports = {
  deleteUserUrl,
  generateShortUrl,
  getUserAllUrls,
  redirecttoOriginalURL,
};
