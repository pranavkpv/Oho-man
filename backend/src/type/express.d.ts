import { ROLE } from "../constant/enum";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: ROLE[];
        activeRole: ROLE;
      };
    }
  }
}

export {};