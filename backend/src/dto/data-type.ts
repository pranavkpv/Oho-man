import { ROLE } from "../constant/enum"

export interface payloadData{
   userId:string 
   role:ROLE[]
   activeRole:string
   active:boolean
}