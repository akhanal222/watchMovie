const express = require("express");
const router = express.Router();
const tmdbController = require("../controllers/tmdbController");

router.get("/search", tmdbController.searchMovies);
router.get("/trending/today", tmdbController.getTrendingToday);
router.get("/:id/videos", tmdbController.getMovieVideos);
router.get("/:id", tmdbController.getMovieDetails);

module.exports = router;
