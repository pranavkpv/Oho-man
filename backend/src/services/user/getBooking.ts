import { bookingRepository } from "../../repository/booking.repository";


export const getUserBookingsService = async (userId: string) => {
  const data = await bookingRepository.getBookingsByUserId(userId);
  return data;
};