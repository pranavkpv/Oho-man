import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { STATUS_CODE } from "../../constant/enum";
import { MESSAGE } from "../../constant/messages";
import { updateActiveStatus } from "../../services/provider/updateActiveStatus";

export const updateActiveStatusController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const userId = (req as any).user.userId;
      const { active } = req.body;

      const data = await updateActiveStatus(userId, active,res);
      return ApiResponse.success(res, STATUS_CODE.OK, MESSAGE.STATUS.UPDATE, data)
   } catch (error: any) {
      next(error);
   }
};