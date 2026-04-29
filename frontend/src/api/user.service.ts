import { API_ENDPOINTS } from "@/constant/apiRoutes";
import api from "./axios";
import { bookingData } from "@/types/data";
import { Roles } from "@/constant/data";

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

export const GetBookingServiceAPI = async () => {
   const res = await api.get(
      API_ENDPOINTS.USER.BOOKING,
   );

   return res.data;
}

export const switchRoleApi = async (
   role: Roles
) => {
   const response = await api.patch(
      API_ENDPOINTS.USER.SWITCH,
      { role },
   );

   return response.data;
};