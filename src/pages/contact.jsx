import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import "../styles/contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async () => {
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      return setError("Please fill all required fields.");
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setSuccess("Your message has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Try again later.");
    }

    setLoading(false);
  };

  return (
    <main>
      {/* HERO */}
      <section className="contact-hero">
        <h1 className="contact-title">CONTACT US</h1>
        <p className="contact-subtext">
          At Swat Gilgit Travels, every journey starts with a simple connection.
          Our &quot;Contact Us&quot; service makes it easy to reach us and plan
          your perfect trip. We listen to your needs and preferences to create
          a travel experience just for you. Every message or call helps us
          ensure your journey is safe, memorable, and unforgettable.
        </p>
      </section>

      {/* FORM SECTION */}
      <section className="contact-section">
        <div className="contact-card">
          {/* LEFT COLUMN */}
          <div className="contact-left">
            <h3 className="contact-left-title">
              <span className="contact-black-text">LETS </span>
              <span className="contact-green-text">
                TALK <span className="contact-underline">ABOUT</span> EVERYTHING!
              </span>
            </h3>

            <p>
              <FaEnvelope className="contact-icon-green" />{" "}
              <a
                href="mailto:swatgilgittravels@gmail.com"
                className="contact-link"
              >
                swatgilgittravels@gmail.com
              </a>
            </p>

            <p>
              <FaPhoneAlt className="contact-icon-green" />{" "}
              <a href="tel:03009305483" className="contact-link">
                0300-9305483
              </a>
            </p>

            <p>
              <FaMapMarkerAlt className="contact-icon-green" />{" "}
              <span className="contact-link">
                Swat-Gilgit Travels, Mingora, Pakistan, 19200
              </span>
            </p>

            <img
              src="/contact1.png.png"
              alt="Contact illustration"
              className="contact-image"
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="contact-right">
            <p>
              <strong>
                Complete this form to contact us for support or any inquiries
              </strong>
            </p>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <label>Full Name</label>
            <input
              className="contact-input"
              name="name"
              value={formData.name}
              placeholder="Enter Your Full Name"
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              className="contact-input"
              name="email"
              value={formData.email}
              placeholder="Enter Your Email"
              onChange={handleChange}
            />

            <label>Phone No #</label>
            <input
              className="contact-input"
              name="phone"
              value={formData.phone}
              placeholder="Enter Your Phone No."
              onChange={handleChange}
            />

            <label>Message</label>
            <textarea
              className="contact-textarea"
              name="message"
              value={formData.message}
              placeholder="Enter your Message"
              onChange={handleChange}
            />

            <button
              type="button"
              className="contact-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sending..." : "SEND MESSAGE"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
