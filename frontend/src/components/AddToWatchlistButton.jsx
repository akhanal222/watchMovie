import { useState } from "react";
import { useToast } from "./Toast";

function AddToWatchlistButton({ movie }) {
  const [disable, setDisable] = useState(false);
  const [label, setLabel] = useState("Add to Watchlist");
  const { pushToast } = useToast();

  async function handleAdd() {
    const token = localStorage.getItem("token");
    setDisable(true);
    setLabel("Adding...");

    try {
      const res = await fetch("/api/watchlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movie_id: movie.id,
          title: movie.title,
          genre_id: movie.genre_id,
          poster_url: movie.poster_url,
          release_date: movie.release_date,
        }),
      });

      const data = await res.json();

      if (data?.error === "Movie already in watchlist") {
        setLabel("Already Added");
        pushToast({
          title: "Already in watchlist",
          message: movie.title,
        });
        return;
      }

      if (!res.ok) {
        setDisable(false);
        setLabel("Add to Watchlist");
        pushToast({
          title: "Couldn’t add to watchlist",
          message: data?.error || "Please try again.",
        });
        return;
      }

      setLabel("Added");
      pushToast({
        title: "Added to watchlist",
        message: movie.title,
      });
    } catch (err) {
      console.error("Add Watchlist Error:", err);
      setDisable(false);
      setLabel("Add to Watchlist");
      pushToast({
        title: "Something went wrong",
        message: "Please try again.",
      });
    }
  }

  return (
    <button className="add-btn" onClick={handleAdd} disabled={disable}>
      {label}
    </button>
  );
}

export default AddToWatchlistButton;
