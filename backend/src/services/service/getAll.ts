import serviceRepository from "../../repository/service.repository";

export const getAllServices = async () => {
   return serviceRepository
      .getAllServices();
}
