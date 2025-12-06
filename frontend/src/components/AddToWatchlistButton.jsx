import React from "react";
import { useState } from "react";

function AddToWatchlistButton({ movie }) {
  const [disable, setdisable] = useState(false); // this handel the button press
  const [label, setLabel] = useState("Add to Watchlist");

  async function handleAdd() {
    const token = localStorage.getItem("token");
    setdisable(true); // disable the button after press
    setLabel("Adding...");
    try {
      const res = await fetch("http://localhost:3000/api/watchlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token
        },
        body: JSON.stringify({
          movie_id: movie.id,
          title: movie.title,
          genre_id: movie.genre_id, 
          // genre: movie.genre,
          poster_url: movie.poster_url,
          release_date: movie.release_date,
        }),
      });
      
      const data = await res.json();
      
      if (data.error === "Movie already in watchlist") {
        setLabel("Already Added");
        return;
      }
      if (!res.ok) {
        setdisable(false);
        setLabel("Add to Watchlist");
        alert("Failed to add to watchlist.");
        return;
      }
      setLabel("Added");

    } catch (err) {
      console.error("Add Watchlist Error:", err);
      setdisable(false); // if there is error let user again press the add button
      setLabel("Add to Watchlist");
    }
  }

  return (
    <button className="add-btn" onClick={handleAdd} disabled={disable}>
      {label}
    </button>
  );
}

export default AddToWatchlistButton;
