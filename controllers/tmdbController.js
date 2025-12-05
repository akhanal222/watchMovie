require("dotenv").config();

const TMDB_KEY = process.env.TMDB_API_KEY;

async function searchMovies(req, res) {
  const query = req.query.query;

  if (!query) {
    return res.status(400).json({ error: "Query missing" });
  }

  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}`;

    const response = await fetch(url); // built-in fetch
    const data = await response.json();

    const GENRE_MAP = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      27: "Horror",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      53: "Thriller",
      10752: "War",
      37: "Western"
    };

    const results = data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_url: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      genre: GENRE_MAP[movie.genre_ids?.[0]] || "Unknown"
    }));

    res.json(results);

  } catch (err) {
    console.error("TMDB API error:", err);
    res.status(500).json({ error: "Error fetching from TMDB" });
  }
}

async function getMovieDetails(req, res) {
  const { id } = req.params;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
    );

    const movie = await response.json();

    res.json({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      genres: movie.genres.map(g => g.name),
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      vote_average: movie.vote_average,
    });

  } catch (err) {
    console.error("TMDB details error:", err);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
}

module.exports = { searchMovies, getMovieDetails };
