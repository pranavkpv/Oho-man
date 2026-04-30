import { bookingRepository } from "../../repository/booking.repository";
import { calculateProviderRatingRepo } from "../../repository/rating.repository";

type RatingInput = {
   providerId: string;
   bookingId: string;
   rating: number;
};

export const addRatingService = async (data: RatingInput) => {
   const { providerId, bookingId, rating } = data;

   await bookingRepository.addRatingRepo(bookingId, rating);
   const avgRating = await calculateProviderRatingRepo(providerId);

   return {
      providerId,
      updatedRating: avgRating
   };
};