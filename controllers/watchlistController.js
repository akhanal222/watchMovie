const watchlistModel = require("../models/watchlistModels");

async function addToWatchlist(req, res) {
  const user_id = req.user.id;
  const { movie_id, title, genre_id, poster_url, release_date } = req.body;

  if (!user_id || !movie_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const addedItem = await watchlistModel.addToWatchlist(
      user_id,
      movie_id,
      title,
      genre_id,
      poster_url,
      release_date
    );

    if (addedItem.error) {
      return res.status(400).json({ error: addedItem.error });
    }
    res.json(addedItem);

  } catch (err) {
    console.error("Error adding to watchlist:", err);
    res.status(500).json({ error: "Database error" });
  }
}


async function getWatchlist(req, res) {
  const user_id = req.user.id; // or req.params.user_id

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }

  try {
    const rows = await watchlistModel.getWatchlist(user_id);
    res.json(rows);

  } catch (err) {
    console.error("Error fetching watchlist:", err);
    res.status(500).json({ error: "Database error" });
  }
}

async function deleteFromWatchlist(req, res) {
  const { id } = req.body;
  const user_id = req.user.id;

  if (!id || !user_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const deletedItem = await watchlistModel.deleteFromWatchlist(
      id,
      user_id
    );

    res.json(deletedItem);

  } catch (err) {
    console.error("Error deleting from watchlist:", err);
    res.status(500).json({ error: "Database error" });
  }
}
async function updateStatus(req, res) {
  const { id, status } = req.body;  
  const user_id = req.user.id;

  if (!id || !status) {
    return res.status(400).json({ error: "Missing id or status" });
  }

  try {
    const updated = await watchlistModel.updateStatus(id, user_id, status);
    res.json(updated);
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = {
  addToWatchlist,
  getWatchlist,
  deleteFromWatchlist,
  updateStatus
};
