const express = require("express");
const router = express.Router();
const { addToWatchlist } = require("../controllers/watchlistController");

// POST /api/watchlist/add
router.post("/add", addToWatchlist);

module.exports = router;
