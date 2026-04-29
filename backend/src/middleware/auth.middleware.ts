import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/jwt";

export const authMiddleware = (role: string) => {
   return (
      req: Request,
      res: Response,
      next: NextFunction
   ) => {
      try {
         const token = req.headers.authorization?.split(" ")[1];

         if (!token) {
            return res.status(401).json({ message: "No token provided" });
         }

         const decoded: any = decodeToken(token);

         req.user = decoded;

         if (decoded.activeRole !== role) {
            return res.status(403).json({
               message: "Not access",
            });
         }
         next();
      } catch (err) {

         return res.status(401).json({
            message: "Invalid token",
         });
      }
   };
}  