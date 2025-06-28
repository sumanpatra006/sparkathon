import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api', // Change to your backend URL
  withCredentials: true, // If you need cookies/auth
});

export default api; 