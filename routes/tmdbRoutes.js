const express = require("express");
const router = express.Router();
const tmdbController = require("../controllers/tmdbController");

router.get("/search", tmdbController.searchMovies);
router.get("/:id", tmdbController.getMovieDetails);
router.get("/trending/today", tmdbController.getTrendingToday);

module.exports = router;
