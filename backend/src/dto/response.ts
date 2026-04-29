import { Types } from "mongoose"
import { ROLE } from "../constant/enum"


export interface getServiceData {
   _id: Types.ObjectId
   serviceName: string
   image: string
   price: number
}

export interface getUserData {
   _id: Types.ObjectId
   username: string
   email: string
   phonenumber?: string | null;
   password: string
   role: ROLE[]
   activeRole: string
   serviceIds:Types.ObjectId[]
   active: boolean
   image?:string | null
}