import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Import icons
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

import "../styles/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();

  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path) => (pathname === path ? "active" : "");

  const handleNavClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-left">
          <span><FaPhoneAlt /> 0300-9305483</span>
          <span><FaEnvelope /> swatgilgittravels@gmail.com</span>
        </div>
        <div className="top-bar-right">
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          <a href="https://wa.me/03009305483" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          {/* Logo + Text */}
          <Link to="/" className="logo">
            <img src="/Icon.png" alt="logo" className="logo-img" />
            <span> <strong>Swat-Gilgit Travels</strong></span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation */}
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <ul className="nav-links">
              <li>
                <Link to="/" className={isActive("/")} onClick={handleNavClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tours"
                  className={isActive("/tours")}
                  onClick={handleNavClick}
                >
                  Tours
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={isActive("/about")}
                  onClick={handleNavClick}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={isActive("/contact")}
                  onClick={handleNavClick}
                >
                  Contact Us
                </Link>
              </li>
              {isAdmin() && <li><Link to="/admin" className={isActive("/admin")}>Admin</Link></li>}
            </ul>

            <div className="nav-buttons">
              {user ? (
                <>
                  <span className="nav-btn login">Hi, {user.name}</span>
                  <button
                    className="nav-btn signup"
                    onClick={() => {
                      logout();
                      handleNavClick();
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="nav-btn login"
                    onClick={handleNavClick}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="nav-btn signup"
                    onClick={handleNavClick}
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
