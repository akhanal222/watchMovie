import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddToWatchlistButton from "./AddToWatchlistButton";
function MovieDetail() {
  const { id } = useParams(); // get movie ID from URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`http://localhost:3000/api/movies/${id}`);
      const data = await res.json();
      setMovie(data);
    }
    fetchMovie();
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  async function backToHome() {
    window.location.href = "/";
  }

  return (
    <div className="movie-detail-page">
      <div className="movie-detail-container">
        <img
          className="movie-detail-poster"
          src={movie.poster_url}
          alt={movie.title}
        />

        <div className="movie-detail-info">
          <h1>{movie.title}</h1>
          <AddToWatchlistButton
            movie={{
              id: movie.id,
              title: movie.title,
              poster_url: movie.poster_url,
              release_date: movie.release_date,
            //   genre: movie.genre,
              genre_id: movie.genre_id, // genre ID from TMDB
            }}
          />

          <button className="back-button" onClick={backToHome}>
            Back to Home
          </button>
          <p>
            <strong>Release:</strong> {movie.release_date}
          </p>

          <p>
            {/* <strong>Genres:</strong> {movie.genres?.join(", ")} */}
            <strong>Genre:</strong> {movie.genre}
          </p>

          <p className="overview">{movie.overview}</p>

          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
