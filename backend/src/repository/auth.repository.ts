import { registerData } from "../dto/request";
import userModel from "../model/user.model";


class AuthRepository {

   findByEmail(email: string) {
      return userModel.findOne({ email });
   }

   createUser(data: registerData) {
      return userModel.create(data);
   }

   findUserByEmail(email: string) {
      return userModel.findOne({ email });
   }


}

export default new AuthRepository();