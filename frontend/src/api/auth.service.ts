import { loginData, registrationData } from '@/types/data';
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
   const res = await api.post(
      API_ENDPOINTS.AUTH.REGISTER,
      data
   );
   return res.data;
}



export const loginAPI = async (data: loginData) => {
   const res = await api.post(
      API_ENDPOINTS.AUTH.LOGIN,
      data
   );

   return res.data;
};