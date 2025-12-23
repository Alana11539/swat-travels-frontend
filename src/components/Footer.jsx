import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../styles/footer.css"; // keep your CSS file as is

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Brand Section */}
        <div className="footer-brand">
          <h3>Swat-Gilgit Travels</h3>
          <p>
            Explore Pakistan’s northern beauty with unforgettable journeys through Swat, Hunza, Gilgit, and beyond.
            From majestic mountains to hidden valleys, every tour inspires adventure with Swat Gilgit Travels.
          </p>
          <div className="footer-social">
            <a href="https://facebook.com" className="facebook" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" className="linkedin" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" className="instagram" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://wa.me/03009305483" className="whatsapp" target="_blank" rel="noreferrer">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>
              <span><FaEnvelope className="fa-envelope" /></span>
              swatgilgittravels@gmail.com
            </li>
            <li>
              <span><FaPhone className="fa-phone" /></span>
              0300-9305483
            </li>
            <li>
              <span><FaMapMarkerAlt className="fa-map-marker-alt" /></span>
              Mingora, Pakistan, 19200
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/tours">Tours</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="footer-bottom">
        <p>
          Copyright © 2025. All Rights Reserved Swat-Gilgit Travels. — Designed with love by -
          <strong>Laiba Snober</strong> 
        </p>
      </div>
    </footer>
  );
};

export default Footer;
