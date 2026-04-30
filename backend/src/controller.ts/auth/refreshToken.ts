import { NextFunction, Request, Response } from "express";
import { refreshTokenService } from "../../services/auth/refreshToken";
import { ApiError } from "../../utils/ApiError";
import { STATUS_CODE } from "../../constant/enum";
import { MESSAGE } from "../../constant/messages";


export const refreshTokenController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const token = req.cookies.refreshToken;

      if (!token) {
         return new ApiError(STATUS_CODE.NOT_FOUND, MESSAGE.TOKEN.NO)
      }

      const accessToken = await refreshTokenService(token);

      return res.json({
         accessToken
      });

   } catch (err: any) {
      next(err)
   }
};