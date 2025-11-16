import { useState } from "react";
import MovieCard from "./MovieCard";

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/api/movies/search?query=${query}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    }

    setLoading(false);
  }

  return (
    <div className="search-container">
      <h2>Search Movies</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />

        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>

      {results.length === 0 && !loading && (
        <div className="typewriter">
          <h1>Search for any movie to get started </h1>
        </div>
      )}

      {loading && <p>Loading…</p>}

      <div className="movie-grid">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;

