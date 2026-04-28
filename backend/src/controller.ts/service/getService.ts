import { NextFunction, Request, Response } from 'express';
import { getAllServices } from '../../services/service/getAll';
import { MESSAGE } from '../../constant/messages';
import { ApiResponse } from '../../utils/ApiResponse';
import { STATUS_CODE } from '../../constant/enum';
import { getServiceData } from '../../dto/Services';

export const getAllServicesController = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const data = await getAllServices();

      return ApiResponse.success<getServiceData[]>(
         res,
         STATUS_CODE.OK,
         MESSAGE.SERVICE.LIST,
         data
      );
   } catch (error) {
      next(error)
   }
};