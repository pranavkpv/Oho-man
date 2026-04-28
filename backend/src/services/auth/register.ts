import bcrypt from 'bcryptjs';
import authRepository from '../../repository/auth.repository';
import { ROLE, STATUS_CODE } from '../../constant/enum';
import { MESSAGE } from '../../constant/messages';
import { ApiError } from '../../utils/ApiError';
import { registerData } from '../../dto/request';
import { hashPassword } from '../../utils/password.helper';

export const register = async (data: registerData) => {
   const exists =
      await authRepository.findByEmail(
         data.email
      );
   if (exists) {
      throw new ApiError(
         STATUS_CODE.BAD_REQUEST,
         MESSAGE.USER.EXIST
      );
   }
  const hashed = await hashPassword(data.password);

   return authRepository.createUser({
      ...data,
      password: hashed,
      role: data.isServiceProvider
         ? [ROLE.USER, ROLE.PROVIDER]
         : [ROLE.USER]
   });

}
