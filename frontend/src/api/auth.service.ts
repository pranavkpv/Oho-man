import { registrationData } from '@/types/data';
import api from '../api/axios';
import { API_ENDPOINTS } from '../constant/apiRoutes';

export const getAllServicesAPI = async () => {
   const res = await api.get(
      API_ENDPOINTS.AUTH.SERVICES
   );
   return res.data;
}

export const registerAPI = async (
   data: registrationData
) => {
   return api.post(
      API_ENDPOINTS.AUTH.REGISTER,
      data
   );
}