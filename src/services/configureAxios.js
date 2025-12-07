
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => {
    return response.data ?? response;
  },
  (error) => {
    console.error("API Error:", error);

  
    if (!error.response) {
      return Promise.reject({ message: "Network Error", original: error });
    }

    const status = error.response.status;


    if (status === 401) {
      try {
        localStorage.removeItem("token");
      } catch (e) {
        // ignore
      }
      window.location.href = "/login";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
