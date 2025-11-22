import Navbar from "./components/Navbar";
import MovieSearch from "./components/MovieSearch";
import Watchlist from "./components/Watchlist";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </div>
  );
}

export default App;
