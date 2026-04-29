import { Response } from "express";
import { createAccessToken, createRefreshToken } from "../../utils/jwt";
import { setRefreshCookie } from "../../utils/cookie";
import { userRepository } from "../../repository/auth.repository";
import { MESSAGE } from "../../constant/messages";
import { ROLE, STATUS_CODE } from "../../constant/enum";
import { ApiError } from "../../utils/ApiError";




export const switchRole = async (
   userId: string,
   currentRole: string,
   newRole: string,
   res: Response
) => {

   if (currentRole === newRole) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGE.USER.SAMEROLE);
   }

   // Required current role check
   if (
      (newRole === ROLE.PROVIDER && currentRole !== ROLE.USER) ||
      (newRole === ROLE.USER && currentRole !== ROLE.PROVIDER)
   ) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGE.USER.INVALID_ROLE_TRANSACTION);
   }

   const user = await userRepository.updateActiveRole(
      userId,
      newRole
   );

   if (!user) {
      throw new ApiError(STATUS_CODE.NOT_FOUND,MESSAGE.USER.NOTFOUND);
   }

   const payload = {
      userId: user._id.toString(),
      role: user.role,
      activeRole: user.activeRole
   };

   const accessToken =
      createAccessToken(payload);

   const refreshToken =
      createRefreshToken(payload);

   setRefreshCookie(res, refreshToken);

   return {
      accessToken,
      activeRole: user.activeRole
   };
}
