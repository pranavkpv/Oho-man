import { NextFunction, Request, Response } from "express";
import { Roles } from "../../constant/data";
import { switchRole } from "../../services/user/switchRole";
import { MESSAGE } from "../../constant/messages";
import { ApiError } from "../../utils/ApiError";
import { STATUS_CODE } from "../../constant/enum";
import { ApiResponse } from "../../utils/ApiResponse";

export const switchRoleController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {

      const userId = (req as any).user.userId;
      const currentRole = (req as any).user.activeRole;

      const { role } = req.body;

      if (!role || !Roles.includes(role)) {
         throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGE.USER.INVALID_ROLE);
      }

      const result = await switchRole(
         userId,
         currentRole,
         role,
         res
      );

      return ApiResponse.success(
         res,
         STATUS_CODE.OK,
         MESSAGE.USER.SUCCESS_ROLE_SWITCH,
         {
            accessToken: result.accessToken,
            activeRole: result.activeRole
         }
      );

   } catch (error: any) {
      next(error)
   }
};