import Navbar from "./components/Navbar";
import MovieSearch from "./components/MovieSearch";
import Watchlist from "./components/Watchlist";
import Login from "./components/Login";
import Register from "./components/Register";
import MovieDetail from "./components/MovieDetail";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { ToastProvider } from "./components/Toast";
import "./App.css";

function App() {
  return (
      <div className="app-shell">
        <ToastProvider>
        <Navbar />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<MovieSearch />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
        <Footer />
        </ToastProvider>
      </div>
  );
}
export default App;
