const pool = require("./db"); // your shared DB connection

async function addToWatchlist(user_id, movie_id, title, genre, poster_url, release_date) {
  const query = `
    INSERT INTO watchlist 
    (user_id, movie_id, title, genre, poster_url, release_date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [user_id, movie_id, title, genre, poster_url, release_date];
  const result = await pool.query(query, values);

  return result.rows[0];
}

module.exports = { addToWatchlist };


async function getWatchlist(user_id) {
  const query = `SELECT * FROM watchlist WHERE user_id = $1`;
  const values = [user_id];

  const result = await pool.query(query, values);
  return result.rows;
}

async function deleteFromWatchlist(id, user_id) {
  const query = `
    DELETE FROM watchlist 
    WHERE id = $1 AND user_id = $2
    RETURNING *;
  `;

  const values = [id, user_id];
  const result = await pool.query(query, values);

  return result.rows[0];
}

module.exports = {
  getWatchlist,
  addToWatchlist,
  deleteFromWatchlist
};
