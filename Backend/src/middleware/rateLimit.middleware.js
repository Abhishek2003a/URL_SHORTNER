const createRateLimiter = ({ windowMs = 10_000 } = {}) => {
  const requests = new Map();

  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      return next();
    }

    const forwardedFor = req.headers["x-forwarded-for"];
    const clientIp = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
    const key = (clientIp || req.socket.remoteAddress || "unknown").split(",")[0].trim();
    const now = Date.now();
    const lastRequestAt = requests.get(key) || 0;
    const retryAfterMs = windowMs - (now - lastRequestAt);

    if (retryAfterMs > 0) {
      res.set("Retry-After", String(Math.ceil(retryAfterMs / 1000)));
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please wait 10 seconds before trying again.",
      });
    }

    requests.set(key, now);

    for (const [requestKey, requestAt] of requests.entries()) {
      if (now - requestAt > windowMs) {
        requests.delete(requestKey);
      }
    }

    return next();
  };
};

module.exports = createRateLimiter;
