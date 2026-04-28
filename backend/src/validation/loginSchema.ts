import z from "zod";
import { MESSAGE } from "../constant/messages";

export const loginSchema = z.object({
   email: z.string().email(MESSAGE.EMAIL.INVALID),
   password: z.string().min(6, MESSAGE.PASSWORD.SHORT)
});

export type LoginInput = z.infer<typeof loginSchema>;