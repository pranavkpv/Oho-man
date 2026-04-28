import serviceModel from "../model/service.model";

class ServiceRepository{

 getAllServices(){
  return serviceModel.find(
   {}
  );
 }

}

export default new ServiceRepository();