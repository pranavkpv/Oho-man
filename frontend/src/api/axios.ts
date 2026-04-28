import axios from "axios";
import { getAccessToken, removeAccessToken } from "../utils/token";
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
   (response) => response,
   async (error) => {
      if (
         error.response?.status === 401
      ) {
         removeAccessToken();
         window.location.href = "/login";
      }
      return Promise.reject(error);
   }
);

export default api;