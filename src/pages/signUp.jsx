import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";

import "../styles/auth.css";

function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ now exists (see AuthContext fix below)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password, // ✅ ONLY THESE 3
        }
      );

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);

      setUser(data.user); // ✅ context updated
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }

    setLoading(false);
  };
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-welcome-side">
          <h2>Hello Friends!</h2>
          <p>Enter your personal details to use all site features</p>
          <Link to="/login" className="btn-outline">
            SIGN IN
          </Link>
        </div>

        <div className="auth-form-side">
          <h1>Create Account</h1>
          <p>or use your email for registration</p>

          {error && <div className="error-message">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating account..." : "SIGN UP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function SignupPage() {
  return (
    <AuthProvider>
      <SignupForm />
    </AuthProvider>
  );
}

export default SignupPage;
