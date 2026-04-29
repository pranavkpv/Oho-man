import mongoose from "mongoose";
import { bookingDataRepo } from "../dto/request";
import bookingModel from "../model/booking.model";

export const bookingRepository = {
  // CREATE BOOKING
  createBooking: async (data: bookingDataRepo) => {
    return await bookingModel.create(data);
  },
  // GET BOOKINGS BY USER ID
  getBookingsByUserId: async (userId: string) => {

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid userId");
    }

    return await bookingModel
      .find({
        userId: new mongoose.Types.ObjectId(userId),
      })
      .populate("providerId", "username email image")
      .populate("serviceId", "serviceName price image")
      .sort({ createdAt: -1 })
      .lean();
  },
};