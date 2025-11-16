import AddToWatchlistButton from "./AddToWatchlistButton";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.poster_url} alt={movie.title} />

      <h3>{movie.title}</h3>
      <p>{movie.release_date || "N/A"}</p>

      <AddToWatchlistButton movie={movie} />
    </div>
  );
}

export default MovieCard;
