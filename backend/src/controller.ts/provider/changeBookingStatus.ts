import { Request, Response, NextFunction } from "express";
import { changeStatus } from "../../services/provider/changeBookingStatus";
import { STATUS_CODE } from "../../constant/enum";
import { ApiError } from "../../utils/ApiError";
import { MESSAGE } from "../../constant/messages";
import { ApiResponse } from "../../utils/ApiResponse";

export const changeStatusController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const { _id, status } = req.body;

      if (!_id || !status) {
         return new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGE.BOOKING.REUIRED)
      }

      await changeStatus(_id, status);

      return ApiResponse.success(res, STATUS_CODE.OK, MESSAGE.BOOKING.UPDATESTATUS);

   } catch (error) {
      next(error);
   }
};