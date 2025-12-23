import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
  setLoading(false); // this is fine here but keep in mind if you extend with async calls
}, []);


  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  const isAdmin = () => user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
