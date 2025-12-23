import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import About from "./pages/about.jsx";
import Contact from "./pages/contact.jsx";
import Tours from "./pages/tours.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signUp.jsx";
import HomePage from "./pages/page.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import CheckoutPage from "./pages/cheackOut.jsx";
import BookingSummaryPage from "./pages/bookingSummary.jsx";
import CustomizationPage from "./pages/customization.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminPage from "./pages/admin.jsx";
function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/checkOut" element={<CheckoutPage />} />
        <Route path="/bookingSummary" element={<BookingSummaryPage />} />
        <Route path="/customization" element={<CustomizationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
