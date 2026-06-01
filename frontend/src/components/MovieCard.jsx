import AddToWatchlistButton from "./AddToWatchlistButton";
import { Link } from "react-router-dom";

function formatRating(voteAverage) {
  if (voteAverage === null || voteAverage === undefined) return null;
  const num = Number(voteAverage);
  if (Number.isNaN(num)) return null;
  return num.toFixed(1);
}

function MovieCard({ movie }) {
  const rating = formatRating(movie.vote_average);

  return (
    <div className="movie-card">
      <div className="poster-wrap">
        <Link to={`/movie/${movie.id}`} aria-label={`Open ${movie.title}`}>
          <img src={movie.poster_url} alt={movie.title} loading="lazy" />
        </Link>
        {rating && <div className="rating-badge">★ {rating}</div>}
      </div>

      <div className="card-body">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="movie-title">{movie.title}</h3>
        </Link>
        {/* <div className="movie-meta">{movie.release_date || "N/A"}</div> */}

        <AddToWatchlistButton
          movie={{
            id: movie.id,
            title: movie.title,
            poster_url: movie.poster_url,
            release_date: movie.release_date,
            genre_id: movie.genre_id,
          }}
        />
      </div>
    </div>
  );
}

export default MovieCard;
