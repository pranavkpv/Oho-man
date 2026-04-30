import { SERVICESTATUS, STATUS_CODE } from "../../constant/enum";
import { MESSAGE } from "../../constant/messages";
import { BookingStatus } from "../../model/booking.model";
import { bookingRepository } from "../../repository/booking.repository";
import { ApiError } from "../../utils/ApiError";

export const changeStatus = async (bookingId: string, status: BookingStatus) => {

   const booking = await bookingRepository.findById(bookingId);

   if (!booking) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGE.BOOKING.NOTFOUND);
   }

   if (booking.status === SERVICESTATUS.COMPLETE) {
      throw new ApiError(
         STATUS_CODE.BAD_REQUEST,
         MESSAGE.BOOKING.NOTCHANGE
      );
   }

   const updated = await bookingRepository.updateStatus(
      bookingId,
      status
   );

   return updated;
}