import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.NODE_ENV === "development"
      ? "http://localhost:5001/api"
      : "/api",
  withCredentials: true,
});

export default axiosInstance;
