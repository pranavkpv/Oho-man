import { NextFunction, Request, Response } from "express";
import { getMyWorks } from "../../services/provider/getMyWork";
import { ApiResponse } from "../../utils/ApiResponse";
import { STATUS_CODE } from "../../constant/enum";
import { MESSAGE } from "../../constant/messages";

export const getMyWorksController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {

      const providerId = (req as any).user.userId;

      const works = await getMyWorks(
         providerId
      );

      return ApiResponse.success(res, STATUS_CODE.OK, MESSAGE.WORK.FETCH, works)

   } catch (error) {
      next(error)
   }
};