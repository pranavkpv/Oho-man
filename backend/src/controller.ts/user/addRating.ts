import { NextFunction, Request, Response } from "express";
import { addRatingService } from "../../services/user/addRating";
import { ApiResponse } from "../../utils/ApiResponse";
import { STATUS_CODE } from "../../constant/enum";
import { MESSAGE } from "../../constant/messages";

export const addRatingController = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { providerId, bookingId, rating } = req.body;

      const result = await addRatingService({
         providerId,
         bookingId,
         rating
      });

      return ApiResponse.success(res, STATUS_CODE.OK, MESSAGE.BOOKING.RATING, result)

   } catch (err: any) {
      next(err)
   }
};