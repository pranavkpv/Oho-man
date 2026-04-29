export interface ServiceType {
   _id: string;
   serviceName: string;
   image: string;
   price: number;
}

export interface registrationData {
   username: string
   email: string
   phonenumber: string
   password: string
   confirmPassword: string
   isServiceProvider: boolean
   serviceIds?: string[]
}

export interface loginData {
   email: string
   password: string
}

export type TokenPayload = {
   role: ("user" | "provider")[];
   activeRole: "user" | "provider";
};

export interface bookingData {
   serviceId: string,
   providerId: string,
}