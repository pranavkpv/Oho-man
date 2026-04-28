import { NextFunction, Request, Response } from 'express';
import { register } from '../../services/auth/register';
import { STATUS_CODE } from '../../constant/enum';
import { MESSAGE } from '../../constant/messages';
import { registerSchema } from '../../validation/registerSchema';

export const registerController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const parsed = registerSchema.parse(req.body);

      const user =
         await register(
            parsed
         );

      return res.status(
         STATUS_CODE.CREATED
      ).json({
         message:
            MESSAGE.REGISTER.SUCCESS,
         data: user
      });

   } catch (error) {
      next(error)
   }
}