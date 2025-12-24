import { useEffect, useState } from "react";
import TOURS_API from "../api/tours.js";
import ADMIN_API from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/admin.css";

const Admin = () => {
  const { user, logout } = useAuth();
  const [isBusy, setIsBusy] = useState(false);
  const [tours, setTours] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTour, setNewTour] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  // Fetch status, tours, contacts
  useEffect(() => {
    if (user?.email) fetchStatus();
    fetchTours();
    fetchContacts();
  }, [user]);

  const fetchStatus = async () => {
    try {
      const res = await ADMIN_API.get(`/status/${user.email}`);
      setIsBusy(res.data.isBusy);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleBusy = async () => {
    try {
      const res = await ADMIN_API.put(`/toggle-busy/${user.email}`);
      setIsBusy(res.data.isBusy);
    } catch (err) {
      console.error(err);
    }
  };

  // Tours
  const fetchTours = async () => {
    try {
      const res = await TOURS_API.get("/");
      const toursArray = Array.isArray(res.data) ? res.data : res.data.tours || [];
      setTours(toursArray);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTour = async () => {
    if (!newTour.title || !newTour.price || !newTour.description || !newTour.image) {
      return alert("Please fill all fields including image");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", newTour.title);
      formData.append("description", newTour.description);
      formData.append("price", newTour.price);
      formData.append("image", newTour.image);

      await TOURS_API.post("/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewTour({ title: "", description: "", price: "", image: null });
      setShowAddForm(false);
      fetchTours();
    } catch (err) {
      console.error("Failed to add tour:", err);
      alert(err.response?.data?.message || "Failed to add tour");
    }

    setLoading(false);
  };

  const handleDeleteTour = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await TOURS_API.delete(`/delete/${id}`);
      fetchTours();
    } catch (err) {
      console.error(err);
    }
  };

  // Contacts
  const fetchContacts = async () => {
    try {
      const res = await ADMIN_API.get("/contact");
      setContacts(res.data); // Assuming backend returns an array
    } catch (err) {
      console.error("Failed to fetch contact messages:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

const handleLogout = () => {
  logout();
  window.location.href = "/"; // 🔹 Redirect to home page instead of admin login
};
  return (
    <div className="admin-dashboard">
      <header>
        <h1>Welcome, {user?.email}</h1>
        <div className="admin-header-actions">
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
          <button className="btn-busy" onClick={toggleBusy}>{isBusy ? "Set Available" : "Set Busy"}</button>
        </div>
      </header>

      <main>
        {/* Tours Section */}
        <section className="tour-management">
          <h2>Tours Management</h2>
          <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Cancel" : "Add Tour"}
          </button>

          {showAddForm && (
            <div className="add-tour-form">
              <input
                type="text"
                placeholder="Tour Title"
                value={newTour.title}
                onChange={(e) => setNewTour({ ...newTour, title: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={newTour.description}
                onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                value={newTour.price}
                onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewTour({ ...newTour, image: e.target.files[0] })}
              />
              <button className="btn-primary" onClick={handleAddTour} disabled={loading}>
                {loading ? "Adding..." : "Submit"}
              </button>
            </div>
          )}

          <div className="tours-list">
            {tours.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((tour) => (
                    <tr key={tour._id}>
                      <td>{tour.title}</td>
                      <td>{tour.description}</td>
                      <td>Rs. {tour.price}</td>
                      <td>
                        {tour.image && (
                          <img
                            src={`${import.meta.env.VITE_UPLOADS_URL}/${tour.image}`}
                            alt={tour.title}
                            style={{ width: "100px", height: "60px", objectFit: "cover" }}
                          />
                        )}
                      </td>
                      <td>
                        <button className="btn-secondary" onClick={() => handleDeleteTour(tour._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No tours available</p>
            )}
          </div>
        </section>

        {/* Contact Messages Section */}
        <section className="contact-messages">
          <h2>Contact Messages</h2>
          {contacts.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone || "-"}</td>
                    <td>{c.message}</td>
                    <td>{new Date(c.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No contact messages yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Admin;
