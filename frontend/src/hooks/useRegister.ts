import { useState } from 'react';
import { registerAPI } from '@/api/auth.service';
import { registrationData } from '@/types/data';



interface UseRegisterReturn {
   loading: boolean;
   error: string | null;
   registerUser: (
      payload: registrationData
   ) => Promise<boolean>;
}

export const useRegister = (): UseRegisterReturn => {

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const registerUser = async (
      payload: registrationData
   ): Promise<boolean> => {

      try {
         setLoading(true);
         setError(null);

         await registerAPI(payload);

         return true;

      } catch (err) {
         console.error('Registration failed:', err);

         setError(
            err instanceof Error
               ? err.message
               : 'Registration failed'
         );

         return false;

      } finally {
         setLoading(false);
      }
   };

   return {
      loading,
      error,
      registerUser
   };
};