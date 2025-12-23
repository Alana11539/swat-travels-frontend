import React, { useEffect } from "react";
import axios from "axios";
import "../styles/cheackOut.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const selectedTour =
    location.state || JSON.parse(localStorage.getItem("selectedTour")) || {};
  const { tourName, price, duration } = selectedTour;

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", {
        replace: true,
        state: { from: "/checkout", checkoutData: selectedTour },
      });
    }
  }, [user, loading, navigate, selectedTour]);

  // ✅ Redirect if info missing
  useEffect(() => {
    if (tourName == null || price == null || duration == null) {
      alert("Tour information is required");
      navigate("/tours");
    }
  }, [tourName, price, duration, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user) {
    alert("Please login first to book a tour!");
    navigate("/login", { state: { from: "/checkout" } });
    return;
  } const form = e.target;

    if (
      !form.fullName.value ||
      !form.email.value ||
      !form.phone.value ||
      !form.travelDate.value ||
      !form.numberOfTravelers.value ||
      !form.paymentMethod.value
    ) {
      alert("All required fields must be filled!");
      return;
    }

    const checkoutPayload = {
      user: user._id,
      tourName,
      price,
      duration,
      travelerInfo: {
        fullName: form.fullName.value,
        email: form.email.value,
        phone: form.phone.value,
      },
      tripDetails: {
        travelDate: form.travelDate.value,
        numberOfTravelers: Number(form.numberOfTravelers.value),
        specialRequests: form.specialRequests.value,
      },
      paymentMethod: form.paymentMethod.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/checkout",
        checkoutPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

     
    // ✅ Pass traveler info directly to BookingSummary
    navigate("/bookingSummary", {
      state: {
        tourName,
        price,
        duration,
        fullName: form.fullName.value,
        email: form.email.value,
        phone: form.phone.value,
        travelDate: form.travelDate.value,
        numberOfTravelers: Number(form.numberOfTravelers.value),
        specialRequests: form.specialRequests.value,
        paymentMethod: form.paymentMethod.value,
        bookingId: res.data._id,
      },
    });
      
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>
        <p className="checkout-subtitle">
          Complete your booking by filling the details below
        </p>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Traveler Information</h2>

          <input type="text" name="fullName" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email Address" required />
          <input type="tel" name="phone" placeholder="Phone Number" required />

          <h2>Trip Details</h2>

          <input type="date" name="travelDate" required />
          <input
            type="number"
            name="numberOfTravelers"
            placeholder="Number of Travelers"
            min="1"
            required
          />

          <textarea
            name="specialRequests"
            placeholder="Special Requests (optional)"
          />

          <h2>Payment Method</h2>

          <select name="paymentMethod" required>
            <option value="">Select Payment Method</option>
            <option value="PayPal">PayPal</option>
            <option value="Easypaisa">Easypaisa</option>
            <option value="JazzCash">JazzCash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>

          <button type="submit" className="confirm-btn">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
