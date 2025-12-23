import axios from "axios";

const ADMIN_API = axios.create({
  baseURL: "http://localhost:5000/api/admin",
  headers: {
    "Content-Type": "application/json",
    // agar JWT token hai
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export default ADMIN_API;
