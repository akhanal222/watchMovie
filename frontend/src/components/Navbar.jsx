import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <nav className="navbar">
      <h2 className="logo">
       <Link to="/">
        <img src={logo} alt="Watchly Logo" />
      </Link>
      </h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {token ? (
          <>
            <li><Link to="/watchlist">Watchlist</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
