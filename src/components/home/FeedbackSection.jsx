import { useState } from "react";
import axios from "axios";

function FeedbackForm({ onReviewAdded }) {
  const [formData, setFormData] = useState({
    userName: "",
    rating: "",
    comment: "",
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
      setFormData({ userName: "", rating: "", comment: "" });
      onReviewAdded(res.data.review); // notify parent to update testimonials
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit feedback");
    }
    setLoading(false);
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        name="userName"
        placeholder="Your Name"
        value={formData.userName}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        min="1"
        max="5"
        value={formData.rating}
        onChange={handleChange}
        required
      />
      <textarea
        name="comment"
        placeholder="Your Feedback"
        value={formData.comment}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}

export default FeedbackForm;
