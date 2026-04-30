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

   // return services otherthan send service Id list

   findOtherJobs: async (
      serviceIds: any[]
   ) => {

      return serviceModel.find({
         _id: {
            $nin: serviceIds
         }
      }).select(
         "_id serviceName image price"
      );

   }
};