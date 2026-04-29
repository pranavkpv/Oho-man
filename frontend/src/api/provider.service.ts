import { API_ENDPOINTS } from "@/constant/apiRoutes";
import api from "./axios";

export const getJobAPI = async () => {
   const response = await api.get(
      API_ENDPOINTS.PROVIDER.JOB
   );

   return response.data;
}