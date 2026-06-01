"use strict";

require("dotenv").config();
const express = require("express");
// const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

// GLOBAL CORS CONFIG
if (process.env.NODE_ENV !== "production") {
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
}

// Middleware
// app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  Import TMDB route
const tmdbRoutes = require("./routes/tmdbRoutes");

// Register API route
app.use("/api/movies", tmdbRoutes);

const watchlistRoutes = require("./routes/watchlistRoutes");
app.use("/api/watchlist", watchlistRoutes);

// app.use("/api/delete", watchlistRoutes);

// This is the auth routes
const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);


const frontendPath = path.join(__dirname, "frontend/dist");

app.use(express.static(frontendPath));

app.get('/{*splat}', function (req, res) {
  res.sendFile(path.join(frontendPath, "index.html"));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
});
