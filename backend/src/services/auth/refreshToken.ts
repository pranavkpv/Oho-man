import { createAccessToken, decodeToken } from "../../utils/jwt";

export const refreshTokenService = async (refreshToken: string) => {
   const user: any = decodeToken(refreshToken)
   const payload = {
      userId: user._id,
      role: user.role,
      activeRole: user.activeRole,
      active: user.active
   }
   const accessToken = createAccessToken(payload)

   return accessToken;
};