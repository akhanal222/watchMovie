import React from "react";

function AddToWatchlistButton({ movie }) {
  async function handleAdd() {
    try {
      const res = await fetch("http://localhost:3000/api/watchlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1,              // Temporary
          movie_id: movie.id,
          title: movie.title,
          genre: movie.genre,      // may be null if TMDB doesn't provide
          poster_url: movie.poster_url,
          release_date: movie.release_date
        }),
      });

      const data = await res.json();
      alert("Added to Watchlist!");
    } catch (err) {
      console.error("Add Watchlist Error:", err);
    }
  }

  return (
    <button className="add-btn" onClick={handleAdd}>
      Add to Watchlist
    </button>
  );
}

export default AddToWatchlistButton;
