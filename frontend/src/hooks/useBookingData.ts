import { useEffect, useState } from "react";
import api from "@/api/axios";
import { GetBookingServiceAPI } from "@/api/user.service";

export const useBookingData = (shouldFetch: boolean) => {
   const [bookings, setBookings] = useState<any[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   useEffect(() => {
      if (!shouldFetch) return;

      const fetchBookings = async () => {
         try {
            setLoading(true);
            setError("");

            const res = await GetBookingServiceAPI()
            console.log(res)

            setBookings(res.data);
         } catch (err: any) {
            setError(err.message || "Failed to fetch bookings");
         } finally {
            setLoading(false);
         }
      };

      fetchBookings();
   }, [shouldFetch]);

   return { bookings, loading, error };
};