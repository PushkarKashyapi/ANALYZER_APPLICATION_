import logo from "../assets/bigger_zlim.png";
import "../styles/global.css";

export default function Navbar() {
  return (
    <header className="hero-navbar">
      <img src={logo} alt="ZLIM" className="navbar-logo" />

      <nav className="navbar-links">
        <span>OCR Pattern</span>
        <span>Insights</span>
        <span>Engagement</span>
      </nav>
    </header>
  );
}