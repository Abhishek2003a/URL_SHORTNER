const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

const requiredEnvVars = [
  "MONGO_URI",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "chars",
];

const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingEnvVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
  process.exit(1);
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use((req, _res, next) => {
  req.cookies = Object.fromEntries(
    (req.headers.cookie || "")
      .split(";")
      .filter(Boolean)
      .map((cookie) => {
        const [key, ...value] = cookie.trim().split("=");
        return [key, decodeURIComponent(value.join("="))];
      }),
  );
  next();
});

const connectDb = require("./src/config/db");
connectDb();
// const seedCounter =  require("./src/seed/counter.seed");
// seedCounter();

const authRoutes = require("./src/Routes/auth.routes");
const userRoutes = require("./src/Routes/user.routes");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
const { redirecttoOriginalURL } = require("./src/controller/url.controller");
app.get("/:shortCode", redirecttoOriginalURL);
app.get("/", (req, res) => {
  res.send("Hello From Server...!");
});
app.listen(port,"0.0.0.0", () => {
  console.log(`Server listening on port${port}`);
});
