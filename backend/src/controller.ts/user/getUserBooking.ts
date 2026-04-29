import { Request, Response, NextFunction } from "express";
import { getUserBookingsService } from "../../services/user/getBooking";
import { ApiResponse } from "../../utils/ApiResponse";
import { STATUS_CODE } from "../../constant/enum";
import { MESSAGE } from "../../constant/messages";


export const getUserBookingsController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const userId = (req as any).user.userId;

      const data = await getUserBookingsService(userId);

      return ApiResponse.success(
         res,
         STATUS_CODE.OK,
         MESSAGE.BOOKING.LIST,
         data
      );
   } catch (error) {
      next(error);
   }
};