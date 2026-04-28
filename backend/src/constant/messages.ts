import { INVALID } from "zod/v3";

export const MESSAGE ={
   REGISTER:{
      SUCCESS:"Registered successfully"
   },
   USER:{
      EXIST:"User Exist",
      SHORT:"Username must be at least 2 characters"
   },
   SERVICE:{
      LIST:"Services listed successfully",
      REQUIRED:"Service provider must select at least one service"
   },
   PASSWORD:{
      NOTMATCH:"Passwords do not match",
      SHORT:"Password must be at least 6 characters"
   },
   EMAIL:{
      INVALID:"Invalid email address"
   },
   PHONE:{
      INVALID:"Phone number must be valid"
   }
}