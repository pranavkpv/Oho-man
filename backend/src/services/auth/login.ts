import bcrypt from "bcryptjs";
import { ApiError } from "../../utils/ApiError";
import authRepository from "../../repository/auth.repository";
import { STATUS_CODE } from "../../constant/enum";
import { MESSAGE } from "../../constant/messages";
import { comparePassword } from "../../utils/password.helper";
import { createAccessToken, createRefreshToken } from "../../utils/jwt";

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const user = await authRepository.findUserByEmail(data.email);

  if (!user) {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, MESSAGE.USER.NOTFOUND);
  }

  const isMatch = await comparePassword(
    data.password,
    user.password
  );

  if (!isMatch) {
    throw new ApiError(STATUS_CODE.NOT_FOUND, MESSAGE.LOGIN.INVALIDCREDENTIAL);
  }

  const payload = {
    userId: user._id.toString(),
    role: user.role
  };

  const accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);


  return {
    accessToken,
    refreshToken
  };
};