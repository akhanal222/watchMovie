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

      
      <AddToWatchlistButton 
        movie={{
          id: movie.id,
          title: movie.title,
          poster_url: movie.poster_url,
          release_date: movie.release_date,
          // genre: movie.genre,        
          genre_id: movie.genre_id    
        }} />
    </div>
  );
}

export default MovieCard;
