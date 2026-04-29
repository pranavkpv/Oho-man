import { API_ENDPOINTS } from "@/constant/apiRoutes";
import api from "./axios";
import { bookingData } from "@/types/data";

export const FetchUseByServiceAPI = async (serviceId: string) => {
   const res = await api.get(
      `${ API_ENDPOINTS.USER.BASE }/${ serviceId }`
   );

   return res.data;
}

export const BookingServiceAPI = async (data: bookingData) => {
   const res = await api.post(
      API_ENDPOINTS.USER.BOOKING,
      data
   );

   return res.data;
}