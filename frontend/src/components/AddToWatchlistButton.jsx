import React from "react";
import { useState } from "react";

function AddToWatchlistButton({ movie }) {
   const [disable,setdisable] = useState(false); // this handel the button press 
  async function handleAdd() {
    setdisable(true);
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
      setdisable(false); // if there is error let user again press the add button 
    }
  }

  return (
    <button className="add-btn" onClick={handleAdd} disabled={disable}>
     {disable? "Added":"Add to Watchlist"} 
    </button>
  );
}

export default AddToWatchlistButton;
