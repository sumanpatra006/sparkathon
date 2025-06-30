import axios from "axios";

const api = axios.create({
  baseURL: "https://node-api-2ok4.onrender.com/api", // Updated to use the provided backend URL
  withCredentials: true, // If you need cookies/auth
});

export default api;
