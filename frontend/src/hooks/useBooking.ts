import { useState } from "react";
import { BookingServiceAPI } from "@/api/user.service";

export const useBooking = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const bookService = async ({
      serviceId,
      providerId,
   }: {
      serviceId: string;
      providerId: string;
   }) => {
      try {
         setLoading(true);
         setError("");

         const res = await BookingServiceAPI({ serviceId, providerId })

         return res.data;
      } catch (err: any) {
         setError(err.message || "Booking failed");
         throw err;
      } finally {
         setLoading(false);
      }
   };

   return { bookService, loading, error };
};