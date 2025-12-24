import { useState } from "react";
import axios from "axios";

function FeedbackForm({ onReviewAdded }) {
  const [formData, setFormData] = useState({
    irstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/reviews/add`, formData);
      alert("Thank you for your feedback!");
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      onReviewAdded(res.data.review); // notify parent to update testimonials
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit feedback");
    }
    setLoading(false);
  };

  return (
    <section className="feedback">
      <div className="section-title">
        <h2>
          LEAVE YOUR <span>FEEDBACK</span>
        </h2>
      </div>
      <div className="feedback-form">
        <p className="feedback-text">
          Your thoughts help us improve and inspire others to begin their journey with confidence. Share your experience
          with Swat Gilgit Travels and let your story guide future travelers.
        </p>
        <form onSubmit={handleSubmit}>
          {/* Two-column row for first and last name */}
          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Two-column row for email and subject */}
          <div className="form-row">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Leave Your Comments..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default FeedbackForm;
