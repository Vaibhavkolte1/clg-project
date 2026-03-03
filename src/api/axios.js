import axios from "axios";

const DEFAULT_API_URL = "https://e-commarce-backend-1.onrender.com/api";
const BASE_URL = import.meta.env.DEV
    ? '/api'
    : (import.meta.env.VITE_API_URL || DEFAULT_API_URL);

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;