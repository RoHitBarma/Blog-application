import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api/v1", // <== correct backend path
  headers: {
    "Content-Type": "multipart/form-data",
  },
});



export default axiosClient;
