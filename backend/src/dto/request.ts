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