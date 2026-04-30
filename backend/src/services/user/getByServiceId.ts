import { userRepository } from "../../repository/auth.repository"



export const getAllUserByServiceId = async (serviceId: string,userId:string) => {
   return await userRepository.findUsersByServiceId(serviceId,userId)
}

