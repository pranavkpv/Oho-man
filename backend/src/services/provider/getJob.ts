import { STATUS_CODE } from "../../constant/enum";
import { MESSAGE } from "../../constant/messages";
import { userRepository } from "../../repository/auth.repository";
import { serviceRepository } from "../../repository/service.repository";
import { ApiError } from "../../utils/ApiError";

export const getProviderJobs = async (
   userId: string
) => {

   const user =
      await userRepository.findUserWithServices(
         userId
      );

   if (!user) {
      throw new ApiError(
         STATUS_CODE.NOT_FOUND, MESSAGE.USER.NOTFOUND
      );
   }

   const myJob =
      user.serviceIds;

   const serviceIds =
      myJob.map(
         (service: any) =>
            service._id
      );

   const otherJob =
      await serviceRepository.findOtherJobs(
         serviceIds
      );
   return {
      myJob,
      otherJob
   };

}