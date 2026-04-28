import { useEffect, useState } from 'react';
import { getAllServicesAPI } from '@/api/auth.service';
import { ServiceType } from '@/types/data';

interface UseServicesReturn {
   services: ServiceType[];
   loading: boolean;
   error: string | null;
   refetch: () => Promise<void>;
}

export const useServices = (
   shouldFetch: boolean
): UseServicesReturn => {

   const [services, setServices] = useState<ServiceType[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fetchServices = async () => {
      try {
         setLoading(true);
         setError(null);

         const response = await getAllServicesAPI();

         setServices(response?.data || []);
      } catch (err) {
         console.error('Service fetch failed:', err);
         setError('Failed to fetch services');
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (shouldFetch) {
         fetchServices();
      }
   }, [shouldFetch]);

   return {
      services,
      loading,
      error,
      refetch: fetchServices
   };
};