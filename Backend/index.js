const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
const config = require("dotenv").config();
const connectDb = require("./src/config/db");
connectDb();

const seedCounter = require("./src/seed/counter.seed");
seedCounter();

const authRoutes = require("./src/Routes/auth.routes");
const userRoutes = require("./src/Routes/user.routes");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello From Server...!");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
