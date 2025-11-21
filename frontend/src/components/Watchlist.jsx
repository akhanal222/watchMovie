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

  return (
    <div className="watchlist-page">
      <h1>Your Watchlist</h1>

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
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
