import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3030", // your backend URL
});

axiosInstance.interceptors.request.use(config => {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");
  if (username && password) {
    config.headers.Authorization = "Basic " + btoa(username + ":" + password);
  }
  return config;
});

export default axiosInstance;
