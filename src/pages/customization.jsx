import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/custamaization.css";

const CustomizationPage = () => {
  const navigate = useNavigate();

  const [customData, setCustomData] = useState({
    destination: "",
    duration: "",
    travelers: 1,
    budget: 50000,   // default budget
    specialRequests: "",
  });

  // handleChange for inputs and slider
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomData((prev) => ({
      ...prev,
      [name]: name === "budget" ? Number(value) : value,
    }));
  };

  const handleBook = () => {
    if (!customData.destination || !customData.duration) {
      alert("Please fill destination and duration");
      return;
    }

    navigate("/checkout", {
      state: {
        tourName: `Custom Tour: ${customData.destination}`,
        price: customData.budget,
        duration: `${customData.duration} Days`,
        travelers: customData.travelers,
        specialRequests: customData.specialRequests,
      },
    });
  };

  return (
    <div className="customization-page">
      <div className="customization-container">
        <h1>Customize Your Tour</h1>
        <p>Fill the details below to create your dream tour!</p>

        <div className="customization-form">
          <label>Destination:</label>
          <input
            type="text"
            name="destination"
            placeholder="Enter destination"
            value={customData.destination}
            onChange={handleChange}
            required
          />

          <label>Duration (Days):</label>
          <input
            type="number"
            name="duration"
            placeholder="Enter number of days"
            value={customData.duration}
            onChange={handleChange}
            min="1"
            required
          />

          <label>Number of Travelers:</label>
          <input
            type="number"
            name="travelers"
            value={customData.travelers}
            onChange={handleChange}
            min="1"
            required
          />

          {/* Budget Section */}
          <label>Budget (PKR):</label>
          <input
            type="number"
            name="budget"
            value={customData.budget}
            onChange={handleChange}
            min="20000"
            max="200000"
            step="5000"
          />
          <input
            type="range"
            name="budget"
            min="20000"
            max="200000"
            step="5000"
            value={customData.budget}
            onChange={handleChange}
          />

          <label>Special Requests:</label>
          <textarea
            name="specialRequests"
            placeholder="Any special requests?"
            value={customData.specialRequests}
            onChange={handleChange}
          />

          <button className="book-now-btn" onClick={handleBook}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPage;
