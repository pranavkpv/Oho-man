export class ApiResponse<T>{

 constructor(
   public statusCode:number,
   public message:string,
   public data?:T
 ){}

 static success<T>(
   res:any,
   message:string,
   data?:T
 ){
   return res.status(200).json(
    new ApiResponse(
      200,
      message,
      data
    )
   );
 }
}