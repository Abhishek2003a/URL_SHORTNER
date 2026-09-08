const mongoose = require("mongoose");
const Analytics = require("../model/analyticsSchema");
const URL = require("../model/urlsSchema");
const generateShortCode = require("../services/generateShortCode");
const validateURL = require("../utils/validateURL");

const getShortUrl = (req, shortCode) => `${req.protocol}://${req.get("host")}/${shortCode}`;

const detectBrowser = (userAgent = "") => {
  const agent = userAgent.toLowerCase();

  if (agent.includes("edg/")) return "Edge";
  if (agent.includes("firefox/")) return "Firefox";
  if (agent.includes("safari/") && !agent.includes("chrome/")) return "Safari";
  if (agent.includes("chrome/") || agent.includes("crios/")) return "Chrome";

  return "Unknown";
};

const detectDevice = (userAgent = "") => {
  const agent = userAgent.toLowerCase();

  if (agent.includes("ipad") || agent.includes("tablet")) return "Tablet";
  if (agent.includes("mobile") || agent.includes("android") || agent.includes("iphone")) return "Mobile";

  return "Desktop";
};

const getClientIp = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;

  return (ip || req.socket.remoteAddress || "Unknown").split(",")[0].trim();
};

const getCountryFromRequest = (req) => {
  return (
    req.headers["cf-ipcountry"] ||
    req.headers["x-vercel-ip-country"] ||
    req.headers["x-country-code"] ||
    "Unknown"
  );
};

const formatUrl = (req, url) => ({
  id: url._id,
  originalUrl: url.originalUrl,
  shortCode: url.shortCode,
  shortUrl: getShortUrl(req, url.shortCode),
  clicks: url.clicks,
  createdAt: url.createdAt,
  status: "Active",
});

const aggregateByField = async (match, field) => {
  return Analytics.aggregate([
    { $match: match },
    { $group: { _id: `$${field}`, value: { $sum: 1 } } },
    { $sort: { value: -1 } },
    { $project: { _id: 0, name: { $ifNull: ["$_id", "Unknown"] }, value: 1 } },
  ]);
};

const buildDailyClicks = async (match) => {
  const start = new Date();
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);

  const rows = await Analytics.aggregate([
    { $match: { ...match, visitedAt: { $gte: start } } },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$visitedAt" },
        },
        clicks: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const clicksByDate = rows.reduce((acc, row) => {
    acc[row._id] = row.clicks;
    return acc;
  }, {});

  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    const key = day.toISOString().slice(0, 10);

    return {
      day: day.toLocaleDateString("en-US", { weekday: "short" }),
      clicks: clicksByDate[key] || 0,
    };
  });
};

const buildFallbackDailyClicks = (totalClicks) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(today.getDate() - 6);

  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);

    return {
      day: day.toLocaleDateString("en-US", { weekday: "short" }),
      clicks: index === 6 ? totalClicks : 0,
    };
  });
};

const addMissingClicksToToday = (dailyClicks, missingClicks) => {
  if (missingClicks <= 0 || dailyClicks.length === 0) {
    return dailyClicks;
  }

  return dailyClicks.map((day, index) => {
    if (index !== dailyClicks.length - 1) {
      return day;
    }

    return {
      ...day,
      clicks: day.clicks + missingClicks,
    };
  });
};

const formatTimeAgo = (date) => {
  const seconds = Math.max(Math.floor((Date.now() - new Date(date).getTime()) / 1000), 0);
  const units = [
    ["day", 86400],
    ["hour", 3600],
    ["min", 60],
  ];

  for (const [label, value] of units) {
    const amount = Math.floor(seconds / value);
    if (amount >= 1) return `${amount} ${label}${amount > 1 ? "s" : ""} ago`;
  }

  return "Just now";
};

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
        ...formatUrl(req, url),
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

    try {
      const userAgent = req.headers["user-agent"] || "";
      await Analytics.create({
        urlId: url._id,
        userId: url.userId,
        shortCode: url.shortCode,
        ipAddress: getClientIp(req),
        browser: detectBrowser(userAgent),
        device: detectDevice(userAgent),
        country: getCountryFromRequest(req),
        location: getCountryFromRequest(req),
      });
    } catch (analyticsError) {
      console.error("Analytics logging failed:", analyticsError);
    }

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Redirect failed:", error);
    return res.status(500).send("Failed to redirect");
  }
};

const getUrlAnalytics = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const urlQuery = { userId: req.user.userId };

    if (shortCode) {
      urlQuery.shortCode = shortCode;
    }

    const urls = await URL.find(urlQuery).sort({ createdAt: -1 });

    if (shortCode && urls.length === 0) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    const urlIds = urls.map((url) => url._id);
    const match = { userId: req.user.userId };

    if (shortCode) {
      match.shortCode = shortCode;
    } else {
      match.urlId = { $in: urlIds };
    }

    const [
      totalClicks,
      dailyClicks,
      browsers,
      devices,
      countries,
      recentVisits,
    ] = await Promise.all([
      Analytics.countDocuments(match),
      buildDailyClicks(match),
      aggregateByField(match, "browser"),
      aggregateByField(match, "device"),
      aggregateByField(match, "country"),
      Analytics.find(match).sort({ visitedAt: -1 }).limit(10),
    ]);

    const storedClickTotal = urls.reduce((total, url) => total + (url.clicks || 0), 0);
    const effectiveTotalClicks = Math.max(totalClicks, storedClickTotal);
    const normalizedBrowsers = browsers.length || !effectiveTotalClicks
      ? browsers
      : [{ name: "Unknown", value: effectiveTotalClicks }];
    const normalizedDevices = devices.length || !effectiveTotalClicks
      ? devices
      : [{ name: "Unknown", value: effectiveTotalClicks }];
    const normalizedCountries = countries.length || !effectiveTotalClicks
      ? countries
      : [{ name: "Unknown", value: effectiveTotalClicks }];
    const missingDetailedClicks = Math.max(effectiveTotalClicks - totalClicks, 0);
    const normalizedDailyClicks = totalClicks
      ? addMissingClicksToToday(dailyClicks, missingDetailedClicks)
      : buildFallbackDailyClicks(effectiveTotalClicks);
    const mobileTraffic = effectiveTotalClicks
      ? Math.round(((normalizedDevices.find((device) => device.name === "Mobile")?.value || 0) / effectiveTotalClicks) * 100)
      : 0;

    return res.json({
      success: true,
      url: urls[0] ? formatUrl(req, urls[0]) : null,
      urls: urls.map((url) => formatUrl(req, url)),
      analytics: {
        totalClicks: effectiveTotalClicks,
        avgDailyClicks: Math.round(effectiveTotalClicks / 7),
        mobileTraffic,
        topCountry: normalizedCountries[0]?.name || "Unknown",
        dailyClicks: normalizedDailyClicks,
        browsers: normalizedBrowsers,
        devices: normalizedDevices,
        countries: normalizedCountries,
        recentVisits: recentVisits.map((visit) => ({
          location: visit.location || visit.country || "Unknown",
          browser: visit.browser || "Unknown",
          device: visit.device || "Unknown",
          time: formatTimeAgo(visit.visitedAt),
        })),
      },
    });
  } catch (error) {
    console.error("Fetch analytics failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
    });
  }
};

module.exports = {
  deleteUserUrl,
  generateShortUrl,
  getUrlAnalytics,
  getUserAllUrls,
  redirecttoOriginalURL,
};
