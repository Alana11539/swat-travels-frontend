import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Link added
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/auth.css";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const endpoint =
        role === "admin"
          ? `${import.meta.env.VITE_API_URL}/admin/login`
          : `${import.meta.env.VITE_API_URL}/users/login`;

      const { data } = await axios.post(endpoint, formData);

      const userData = data.user || data.admin;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("accessToken", data.accessToken);
      setUser(userData);

      navigate(role === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-side">
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div
  className="form-group"
  style={{
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "white", // default color
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "0.3s",
  }}
>

            <label>Login as:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleLogin}
            disabled={loading}
            style={{ backgroundColor: " #174C49" }}
          >
            {loading ? "Signing in..." : "SIGN IN"}
          </button>

          {/* ✅ Signup link – NOW IN CORRECT PLACE */}
          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={{ color: " #174C49", fontWeight: "600" }}>
              Sign up
            </Link>
          </p>
        </div>

        <div className="auth-welcome-side">
          <h2>Welcome Back!</h2>
          <p>Use your credentials to login.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
