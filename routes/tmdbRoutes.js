const express = require("express");
const router = express.Router();

const { searchMovies } = require("../controllers/tmdbController");

router.get("/search", searchMovies);

module.exports = router;
