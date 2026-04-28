import userModel from "../model/user.model";


class AuthRepository{

 findByEmail(email:string){
  return userModel.findOne({email});
 }

 createUser(data:any){
  return userModel.create(data);
 }

}

export default new AuthRepository();