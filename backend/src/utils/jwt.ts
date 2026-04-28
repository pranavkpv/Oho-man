import jwt from "jsonwebtoken";
import env from "../config/env";

interface payloadData {
  userId: string,
  role: string
}

export const createAccessToken = (
  payload: payloadData
) => {
  return jwt.sign(
    payload,
    env.JWT_ACCESS_SECRET as string,
    {
      expiresIn:
        env.ACCESS_TOKEN_EXPIRES as any
    }
  );
};

export const createRefreshToken = (
  payload: object
) => {
  return jwt.sign(
    payload,
    env.JWT_REFRESH_SECRET as string,
    {
      expiresIn:
        env.REFRESH_TOKEN_EXPIRES  as any
    }
  );
};

export const decodeToken = (
  token: string
) => {
  return jwt.verify(
    token,
    env.JWT_ACCESS_SECRET
  );
};