import { useEffect, useRef, useState } from "react";

const services = [
  {
    title: "Luxury Accommodations",
    description:
      "Stay in carefully selected hotels and resorts that combine comfort, elegance, and breathtaking views. After a day of exploring, relax and unwind in spaces designed to refresh and rejuvenate.",
    image: "/luxury.jpg",
    position: "left-top",
    highlight: true,
  },
  {
    title: "Bonfire Experience",
    description:
      "Gather around cozy bonfires under the starry mountain sky. Enjoy warmth, music, and shared stories while taking in the serene night surroundings in the perfect way to end an adventurous day and create lasting memories.",
    image: "/bonefire.jpg",
    position: "right-top",
  },
  {
    title: "Lunch & Dinner",
    description:
      "Savor fresh, hygienic, and delicious meals throughout your trip experience authentic local and traditional flavors in every dish. Our culinary arrangements are designed to keep you energized for all adventures ahead.",
    image: "/lunch.png",
    position: "left-bottom",
  },
  {
    title: "First Aid & Safety Support",
    description:
      "Your safety is our top priority during every journey. Basic first aid facilities and emergency support are always available. Travel with peace of mind knowing we take care of every detail.",
    image: "/firstaid.png",
    position: "right-bottom",
  },
];

function ServicesSection() {
  const [visible, setVisible] = useState(false);
  const [globeRotation, setGlobeRotation] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Continuous globe rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobeRotation((prev) => prev + 0.5);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <header ref={sectionRef}>
      <div className="section-title">
        <h2>
          OUR <span className="service-color">SERVICES</span>
        </h2>
      </div>
      <p className="services-intro">
        We provide thoughtfully planned travel services tailored to every type
        of explorer. From expert travel guides to luxury accommodations, we
        ensure comfort at every step. Our services include safe transportation,
        quality meals, and essential on-trip support. With Swat Gilgit Travels,
        every service is designed to enhance your adventure experience.
        <br />
        <br />
      </p>
      <section className="services" ref={sectionRef}>
        {/* <div className="section-title">
        <h2>
          OUR <span>SERVICES</span>
        </h2>
      </div>
      <p className="services-intro">
        We provide thoughtfully planned travel services tailored to every type
        of explorer. From expert travel guides to luxury accommodations, we
        ensure comfort at every step. Our services include safe transportation,
        quality meals, and essential on-trip support. With Swat Gilgit Travels,
        every service is designed to enhance your adventure experience.
      </p> */}

        <div className="services-grid">
          {/* Left column services */}
          <div className="services-column services-left">
            {services
              .filter((s) => s.position.includes("left"))
              .map((service, index) => (
                <div
                  key={index}
                  className={`service-card-new ${
                    service.highlight ? "highlight" : ""
                  }`}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(-50px)",
                    transition: `all 0.6s ease ${index * 0.2}s`,
                  }}
                >
                  <div className="service-card-content">
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                  <div className="service-card-image">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* Center globe */}
          <div className="services-center">
            <div
              className="globe-container-new"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.5)",
                transition: "all 0.8s ease 0.3s",
              }}
            >
              <div
                className="globe-wrapper"
                style={{ transform: `rotateY(${globeRotation}deg)` }}
              >
                <img src="/globe.png" alt="Globe" />
              </div>
              {/* Orbiting airplane */}
              <div
                className="airplane-orbit"
                style={{ transform: `rotateZ(${globeRotation * 2}deg)` }}
              >
                <svg
                  className="airplane-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#2D4A3E"
                >
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right column services */}
          <div className="services-column services-right">
            {services
              .filter((s) => s.position.includes("right"))
              .map((service, index) => (
                <div
                  key={index}
                  className="service-card-new"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateX(0)" : "translateX(50px)",
                    transition: `all 0.6s ease ${index * 0.2}s`,
                  }}
                >
                  <div className="service-card-image">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                    />
                  </div>
                  <div className="service-card-content">
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </header>
  );
}
export default ServicesSection;
