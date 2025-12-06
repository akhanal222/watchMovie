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

    const results = data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_url: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      genre_id: movie.genre_ids?.[0] || null,
      // genre: GENRE_MAP[movie.genre_ids?.[0]] || "Unknown"
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
    const firstGenre = movie.genres && movie.genres.length > 0
      ? movie.genres[0]
      : null;
      
    res.json({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      genre_id: movie.genres[0]?.id || null,
      genre: firstGenre?.name || "Unknown",
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      vote_average: movie.vote_average,
    });

  } catch (err) {
    console.error("TMDB details error:", err);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
}
async function getTrendingToday(req, res) {

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`
    );

    const data = await response.json();
    const results = data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      release_date: movie.release_date,
      poster_url: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
      vote_average: movie.vote_average,
      genre_id: movie.genre_ids?.[0] || null,
    }));

    res.json(results);

  } catch (err) {
    console.error("Trending today error:", err);
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
}
async function getMovieVideos(req, res) {
  const { id } = req.params;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`
    );

    const data = await response.json();

    if (!data.results) {
      return res.json([]);
    }

    // Filter YouTube trailers only
    const trailers = data.results
      .filter(video =>
        video.site === "YouTube" &&
        (video.type === "Trailer" || video.type === "Teaser")
      )
      .map(video => ({
        id: video.id,
        key: video.key,          // YouTube video ID
        name: video.name,
        type: video.type,
      }));

    res.json(trailers);

  } catch (err) {
    console.error("TMDB video error:", err);
    res.status(500).json({ error: "Failed to fetch movie videos" });
  }
}



module.exports = { searchMovies, getMovieDetails, getTrendingToday, getMovieVideos };
