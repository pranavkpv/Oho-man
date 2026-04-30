import { NextFunction, Request, Response } from 'express';
import { MESSAGE } from '../../constant/messages';
import { ApiResponse } from '../../utils/ApiResponse';
import { STATUS_CODE } from '../../constant/enum';
import { getUserData } from '../../dto/response';
import { getAllUserByServiceId } from '../../services/user/getByServiceId';

export const getUserByServiceIdController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const serviceId = req.params.serviceId as string;
      const userId = (req as any).user.userId
      const data = await getAllUserByServiceId(serviceId,userId);
      return ApiResponse.success<getUserData[]>(
         res,
         STATUS_CODE.OK,
         MESSAGE.SERVICE.LIST,
         data
      );
   } catch (error) {
      next(error)
   }
};