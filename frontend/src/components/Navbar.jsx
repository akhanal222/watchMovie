import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">
       <Link to="/">
        <img src={logo} alt="Watchly Logo" />
      </Link>
      </h2>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/watchlist">Watchlist</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
