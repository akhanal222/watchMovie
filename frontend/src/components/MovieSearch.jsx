import { useMemo, useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function SearchIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SkeletonGrid({ count = 10 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-poster" />
          <div className="skeleton-lines">
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
          </div>
        </div>
      ))}
    </div>
  );
}

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trendingToday, setTrendingToday] = useState([]);
  const [trendingVisible, setTrendingVisible] = useState(10);

  const showEmpty = useMemo(
    () => !loading && results.length === 0 && query.trim().length > 0,
    [loading, results.length, query]
  );

  const showIntro = useMemo(
    () => !loading && results.length === 0 && query.trim().length === 0,
    [loading, results.length, query]
  );

  useEffect(() => {
    function onHome() {
      resetHome();
    }

    window.addEventListener("watchly:home", onHome);
    return () => window.removeEventListener("watchly:home", onHome);
  }, []);

  useEffect(() => {
    async function loadTrending() {
      try {
        const res = await fetch(
          "/api/movies/trending/today"
        );
        const data = await res.json();
        const arr = Array.isArray(data) ? data : [];
        setTrendingToday(arr);
        setTrendingVisible(10);
      } catch (err) {
        console.error("Trending fetch error:", err);
      }
    }

    loadTrending();
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const t = window.setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/movies/search?query=${encodeURIComponent(q)}`
        );
        const data = await res.json();
        const arr = Array.isArray(data) ? data : [];
        setSuggestions(arr.slice(0, 6));
        setShowSuggestions(true);
      } catch {
        // ignore
      }
    }, 250);

    return () => window.clearTimeout(t);
  }, [query]);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(

        `/api/movies/search?query=${query}`
      );
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Search error:", err);
    }

    setLoading(false);
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSearch();
  }

  function resetHome() {
    setQuery("");
    setResults([]);
    setLoading(false);
    setTrendingVisible(10);
    setSuggestions([]);
    setShowSuggestions(false);
  }

  return (
    <div className="page">
      <section className="hero">
        <div className="container">
          <div className="hero-card">
            <div className="hero-inner">
              <h1 className="hero-title">Discover Movies You'll Love</h1>
              <p className="hero-subtitle">
                Search millions of movies and build your watchlist.
              </p>

              <form className="search-row" onSubmit={onSubmit}>
                <div className="search-input-wrap">
                  <SearchIcon className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search for a movie…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                    onFocus={() => suggestions.length && setShowSuggestions(true)}
                    onBlur={() => window.setTimeout(() => setShowSuggestions(false), 120)}
                  />

                  {showSuggestions && suggestions.length > 0 && (
                    <div className="suggestion-popover">
                      {suggestions.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          className="suggestion-item"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setQuery(m.title);
                            setShowSuggestions(false);
                            setSuggestions([]);
                            window.requestAnimationFrame(() => handleSearch());
                          }}
                        >
                          <span className="suggestion-left">
                            <img
                              className="suggestion-poster"
                              src={m.poster_url}
                              alt=""
                              loading="lazy"
                            />
                            <span className="suggestion-text">
                              <span className="suggestion-title">{m.title}</span>
                              <span className="suggestion-meta">{m.release_date || ""}</span>
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button className="btn-gradient" type="submit" disabled={loading}>
                  {loading ? "Searching…" : "Search"}
                </button>
              </form>

            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {loading ? (
          <SkeletonGrid count={10} />
        ) : (
          <div className="movie-grid">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {trendingToday.length > 0 && results.length === 0 && query.trim().length === 0 && (
          <section style={{ marginTop: 26 }}>
            <h2 className="section-title">Trending Today</h2>
            <div className="movie-grid">
              {trendingToday.slice(0, trendingVisible).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
              <button
                type="button"
                className="nav-cta"
                onClick={() => setTrendingVisible((v) => v + 10)}
                disabled={trendingVisible >= trendingToday.length}
                style={{ opacity: trendingVisible >= trendingToday.length ? 0.6 : 1 }}
              >
                {trendingVisible >= trendingToday.length ? "All loaded" : "Load 10 more"}
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default MovieSearch;
