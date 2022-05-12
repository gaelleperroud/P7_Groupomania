const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const rateLimit = require("express-rate-limit");

const userRoutes = require("./routes/users");
const articleRoutes = require("./routes/articles");
const commentRoutes = require("./routes/comments");
const likeRoutes = require("./routes/likes");

app.use(express.json());

app.use((req, res, next) => {
  // middleware to allow cross origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//limit a 1000 request for 2 minuts
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/v1", userRoutes);
app.use("/api/v1", articleRoutes);
app.use("/api/v1", commentRoutes);
app.use("/api/v1", likeRoutes);

module.exports = app;
