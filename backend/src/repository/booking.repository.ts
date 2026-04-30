import mongoose from "mongoose";
import { bookingDataRepo } from "../dto/request";
import bookingModel, { BookingStatus } from "../model/booking.model";

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
  //GET BOOKING BY PROVIDERID
  getProviderBookings: async (providerId: string) => {
    return await bookingModel.find({
      providerId
    })
      .populate({
        path: "serviceId",
        select: "_id serviceName"
      })
      .populate({
        path: "userId",
        select: "_id username email phonenumber"
      })
      .sort({ createdAt: -1 });
  },
  //GET BOOKING DATA BY ID
  findById: async (bookingId: string) => {
    return await bookingModel.findById(bookingId);
  },
  //UPDATE STATUS
  updateStatus: async (
    bookingId: string,
    status: BookingStatus
  ) => {
    return await bookingModel.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
  }
};