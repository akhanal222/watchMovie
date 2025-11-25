const express = require("express");
const router = express.Router();
const watchlistController = require("../controllers/watchlistController");


// Example: POST /api/watchlist/add
router.post("/add", watchlistController.addToWatchlist);

// Example: GET /api/watchlist/user?user_id=1
//http://localhost:3000/api/watchlist/user?user_id=1
router.get("/user", watchlistController.getWatchlist);

// Example: DELETE /api/watchlist/delete
router.delete("/delete", watchlistController.deleteFromWatchlist);

module.exports = router;
