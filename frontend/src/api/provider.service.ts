import { API_ENDPOINTS } from "@/constant/apiRoutes";
import api from "./axios";

export const getJobAPI = async () => {
   const response = await api.get(
      API_ENDPOINTS.PROVIDER.JOB
   );
   return response.data;
}

export const getMyWorksApi = async () => {
   const res = await api.get(
      API_ENDPOINTS.PROVIDER.MYWORK
   );
   return res.data;
};


export const changeBookingStatus = async (_id: string, status: string) => {
   const response = await api.patch(
      API_ENDPOINTS.PROVIDER.BOOKING,
      { _id, status },
   );
   return response.data;
};


export const updateActiveStatusApi = async (active: boolean) => {
   const response = await api.patch(API_ENDPOINTS.PROVIDER.ACTIVE, {
      active
   });

   return response.data;
};