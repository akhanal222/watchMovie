import { useEffect, useState } from "react";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    async function fetchWatchlist() {
      const res = await fetch("http://localhost:3000/api/watchlist/user?user_id=1");
      const data = await res.json();
      setWatchlist(data);
    }
    fetchWatchlist();
  }, []);

  async function handleRemove(id) {
    try {
      const res = await fetch("http://localhost:3000/api/watchlist/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          user_id: 1,       // Temporary
          // remove all the instances of the movie from the watchlist
        }),
      });
      if (res.ok) {
        setWatchlist((prev) => prev.filter((movie) => movie.id !== id));
      }
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  }

  return (
    <div className="watchlist-page">
      <h1 className="watchlist-title">Watchlist</h1>

      <div className="watchlist-list">
        {watchlist.map((movie) => (
          <div key={movie.id} className="watchlist-item">
            
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="watchlist-img"
            />

            <div className="watchlist-info">
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date || "N/A"}</p>
              <p>Genre: {movie.genre || "N/A"}</p>
              <p>Added On: {movie.added_at?.slice(0, 10) || "Unknown"}</p>
              {/* Remove button */}
              <button className="remove-btn" onClick={() => handleRemove(movie.id)}>Remove</button>

              {/* // Placeholder for watched status */}
              <p>Watched: {movie.watched ? "Yes" : "No"}</p> 
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
