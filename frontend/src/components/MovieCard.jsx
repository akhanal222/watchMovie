import AddToWatchlistButton from "./AddToWatchlistButton";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img src={movie.poster_url} alt={movie.title} />
      </Link>

      <h3>{movie.title}</h3>
      <p>{movie.release_date || "N/A"}</p>

      <AddToWatchlistButton movie={movie} />
    </div>
  );
}

export default MovieCard;
