"use strict";

require("dotenv").config();
const express = require("express");
// const multer = require("multer");
const cors = require("cors");

const app = express();

// GLOBAL CORS CONFIG
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

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

app.use("/api/delete", watchlistRoutes);

// This is the auth routes
const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);



// Serve frontend files (optional for now)
app.use(express.static("frontend"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
});
