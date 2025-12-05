import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MovieDetail() {
  const { id } = useParams();      // get movie ID from URL
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
          <p><strong>Release:</strong> {movie.release_date}</p>

          <p><strong>Genres:</strong> {movie.genres?.join(", ")}</p>

          <p className="overview">{movie.overview}</p>

          <p><strong>Rating:</strong> {movie.vote_average}</p>

        </div>
      </div>

    </div>
  );
}

export default MovieDetail;
