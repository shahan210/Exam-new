import axios from "axios";
const baseUrl = import.meta.env.VITE_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      // console.log(response.data.data);
      return response.data.data;
    } else {
      return response;
    }
  },
  (err) => {
    const config = err?.config;
    if (err?.response?.status === 401 && !config?.sent) {
      console.log("conf refresh--------------------");
    }
    if (err?.response?.status === 403) {
      // console.log("forbidden");
    }
    if (!err.response) {
      console.log(err);
      console.log("Err! Network err!");
    }
    throw err;
  }
);
export default axiosInstance;
