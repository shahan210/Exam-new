import axios from "axios";
const baseUrl = import.meta.env.VITE_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl,
});
axiosInstance.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data.data;
        } else {
            return response;
        }
    },
    (err) => {
        const config = err?.config;
        if (err?.response?.status === 401 && !config?.sent) {
            window.location.href = "/";
            localStorage.removeItem("token");
            localStorage.removeItem("access");
            localStorage.removeItem("user");
            localStorage.removeItem("rights");
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
