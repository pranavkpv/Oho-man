import axios from "axios";
import { getAccessToken, removeAccessToken, setAccessToken } from "../utils/token";
import env from "../config/env";


const api = axios.create({
   baseURL:
      env.API_BASE_URL,
   withCredentials: true
});


api.interceptors.request.use(
   (config) => {

      const token =
         getAccessToken();
      if (token) {
         config.headers.Authorization =
            `Bearer ${ token }`;
      }
      return config;

   },
   (error) =>
      Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // if access token expired / missing
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh-token");

        const newAccessToken = res.data.accessToken;

        setAccessToken(newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        // refresh failed → logout
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;

