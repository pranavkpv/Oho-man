import mongoose from 'mongoose';
import { ROLE } from '../constant/enum';

const userSchema=new mongoose.Schema({
 username:String,
 email:{type:String,unique:true},
 phonenumber:String,
 password:String,
 role:{
   type:[String],
   enum:Object.values(ROLE),
   default:ROLE.USER
 },
 serviceIds:[{
   type:mongoose.Schema.Types.ObjectId,
   ref:'Service'
 }]
});

export default mongoose.model(
 'User',
 userSchema
);