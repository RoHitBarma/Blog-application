// // src/api/axiosClient.js
// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: "http://localhost:8000/api/v1", // apne backend ke hisab se change kar sakte ho
//   withCredentials: true,
// });

// export default axiosClient;


import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: false,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
