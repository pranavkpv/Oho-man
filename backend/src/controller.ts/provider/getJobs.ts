import {
  NextFunction,
  Request,
  Response
} from "express";
import { getProviderJobs } from "../../services/provider/getJob";
import { ApiResponse } from "../../utils/ApiResponse";
import { STATUS_CODE } from "../../constant/enum";
import { MESSAGE } from "../../constant/messages";



export const getProviderJobsController =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const userId =
        (req as any).user.userId;

      const data =
        await getProviderJobs(
          userId
        )

      return ApiResponse.success(res, STATUS_CODE.OK, MESSAGE.JOB.FETCH, data)
    } catch (error: any) {
      next(error)
    }

  };