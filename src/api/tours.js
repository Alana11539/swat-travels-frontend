// src/api/tours.js
import axios from "axios";

const TOURS_API = axios.create({
  baseURL: "http://localhost:5000/api/tours", // just /api/tours
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

// Add tour (admin)
export const addTour = (formData) => TOURS_API.post("/add", formData);

// Get all tours (user or admin)
export const getTours = () => TOURS_API.get("/");

// Update tour (admin)
export const updateTour = (id, formData) => TOURS_API.put(`/update/${id}`, formData);

// Delete tour (admin)
export const deleteTour = (id) => TOURS_API.delete(`/delete/${id}`);

export default TOURS_API;
