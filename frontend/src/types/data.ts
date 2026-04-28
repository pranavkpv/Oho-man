export interface ServiceType {
   _id: string;
   serviceName: string;
   image: string;
   price: number;
}

export interface registrationData {
   username: string
   email: string
   phonenumber:string
   password: string
   confirmPassword: string
   isServiceProvider: boolean
   serviceIds?: string[]
}