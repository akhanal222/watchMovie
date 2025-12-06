import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    async function fetchWatchlist() {
      // const res = await fetch("http://localhost:3000/api/watchlist/user?user_id=1");
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/watchlist/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setWatchlist(data);
    }
    fetchWatchlist();
  }, []);

  async function handleRemove(id) {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/api/watchlist/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setWatchlist((prev) => prev.filter((movie) => movie.id !== id));
      }
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  }
  async function handleToggleStatus(movie) {
    const token = localStorage.getItem("token");

    const newStatus = movie.status === "To Watch" ? "Watched" : "To Watch";

    const res = await fetch(`${API_BASE_URL}/api/watchlist/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: movie.id, status: newStatus }),
    });

    if (res.ok) {
      setWatchlist((prev) =>
        prev.map((m) => (m.id === movie.id ? { ...m, status: newStatus } : m))
      );
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
              <p>Genre: {movie.genre || "Unknown"}</p>
              <p>Added On: {movie.added_at?.slice(0, 10) || "Unknown"}</p>
              {/* Remove button */}
              <button
                className="remove-btn"
                onClick={() => handleRemove(movie.id)}
              >
                Remove
              </button>
              <p>Status: {movie.status}</p>
              <button
                className="status-btn"
                onClick={() => handleToggleStatus(movie)}
              >
                Mark as {movie.status === "To Watch" ? "Watched" : "To Watch"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
