import { Response } from "express";
import { STATUS_CODE } from "../../constant/enum";
import { MESSAGE } from "../../constant/messages";
import { ApiError } from "../../utils/ApiError";
import { setRefreshCookie } from "../../utils/cookie";
import { createAccessToken, createRefreshToken } from "../../utils/jwt";
import { userRepository } from "../../repository/auth.repository";

export const updateActiveStatus = async (userId: string, active: boolean,res: Response) => {
   if (typeof active !== "boolean") {
      throw new Error("Active must be boolean");
   }

   const updatedUser = await userRepository.updateActiveStatus(
      userId,
      active
   );

   if (!updatedUser) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGE.USER.NOTFOUND);
   }
   const payload = {
      userId: updatedUser._id.toString(),
      role: updatedUser.role,
      activeRole: updatedUser.activeRole,
      active: updatedUser.active
   };

   const accessToken =
      createAccessToken(payload);

   const refreshToken =
      createRefreshToken(payload);

   setRefreshCookie(res, refreshToken);

   return {
      accessToken,
      active: updatedUser.active
   };
};

