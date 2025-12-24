// Import statements same as original
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthProvider } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaUserFriends, FaClock } from "react-icons/fa";
import "../styles/tours.css";

/* Customization card */
const customTour = {
  id: "custom",
  name: "Customization",
  location: "",
  duration: "",
  groupSize: "",
  price: 0,
  image: "/karakoram.jpg",
  description:
    "Click here to customize your dream tour! Choose your destinations, activities, and duration.",
  isCustom: true,
};

function ToursPage() {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tours/`);
        const backendTours = Array.isArray(res.data)
          ? res.data
          : res.data.tours || [];
        setTours([...backendTours, customTour]);
      } catch (error) {
        console.error("Failed to fetch tours", error);
        setTours([customTour]);
      }
    };
    fetchTours();
  }, []);

  // ❌ category filtering removed
  const sortedTours = [...tours].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    return 0;
  });

  const handleBook = (tour) => {
    const tourData = {
      tourName: tour.name ?? "Custom Tour",
      price: tour.price ?? 0,
      duration: tour.duration || "N/A",
    };
    localStorage.setItem("selectedTour", JSON.stringify(tourData));
    navigate("/checkout", { state: tourData });
  };

  const handleCustomize = () => {
    navigate("/customization");
  };

  return (
    <AuthProvider>
      <main>
        <section className="tours-hero">
          <h1>
            <span className="roboto-serif">OUR TOURS</span>
          </h1>
          <p>
            Explore our tours and create your own adventure in Pakistan's northern regions. <br />
            From breathtaking mountains to peaceful valleys, experience nature like never before. <br />
            Travel with comfort, culture, and unforgettable memories crafted just for you.
          </p>
        </section>

        <section className="tours-section">
          {/* ❌ Filters REMOVED */}

          {/* Sorting */}
          <div className="sort-section">
            <label htmlFor="sortDropdown">Sort by:</label>
            <select
              id="sortDropdown"
              className="sort-dropdown"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Tours Grid */}
          <div className="tours-grid">
            {sortedTours.map((tour) => {
              const isCustom = tour.isCustom;
              const tourId = tour._id || tour.id;

              return (
                <div
                  key={tourId}
                  className={`tour-card ${isCustom ? "custom" : ""} ${
                    expanded === tourId ? "expanded" : ""
                  }`}
                >
                  <div className="tour-card-image">
                    <img
                      src={
                        tour.image
                          ? tour.isCustom
                            ? tour.image
                            : tour.image.startsWith("http")
                            ? tour.image
                            : `${import.meta.env.VITE_API_URL.replace('/api', '')}/${tour.image.replace(/\\/g, '/')}`
                          : "/placeholder.svg"
                      }
                      alt={tour.name}
                    />
                  </div>

                  <div className="tour-card-content">
                    <h3>{tour.name}</h3>

                    {tour.duration && (
                      <div className="tour-card-info">
                        <div className="tour-info-item">
                          <FaClock /> {tour.duration}
                        </div>
                        <div className="tour-info-item">
                          <FaUserFriends /> {tour.groupSize}
                        </div>
                      </div>
                    )}

                    {expanded === tourId && (
                      <p className="tour-card-description">{tour.description}</p>
                    )}

                    <div className="tour-card-footer">
                      {tour.price > 0 && (
                        <div className="tour-price">
                          Rs. {tour.price.toLocaleString()} <span>/person</span>
                        </div>
                      )}
                      <div className="tour-card-buttons">
                        {!isCustom ? (
                          <>
                            <button
                              className="tour-book-btn"
                              onClick={() => handleBook(tour)}
                            >
                              Book Now
                            </button>
                            <button
                              className="tour-details-btn"
                              onClick={() =>
                                setExpanded(expanded === tourId ? null : tourId)
                              }
                            >
                              {expanded === tourId ? "Hide Details" : "Details"}
                            </button>
                          </>
                        ) : (
                          <button
                            className="tour-book-btn"
                            onClick={handleCustomize}
                          >
                            Customize Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {sortedTours.length === 0 && (
              <div className="no-tours">
                <h3>No tours available</h3>
                <p>Please check back later or customize your tour.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </AuthProvider>
  );
}

export default ToursPage;
