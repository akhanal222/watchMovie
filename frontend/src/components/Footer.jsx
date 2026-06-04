import { Link } from "react-router-dom";

function Footer() {
  return (
   <footer className="footer">
  <div className="container footer-inner">
    <div>
      <strong>Watchly</strong>
      <p className="footer-copy">
        Discover movies and build your perfect watchlist.
      </p>
    </div>

    <p className="footer-copy">
      © {new Date().getFullYear()} Watchly
    </p>
  </div>
</footer>
  );
}

export default Footer;
