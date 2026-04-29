import { bookingDataRepo } from "../dto/request";
import bookingModel from "../model/booking.model";

export const bookingRepository = {
  // CREATE BOOKING
  createBooking: async (data: bookingDataRepo) => {
    return await bookingModel.create(data);
  },
};