import { NextFunction, Request, Response } from "express";
import { createBookingService } from "../../services/user/booking";
import { STATUS_CODE } from "../../constant/enum";
import { ApiResponse } from "../../utils/ApiResponse";
import { MESSAGE } from "../../constant/messages";

export const createBookingController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const userId = (req as any).user.userId;
      const { serviceId, providerId } = req.body;

      await createBookingService(
         userId,
         serviceId,
         providerId
      );

      return ApiResponse.success(
         res,
         STATUS_CODE.CREATED,
         MESSAGE.BOOKING.CREATED
      )
   } catch (err: any) {
      next(err)
   }
};