export interface registerData {
   username: string
   email: string
   phonenumber: string
   password: string
   confirmPassword: string
   isServiceProvider?: boolean
   serviceIds?: string[]
   role?: string[]
}

export interface bookingDataRepo {
   userId:string
   serviceId:string
   providerId:string
   amount:number
   status:string
}