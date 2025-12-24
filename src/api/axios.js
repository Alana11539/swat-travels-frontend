import axios from "axios";

const ADMIN_API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/admin`,
  headers: {
    "Content-Type": "application/json",
    // agar JWT token hai
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export default ADMIN_API;
