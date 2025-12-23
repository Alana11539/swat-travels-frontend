import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/bookingSummary.css";

const BookingSummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    tourName,
    price,
    duration,
    fullName,
    email,
    phone,
    travelDate,
    numberOfTravelers,
    specialRequests,
    paymentMethod, // ✅ added
  } = location.state || {};

  // Safety check (direct URL open na ho)
  if (!tourName) {
    return (
      <div className="booking-summary-page">
        <h2>No booking data found</h2>
        <button onClick={() => navigate("/tours")}>
          Go Back to Tours
        </button>
      </div>
    );
  }

  return (
    <div className="booking-summary-page">
      <div className="booking-summary-container">
        <h1>🎉 Thank You for Your Booking!</h1>
        <p className="subtitle">
          Your booking has been confirmed. Here is your booking summary:
        </p>

        <div className="summary-box">
          <h2>Tour Details</h2>
          <p><strong>Tour Name:</strong> {tourName}</p>
          <p><strong>Duration:</strong> {duration}</p>
          <p><strong>Price:</strong> PKR {price.toLocaleString()}</p>

          <h2>Traveler Information</h2>
          <p><strong>Name:</strong> {fullName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>

          <h2>Trip Details</h2>
          <p><strong>Travel Date:</strong> {travelDate}</p>
          <p><strong>Number of Travelers:</strong> {numberOfTravelers}</p>
          <p><strong>Special Requests:</strong> {specialRequests || "None"}</p>
          <p><strong>Payment Method:</strong> {paymentMethod || "Not Selected"}</p> {/* ✅ added */}
        </div>

        <button className="back-home-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingSummaryPage;
