"use client"
import { useState, useEffect, useRef } from "react"
import CTASection from "../components/home/CTASection.jsx"
import "../styles/about.css"

/* Gallery Images */
const galleryImages = [
  { src: "/gallery1.jpeg", alt: "Hunza Valley" },
  { src: "/gallery2.jpeg", alt: "Skardu Lake" },
  { src: "/gallery3.jpeg", alt: "Fairy Meadows" },
]

/* About Tours Carousel Images */
const aboutTourImages = [
  "/swat.jpg",
  "/hunza.jpg",
  "/Shangri-La-1.jpg",
]

const tourFeatures = [
  "Professional Travel Guides",
  "Luxury Accommodation",
  "Bonfire Experiences",
  "First Aid & Safety Support",
  "Travel Insurance & Safety Support",
  "Lunch & Dinner Arrangements",
  "Customized Package Tours",
]

export default function AboutPage() {
  /* STATES */
  const [activeSlide, setActiveSlide] = useState(0)
  const [tourSlide, setTourSlide] = useState(0)
  const [visible, setVisible] = useState({})
  const sectionsRef = useRef({})

  /* Gallery Auto Slider */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % galleryImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  /* About Tours Carousel Auto Slider */
  useEffect(() => {
    const interval = setInterval(() => {
      setTourSlide((prev) => (prev + 1) % aboutTourImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  /* Intersection Observer */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.2 }
    )

    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
      <main>
        {/* HERO */}
        <section className="about-hero">
          <h1>ABOUT US</h1>
          <p>
            Swat Gilgit Travels is more than a travel company — it's a gateway to unforgettable experiences across
            Pakistan's northern regions. Travel with us and discover the true spirit of the North.
          </p>
        </section>

        {/* ABOUT TOURS */}
        <section
          className="about-tours"
          id="about-tours"
          ref={(el) => (sectionsRef.current["about-tours"] = el)}
          style={{ opacity: visible["about-tours"] ? 1 : 0 }}
        >
          <div className="about-tours-content">
            {/* CAROUSEL */}
            <div className="about-tours-image carousel">
              <img
                src={aboutTourImages[tourSlide]}
                alt="Tour View"
                className="carousel-image"
              />

              <div className="carousel-dots">
                {aboutTourImages.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === tourSlide ? "active" : ""}`}
                    onClick={() => setTourSlide(index)}
                  />
                ))}
              </div>
            </div>

            {/* TEXT */}
            <div className="about-tours-text">
              <h2>
                ABOUT <span>TOURS</span>
              </h2>
              <p>
                Every tour is thoughtfully planned to provide comfort, safety, and unforgettable memories across
                Pakistan’s northern regions.
              </p>
              <h3>WHAT WE OFFER?</h3>
              <ul>
                {tourFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* OWNER */}
        <section
          className="about-owner"
          id="about-owner"
          ref={(el) => (sectionsRef.current["about-owner"] = el)}
          style={{
            opacity: visible["about-owner"] ? 1 : 0,
            transform: visible["about-owner"] ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="section-title">
            <h2>
              ABOUT <span>OWNER</span>
            </h2>
          </div>

          <div className="about-owner-content">
            <div className="owner-card">
              <div className="owner-image">
                <img src="/owner.jpeg" alt="Muhammad Haroon Salim" />
              </div>
              <div className="owner-info">
                <h3>Muhammad Haroon Salim</h3>
                <p className="role">Founder & CEO</p>
                <p>
                  Swat Gilgit Travels was founded with a simple vision — to turn travel
          dreams into meaningful and unforgettable experiences. Every journey
          is personally planned with care, passion, and attention to detail to
          ensure comfort, safety, and authenticity. I believe travel has the
          power to inspire, connect, and transform lives. When you travel with
          Swat Gilgit Travels, you are not just booking a tour — you are trusting
          a journey crafted with dedication and heart.

                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section
          className="trips-gallery"
          id="trips-gallery"
          ref={(el) => (sectionsRef.current["trips-gallery"] = el)}
          style={{ opacity: visible["trips-gallery"] ? 1 : 0 }}
        >
          <div className="section-title">
            <h2>
              TRIPS <span>GALLERY</span>
            </h2>
          </div>

          <div className="gallery-slider">
            <div className="gallery-image">
              <img
                src={galleryImages[activeSlide].src}
                alt={galleryImages[activeSlide].alt}
              />
            </div>

            <div className="gallery-controls">
              {galleryImages.map((_, index) => (
                <div
                  key={index}
                  className={`gallery-dot ${index === activeSlide ? "active" : ""}`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
  )
}
