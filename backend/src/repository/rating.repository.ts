import mongoose from "mongoose";
import bookingModel from "../model/booking.model";
import userModel from "../model/user.model";

export const calculateProviderRatingRepo = async (providerId: string) => {
   const objectId = new mongoose.Types.ObjectId(providerId);

   // get all completed bookings with rating
   const bookings = await bookingModel.find({
      providerId: objectId,
      status: "completed"
   });

   const totalBookings = bookings.length;

   const totalRating = bookings.reduce((sum, b) => sum + (b.rating || 0), 0);

   const avgRating = totalBookings === 0
      ? 0
      : totalRating / totalBookings;

   // update user rating
   await userModel.findByIdAndUpdate(providerId, {
      rating: avgRating
   });

   return avgRating;
};