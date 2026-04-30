import { SERVICESTATUS } from "../../constant/enum";
import { bookingRepository } from "../../repository/booking.repository";

export const getMyWorks = async (providerId: string) => {

   const bookings = await bookingRepository.getProviderBookings(
      providerId
   );

   const pending: any[] = [];
   const progress: any[] = [];
   const completed: any[] = [];

   bookings.forEach((booking: any) => {

      const work = {
         _id: booking._id,

         serviceId: {
            _id: booking.serviceId?._id,
            serviceName: booking.serviceId?.serviceName,
            amount: booking.amount
         },

         userId: {
            _id: booking.userId?._id,
            username: booking.userId?.username,
            email: booking.userId?.email,
            phonenumber: booking.userId?.phonenumber
         },

         date: booking.createdAt
      };

      if (booking.status === SERVICESTATUS.PENDING) {
         pending.push(work);
      }

      if (booking.status === SERVICESTATUS.PROGRESS) {
         progress.push(work);
      }

      if (booking.status === SERVICESTATUS.COMPLETE) {
         completed.push(work);
      }

   });

   return {
      pending,
      progress,
      completed
   };
};
