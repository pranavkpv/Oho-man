import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/jwt";

export const verifyToken = (
 req: Request,
 res: Response,
 next: NextFunction
) => {
 try {
   const token = req.headers.authorization?.split(" ")[1];

   if (!token) {
     return res.status(401).json({
       message: "No token provided"
     });
   }

   const decoded: any = decodeToken(token);

   req.user = decoded;

   next();

 } catch {
   return res.status(401).json({
      message: "Invalid token"
   });
 }
};