import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:2024/api",
  baseURL: "https://evangadibackend-oef5.onrender.com",
});

export default axiosInstance;
