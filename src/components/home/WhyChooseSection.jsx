import { useEffect, useRef, useState } from "react";

// const images = [
//   { src: "/skardu.png", alt: "SKARDU" },
//   { src: "/gilgit.jpg", alt: "GILGIT" },
//   { src: "/beautiful-green-mountain-lake-pakistan.jpg", alt: "MALAM JABA" },
//   { src: "/karakoram.jpg", alt: "KARAKORAM" },
// ];
const images = [
  {
    src: "/skardu.png",
    title: "Skardu",
    desc: "Gateway to crystal lakes, cold deserts, and majestic peaks.",
  },
  {
    src: "/gilgit.jpg",
    title: "Gilgit",
    desc: "Heart of Gilgit-Baltistan with rich culture and valleys.",
  },
  {
    src: "/beautiful-green-mountain-lake-pakistan.jpg",
    title: "Malam Jabba",
    desc: "Famous for skiing, green hills, and scenic beauty.",
  },
  {
    src: "/karakoram.jpg",
    title: "Karakoram",
    desc: "Home to the world’s highest mountain ranges.",
  },
];

function WhyChooseSection() {
  const [visible, setVisible] = useState(false);
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

  return (
    <section className="why-choose" ref={sectionRef}>
      <div className="why-choose-header">
        <h2>
          WHY CHO0SE{" "}
          <span className="why-choose-color">SWAT-GILGIT TRAVELS?</span>
        </h2>
      </div>
      <p className="why-choose-text">
        We are committed to providing unforgettable travel experiences across
        the northern regions of Pakistan. Our tours are tailored to combine
        stunning natural landscapes, cultural heritage, and adventure
        activities. With expert local guides, comfortable accommodations, and
        personalized itineraries, we ensure that every journey through our
        beautiful mountains is safe, enjoyable, and memorable.
      </p>
      <div className="why-choose-images">
        {images.map((img, index) => (
          // <div
          //   key={index}
          //   className="why-choose-image"
          //   style={{
          //     opacity: visible ? 1 : 0,
          //     transform: visible ? "translateY(0)" : "translateY(30px)",
          //     transition: `all 0.6s ease ${index * 0.15}s`,
          //   }}
          // >
          //   <img src={img.src || "/placeholder.svg"} alt={img.alt} />
          //   <div className="why-choose-overlay">
          //     <h4>{img.title}</h4>
          //     <p>{img.desc}</p>
          //   </div>
          // </div>
          <div
  key={index}
  className="why-choose-card"
  style={{
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(30px)",
    transition: `all 0.6s ease ${index * 0.15}s`,
  }}
>
  <div className="why-choose-image">
    <img src={img.src || "/placeholder.svg"} alt={img.title} />
  </div>

  {/* TEXT BELOW IMAGE */}
  <div className="why-choose-info">
    <h4>{img.title}</h4>
    <p>{img.desc}</p>
  </div>
</div>

        ))}
      </div>
    </section>
  );
}
export default WhyChooseSection;
