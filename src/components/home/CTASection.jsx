
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Let Us Guide You Through Pakistan's Most Breathtaking Valleys</h2>
        <p>
          Ready to explore beautiful valleys, peaceful mountains, and unforgettable destinations across the North?
          Contact Swat Gilgit Travels today and let our experienced team plan a comfortable and memorable journey just
          for you!
        </p>
        <Link to="/contact" className="btn btn-outline">
          Get In Touch!
        </Link>
      </div>
    </section>
  )
}
export default CTASection;
