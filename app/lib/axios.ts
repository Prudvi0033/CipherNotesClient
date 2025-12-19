import axios from "axios";

const NEXT_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string || "http://localhost:8000/api";

export const axiosInstance = axios.create({
  baseURL: NEXT_BACKEND_URL,
  withCredentials: false,
});
