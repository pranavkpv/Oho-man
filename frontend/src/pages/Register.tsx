import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent } from '@/components/ui/card';

import AppInput from '@/components/shared/AppInput';
import AppButton from '@/components/shared/AppButton';
import ServiceSelect from '@/components/shared/ServiceSelect';

import {
   RegisterFormData,
   registerSchema
} from '@/validation/registerSchema';

import { registrationData } from '@/types/data';

import { useServices } from '@/hooks/useServices';
import { useRegister } from '@/hooks/useRegister';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Register() {

   const [isProvider, setIsProvider] = useState(false);
   const [selectedServices, setSelectedServices] =
      useState<string[]>([]);

   const { services } = useServices(isProvider);

   const {
      loading,
      registerUser
   } = useRegister();

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue
   } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         isServiceProvider: false,
         serviceIds: []
      }
   });

   const onSubmit = async (
      formData: registrationData
   ) => {

      const payload = {
         ...formData,
         isServiceProvider: isProvider,
         serviceIds: selectedServices
      };

      const success = await registerUser(payload);

      if (success) {
         console.log('Registered successfully');
         // router.push('/login')
      }
   };

   return (
      <div className='min-h-screen flex items-center justify-center'>

         <Card className='w-[500px]'>
            <CardContent className='p-8 space-y-5'>

               <h2 className='text-2xl font-bold'>
                  Register
               </h2>

               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='space-y-4'
               >

                  <AppInput
                     label='Username'
                     name='username'
                     placeholder='Enter username'
                     register={register}
                     error={errors.username?.message}
                  />

                  <AppInput
                     label='Email'
                     name='email'
                     placeholder='Enter email'
                     register={register}
                     error={errors.email?.message}
                  />

                  <AppInput
                     label='Phone Number'
                     name='phonenumber'
                     placeholder='Enter phone number'
                     register={register}
                     error={errors.phonenumber?.message}
                  />

                  <AppInput
                     label='Password'
                     name='password'
                     type='password'
                     placeholder='Enter password'
                     register={register}
                     error={errors.password?.message}
                  />

                  <AppInput
                     label='Confirm Password'
                     name='confirmPassword'
                     type='password'
                     placeholder='Confirm password'
                     register={register}
                     error={errors.confirmPassword?.message}
                  />

                  <Label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition">
                     <Input
                        type="checkbox"
                        {...register('isServiceProvider')}
                        onChange={(e) => {
                           setIsProvider(e.target.checked);
                           setValue('isServiceProvider', e.target.checked);
                        }}
                        className="w-4 h-4 accent-green-600"
                     />

                     <span className="text-sm font-medium text-gray-700">
                        Ready Service Provider
                     </span>
                  </Label>

                  {isProvider && (
                     <ServiceSelect
                        services={services}
                        selected={selectedServices}
                        onChange={setSelectedServices}
                     />
                  )}

                  <AppButton loading={loading}>
                     Register
                  </AppButton>

               </form>

            </CardContent>
         </Card>

      </div>
   );
}