const pool = require("./db");

async function addToWatchlist(user_id, movie_id, title, genre_id, poster_url, release_date) {

  // Check if the movie is already in the watchlist
  const checkQuery = `
    SELECT * FROM watchlist
    WHERE user_id = $1 AND movie_id = $2
  `;
  const checkResult = await pool.query(checkQuery, [user_id, movie_id]);

  if (checkResult.rows.length > 0) {
    return { error: "Movie already in watchlist" };
  }

  const query = `
    INSERT INTO watchlist 
    (user_id, movie_id, title, genre_id, poster_url, release_date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [user_id, movie_id, title, genre_id, poster_url, release_date];
  const result = await pool.query(query, values);

  return result.rows[0];
}
async function getWatchlist(user_id) {
  const query = `
    SELECT 
      w.*, 
      g.name AS genre
    FROM watchlist w
    LEFT JOIN genres g 
      ON w.genre_id = g.id
    WHERE w.user_id = $1
    ORDER BY w.id DESC;
  `;

  const result = await pool.query(query, [user_id]);
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

async function updateStatus(id, user_id, newStatus) {
  const query = `
    UPDATE watchlist
    SET status = $1
    WHERE id = $2 AND user_id = $3
    RETURNING *;
  `;
  const values = [newStatus, id, user_id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  getWatchlist,
  addToWatchlist,
  deleteFromWatchlist,
  updateStatus
};
