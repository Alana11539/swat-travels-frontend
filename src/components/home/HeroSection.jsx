// import { useEffect, useState, useRef } from "react"
// import { Link } from "react-router-dom";

// const heroImages = [
//   "/mountain-tour-landscape.jpg",
//   "/hunza-valley-beautiful-scenery-mountains.jpg",
//   "/beautiful-green-mountain-lake-pakistan.jpg",
//   "/swat-valley-green-hills-river.jpg",
//   "/fairy-meadows-nanga-parbat-view.jpg",
// ]

//  function HeroSection() {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [isTransitioning, setIsTransitioning] = useState(false)
//   const heroRef = useRef(null)

//   // Auto-slide every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIsTransitioning(true)
//       setTimeout(() => {
//         setCurrentSlide((prev) => (prev + 1) % heroImages.length)
//         setIsTransitioning(false)
//       }, 500)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   const goToSlide = (index) => {
//     if (index !== currentSlide) {
//       setIsTransitioning(true)
//       setTimeout(() => {
//         setCurrentSlide(index)
//         setIsTransitioning(false)
//       }, 500)
//     }
//   }

//   return (
//     <section className="hero" ref={heroRef}>
//       {/* Scrolling background images */}
//       <div className="hero-slider">
//         {heroImages.map((img, index) => (
//           <div
//             key={index}
//             className={`hero-slide ${index === currentSlide ? "active" : ""} ${isTransitioning && index === currentSlide ? "transitioning" : ""}`}
//             style={{ backgroundImage: `url('${img}')` }}
//           />
//         ))}
//         <div className="hero-overlay" />
//       </div>

//       <div className="hero-content">
//         <h1>
//           DON'T JUST TRAVEL
//           <br />– LIVE THE MOUNTAIN
//           <br />
//           ADVENTURE
//         </h1>
//         <p>
//           Experience the breathtaking beauty of Pakistan's northern valleys, majestic peaks, and hidden gems. Your
//           adventure starts here with Swat Gilgit Travels.
//         </p>
//         <div className="hero-buttons">
//           <Link href="/tours" className="btn btn-primary">
//             EXPLORE TOURS
//           </Link>
//           <Link href="/about" className="btn btn-outline">
//             LEARN MORE
//           </Link>
//         </div>
//       </div>

//       {/* Slide indicators */}
//       <div className="hero-indicators">
//         {heroImages.map((_, index) => (
//           <button
//             key={index}
//             className={`indicator ${index === currentSlide ? "active" : ""}`}
//             onClick={() => goToSlide(index)}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Navigation arrows */}
//       <button
//         className="hero-nav hero-nav-prev"
//         onClick={() => goToSlide((currentSlide - 1 + heroImages.length) % heroImages.length)}
//         aria-label="Previous slide"
//       >
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <polyline points="15 18 9 12 15 6" />
//         </svg>
//       </button>
//       <button
//         className="hero-nav hero-nav-next"
//         onClick={() => goToSlide((currentSlide + 1) % heroImages.length)}
//         aria-label="Next slide"
//       >
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//           <polyline points="9 18 15 12 9 6" />
//         </svg>
//       </button>
//     </section>
//   )
// }
// export default HeroSection;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const heroImages = [
  "/mountain-tour-landscape.jpg",
  "/hunza.jpg",
  "/beautiful-green-mountain-lake-pakistan.jpg",
  "/swat-valley-green-hills-river.jpg",
  "/fairy-meadows-nanga-parbat-view.jpg",
];

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
      <div className="hero-background">
    <section className="hero">
      {/* LEFT CONTENT PANEL */}
      <div className="hero-left">
        <div className="hero-content">
          <h1>
            DON'T JUST TRAVEL
            <br />– LIVE THE MOUNTAIN
            <br />
            ADVENTURE
          </h1>

          <p>
            Experience the breathtaking beauty of Pakistan's northern valleys,
            majestic peaks, and hidden gems. Your adventure starts here with
            Swat Gilgit Travels.
          </p>

          <div className="hero-buttons">
            <Link to="/tours" className="btn-book-now">
              BOOK Now
            </Link>
            <Link to="/about" className="btn-view-all">
              VIEW MORE
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT IMAGE SLIDER */}
      <div className="hero-right">
        <div className="hero-slider">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`hero-slide ${
                index === currentSlide ? "active" : ""
              } ${
                isTransitioning && index === currentSlide ? "transitioning" : ""
              }`}
              style={{ backgroundImage: `url('${img}')` }}
            />
          ))}
        </div>

        {/* Indicators */}
        <div className="hero-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          className="hero-nav hero-nav-prev"
          onClick={() =>
            goToSlide(
              (currentSlide - 1 + heroImages.length) % heroImages.length
            )
          }
        >
          ‹
        </button>
        <button
          className="hero-nav hero-nav-next"
          onClick={() => goToSlide((currentSlide + 1) % heroImages.length)}
        >
          ›
        </button>
      </div>
    </section>
      </div>
  );
}

export default HeroSection;
