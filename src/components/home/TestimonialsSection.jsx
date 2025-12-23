import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Khan",
    role: "Adventure Enthusiast",
    text: "An absolutely incredible experience! The Swat Gilgit Travels team made our trip to Hunza unforgettable. Every detail was perfectly planned, from comfortable accommodations to breathtaking viewpoints. I highly recommend them for anyone looking to explore the beauty of Pakistan's northern areas.",
    avatar: "/owner.jpeg",
  },
  {
    id: 2,
    name: "Sarah Ali",
    role: "Travel Blogger",
    text: "I've traveled with many tour operators, but Swat Gilgit Travels stands out. Their local knowledge, attention to safety, and genuine hospitality made our Skardu trip one for the books. The guides were knowledgeable and friendly throughout the journey.",
    avatar: "/sarah.jpg",
  },
  {
    id: 3,
    name: "Fatima khan",
    role: "Photographer",
    text: "As a photographer, I need tours that give me time and access to capture the beauty around me. Swat Gilgit Travels understood this perfectly. They took us to hidden gems and gave us plenty of time to photograph the stunning landscapes.",
    avatar: "/fatima.jpg",
  },
];

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="testimonials">
      <div className="section-title">
        <h2>
          OUR <span>TESTIMONIALS</span>
        </h2>
      </div>
      <div className="container">
        <div className="testimonials-avatars">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`avatar ${index === activeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.name}
              />
            </div>
          ))}
        </div>
        <div className="testimonial-card">
          <p>"{testimonials[activeIndex].text}"</p>
          <div className="testimonial-author">
            <h4>{testimonials[activeIndex].name}</h4>
            <span>{testimonials[activeIndex].role}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default TestimonialsSection;
