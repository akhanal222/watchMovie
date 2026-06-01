import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddToWatchlistButton from "./AddToWatchlistButton";

function MovieDetail() {
  const { id } = useParams(); // get movie ID from URL
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`http://localhost:3000/api/movies/${id}`);
      const data = await res.json();
      setMovie(data);
    }
    fetchMovie();
  }, [id]);

  useEffect(() => {
    async function loadTrailer() {
      try {
        const res = await fetch(`http://localhost:3000/api/movies/${id}/videos`);
        const data = await res.json();
        if (data.length > 0) setTrailer(data[0]); // first trailer
      } catch (err) {
        console.error("Trailer fetch error:", err);
      }
    }
    loadTrailer();
  }, [id]);

  if (!movie) return <h2 style={{ color: "#fff" }}>Loading...</h2>;

  function backToHome() {
    window.dispatchEvent(new Event("watchly:home"));
    navigate("/");
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : null;
  const genres = movie.genres && Array.isArray(movie.genres) ? movie.genres : (movie.genre ? [movie.genre] : []);

  return (
    <div className="movie-detail-page">
      <div className="md-container">
        <div className="movie-detail-grid">

          <div className="poster-wrap">
            <img
              className="movie-detail-poster"
              src={movie.poster_url}
              alt={movie.title}
            />
          </div>

          <div className="movie-detail-info">
            <div className="meta-row">
              <div>
                <h1 className="movie-title-detail">
                  {movie.title}
                  {releaseYear && <span className="release-year"> ({releaseYear})</span>}
                </h1>

                <div className="genre-row">
                  {genres.map((g, idx) => (
                    <span key={idx} className="genre-pill">{g}</span>
                  ))}
                </div>
              </div>
            </div>

            <p className="overview">{movie.overview}</p>

            <div className="actions">
              <AddToWatchlistButton movie={{
                id: movie.id,
                title: movie.title,
                poster_url: movie.poster_url,
                release_date: movie.release_date,
                genre_id: movie.genre_id
              }} />

              <button className="btn-outline" onClick={backToHome}>
                ← Back
              </button>
            </div>

            <div className="details-card">
              <div className="detail-item">
                <div className="detail-label">Release</div>
                <div className="detail-value">{movie.release_date || "—"}</div>
              </div>

              <div className="detail-item">
                <div className="detail-label">Rating⭐</div>
                <div className="detail-value"> {movie.vote_average ?? "—"} </div>
              </div> 

              <div className="detail-item">
                <div className="detail-label">Genre</div>
                <div className="detail-value">{genres.join(", ") || "—"}</div>
              </div>
            </div>

            {trailer && (
              <div className="trailer-section">
                <h3 style={{ margin: 0, marginBottom: 10, color: "#fff" }}>Trailer</h3>
                <div className="iframe-wrap">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Movie Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default MovieDetail;