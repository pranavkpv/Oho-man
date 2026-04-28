import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../../validation/loginSchema";
import { login } from "../../services/auth/login";
import { ApiResponse } from "../../utils/ApiResponse";
import { STATUS_CODE } from "../../constant/enum";
import { MESSAGE } from "../../constant/messages";
import { setRefreshCookie } from "../../utils/cookie";


export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await login(validatedData);
    setRefreshCookie(res, result.refreshToken)

    return ApiResponse.success(
      res,
      STATUS_CODE.OK,
      MESSAGE.LOGIN.SUCCESS,
      {
        accessToken: result.accessToken
      }
    );

  } catch (error) {
    next(error)
  }
};