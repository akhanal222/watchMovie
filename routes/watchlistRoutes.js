const express = require("express");
const router = express.Router();
const watchlistController = require("../controllers/watchlistController");
const auth = require("../middleware/authMiddleware");


// Example: POST /api/watchlist/add
router.post("/add", auth, watchlistController.addToWatchlist);

// Example: GET /api/watchlist/user?user_id=1
//http://localhost:3000/api/watchlist/user?user_id=1
router.get("/user", auth, watchlistController.getWatchlist);

// Example: DELETE /api/watchlist/delete
router.delete("/delete", auth, watchlistController.deleteFromWatchlist);

// Example: PUT /api/watchlist/status
// change status of movie to Watched or To Watch
router.put("/status", auth, watchlistController.updateStatus);

module.exports = router;
