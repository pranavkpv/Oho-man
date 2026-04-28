import { z } from 'zod';
import { FORM_ERRORS } from '../constant/messages';

export const registerSchema = z
   .object({
      username: z.string().min(
         1,
         FORM_ERRORS.USERNAME
      ),

      email: z.email(
         FORM_ERRORS.EMAIL
      ),

      phonenumber: z.string().min(
         10,
         FORM_ERRORS.PHONE
      ),

      password: z.string().min(
         6,
         FORM_ERRORS.PASSWORD
      ),

      confirmPassword: z.string(),

      isServiceProvider: z.boolean(),

      serviceIds:
         z.array(z.string())
            .optional()

   })
   .refine(
      (data) =>
         data.password ===
         data.confirmPassword,
      {
         message:
            FORM_ERRORS.CONFIRM,
         path: ['confirmPassword']
      }
   );

export type RegisterFormData =
   z.infer<typeof registerSchema>;