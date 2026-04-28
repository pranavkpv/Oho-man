import { z } from "zod";
import { MESSAGE } from "../constant/messages";

export const registerSchema = z.object({
  username: z.string().min(2, MESSAGE.USER.SHORT),

  email: z.string().email(MESSAGE.EMAIL.INVALID),

  phonenumber: z
    .string()
    .min(10, MESSAGE.PHONE.INVALID)
    .max(15, MESSAGE.PHONE.INVALID),

  password: z.string().min(6, MESSAGE.PASSWORD.SHORT),

  confirmPassword: z.string(),

  isServiceProvider: z.boolean(),

  serviceIds: z.array(z.string()).optional()
})
.refine((data) => data.password === data.confirmPassword, {
  message: MESSAGE.PASSWORD.NOTMATCH,
  path: ["confirmPassword"]
})
.refine((data) => {
  if (data.isServiceProvider) {
    return !!data.serviceIds && data.serviceIds.length > 0;
  }
  return true;
}, {
  message: MESSAGE.SERVICE.REQUIRED,
  path: ["serviceIds"]
});