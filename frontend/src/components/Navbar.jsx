import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import logo from "../assets/logo.png";

function Navbar() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [watchlistCount, setWatchlistCount] = useState(0);

  const isAuthed = useMemo(() => Boolean(token), [token]);

  useEffect(() => {
    async function loadCount() {
      if (!token) {
        setWatchlistCount(0);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/watchlist/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) setWatchlistCount(data.length);
      } catch {
        // ignore (navbar shouldn’t break)
      }
    }

    loadCount();
  }, [token, location.pathname]);

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" aria-label="Watchly Home" onClick={() => window.dispatchEvent(new Event('watchly:home'))}> <img src={logo} alt="Watchly" /> </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className="nav" aria-label="Watchly Home" onClick={() => window.dispatchEvent(new Event('watchly:home'))}> 
              Home
            </Link>

            {/* <Link className="nav-link" to="/">
              Home
            </Link> */}
          </li>

          {isAuthed ? (
            <>
              <li>
                <Link className="nav-link" to="/watchlist">
                  Watchlist <span className="badge">{watchlistCount}</span>
                </Link>
              </li>
              <li>
                <button className="nav-cta" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
