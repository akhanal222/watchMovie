const express = require("express");
const router = express.Router();
const tmdbController = require("../controllers/tmdbController");

router.get("/search", tmdbController.searchMovies);
router.get("/trending/today", tmdbController.getTrendingToday);
router.get("/popular", tmdbController.getPopularMovies);
router.get("/tv/popular", tmdbController.getPopularTV);
router.get("/tv/trending/today", tmdbController.getTrendingTV);
router.get("/multi-search", tmdbController.multiSearch);
router.get("/:id/videos", tmdbController.getMovieVideos);
router.get("/:id", tmdbController.getMovieDetails);

module.exports = router;
