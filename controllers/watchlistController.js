const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function addToWatchlist(req, res) {
  const { user_id, movie_id, title, genre, poster_url, release_date } = req.body;

  if (!user_id || !movie_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const query = `
      INSERT INTO watchlist 
      (user_id, movie_id, title, genre, poster_url, release_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [user_id, movie_id, title, genre, poster_url, release_date];
    const result = await pool.query(query, values);

    res.json(result.rows[0]);

  } catch (err) {
    console.error("Error adding to watchlist:", err);
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = { addToWatchlist };
