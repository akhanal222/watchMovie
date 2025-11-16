// "use strict";
// const express = require("express");
// const app = express();
// const multer = require("multer");

// // Middlewares
// app.use(multer().none());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // ADD THIS — Import your routes
// const movieRoutes = require("./routes/movieroute");

// // REGISTER API ROUTES FIRST
// app.use("/", movieRoutes);
// app.use("/api/movies", tmdbRoutes);

// // STATIC FRONTEND LAST (important)
// app.use(express.static("frontend"));



// const PORT = process.env.PORT || 3000;
// app.listen(PORT, function () {
//     console.log("Server listening on port: " + PORT + "!");
// });

// "use strict";

// require("dotenv").config();
// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");

// const app = express();
// const corsOptions = {
//   origin: 'http://localhost:5173', // react frontend URL
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true // Allow cookies and authentication headers
// };
// router.use(cors(corsOptions));


// app.use(cors());
// app.use(multer().none());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Import TMDB route
// const tmdbRoutes = require("./routes/tmdbRoutes");

// // Register API route
// app.use("/api/movies", tmdbRoutes);

// // Serve frontend files
// app.use(express.static("frontend"));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log("Server listening on port:", PORT);
// });


"use strict";

require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

// GLOBAL CORS CONFIG
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// Middleware
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  Import TMDB route
const tmdbRoutes = require("./routes/tmdbRoutes");

// Register API route
app.use("/api/movies", tmdbRoutes);

const watchlistRoutes = require("./routes/watchlistRoutes");

app.use("/api/watchlist", watchlistRoutes);


// Serve frontend files (optional for now)
app.use(express.static("frontend"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
});
