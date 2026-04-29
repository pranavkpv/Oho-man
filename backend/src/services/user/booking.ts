import { SERVICESTATUS, STATUS_CODE } from "../../constant/enum";
import { MESSAGE } from "../../constant/messages";
import { bookingRepository } from "../../repository/booking.repository";
import { serviceRepository } from "../../repository/service.repository";
import { ApiError } from "../../utils/ApiError";


export const createBookingService = async (
   userId: string,
   serviceId: string,
   providerId: string
) => {
   const service = await serviceRepository.getServiceById(serviceId);

   if (!service) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGE.SERVICE.NOTFOUND);
   }

   const booking = await bookingRepository.createBooking({
      userId,
      serviceId,
      providerId,
      amount: service.price,
      status: SERVICESTATUS.PENDING,
   });

   return booking;
};