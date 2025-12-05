import React from "react";
import { useState } from "react";

function AddToWatchlistButton({ movie }) {
  const [disable, setdisable] = useState(false); // this handel the button press
  async function handleAdd() {
    setdisable(true); // disable the button after press
    try {
      const token = localStorage.getItem("token"); // get token from local storage
      const res = await fetch("http://localhost:3000/api/watchlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token
        },
        body: JSON.stringify({
          movie_id: movie.id,
          title: movie.title,
          genre: movie.genre,
          poster_url: movie.poster_url,
          release_date: movie.release_date,
        }),
      });

      if (!res.ok) {
        setdisable(false);
        alert("Failed to add to watchlist.");
        return;
      }
      const data = await res.json();
      alert(`${movie.title} Added to Watchlist`);
    } catch (err) {
      console.error("Add Watchlist Error:", err);
      setdisable(false); // if there is error let user again press the add button
    }
  }

  return (
    <button className="add-btn" onClick={handleAdd} disabled={disable}>
      {disable ? "Added" : "Add to Watchlist"}
    </button>
  );
}

export default AddToWatchlistButton;
