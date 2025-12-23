import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import '../styles/auth.css'
function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login", { replace: true });
      } else if (adminOnly && !isAdmin()) {
        navigate("/", { replace: true });
      }
    }
  }, [user, loading, adminOnly, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || (adminOnly && !isAdmin())) return null;

  return children;
}

export default ProtectedRoute;
