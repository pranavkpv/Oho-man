import { Types } from "mongoose"

export interface getServiceData {
   _id:Types.ObjectId
   serviceName:string
   image:string
   price:number
}