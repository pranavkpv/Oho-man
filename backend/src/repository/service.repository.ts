import serviceModel from "../model/service.model";

export const serviceRepository = {
   // GET ALL SERVICES
   getAllServices: async () => {
      return await serviceModel.find({});
   },

   // GET SERVICE BY ID
   getServiceById: async (serviceId: string) => {
      return await serviceModel.findById(serviceId);
   },
};