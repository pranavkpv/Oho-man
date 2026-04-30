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

  // GET BOOKING BY PROVIDER ID
  getProviderBookings: async (providerId: string) => {
    if (!mongoose.Types.ObjectId.isValid(providerId)) {
      throw new Error("Invalid providerId");
    }

    return await bookingModel
      .find({
        providerId: new mongoose.Types.ObjectId(providerId),
      })
      .populate({
        path: "serviceId",
        select: "_id serviceName",
      })
      .populate({
        path: "userId",
        select: "_id username email phonenumber",
      })
      .sort({ createdAt: -1 });
  },

  // GET BOOKING BY ID
  findById: async (bookingId: string) => {
    return await bookingModel.findById(bookingId);
  },

  // UPDATE STATUS
  updateStatus: async (bookingId: string, status: BookingStatus) => {
    return await bookingModel.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
  },

  //  ADD RATING IN BOOKING (FIXED)
  addRatingRepo: async (bookingId: string, rating: number) => {
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      throw new Error("Invalid bookingId");
    }

    return await bookingModel.findByIdAndUpdate(
      bookingId,
      { rating },
      { new: true }
    );
  },
};