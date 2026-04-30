import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent } from '@/components/ui/card';
import AppInput from '@/components/shared/AppInput';
import AppButton from '@/components/shared/AppButton';
import ServiceSelect from '@/components/shared/ServiceSelect';
import { RegisterFormData, registerSchema } from '@/validation/registerSchema';
import { registrationData } from '@/types/data';
import { useServices } from '@/hooks/useServices';
import { useRegister } from '@/hooks/useRegister';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Register() {
  const [isProvider, setIsProvider] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const { services } = useServices(isProvider);
  const { loading, registerUser } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      isServiceProvider: false,
      serviceIds: [],
    },
  });

  const onSubmit = async (formData: registrationData) => {
    const payload = {
      ...formData,
      isServiceProvider: isProvider,
      serviceIds: selectedServices,
    };
    const success = await registerUser(payload);
    if (success) console.log('Registered successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/40 to-stone-100 flex items-center justify-center px-4 py-12">

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-amber-200/25 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-orange-200/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-amber-100/30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Card className="border-white/60 bg-white/80 backdrop-blur-md shadow-xl shadow-stone-200/60 rounded-3xl overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

          <CardContent className="px-8 py-10 space-y-7">

            {/* Header */}
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-md shadow-amber-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-stone-800 tracking-tight">Create account</h2>
              <p className="text-sm text-stone-400">Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Fields */}
              <div className="space-y-1.5">
                <AppInput
                label="username"
                  name="username"
                  placeholder="Enter username"
                  register={register}
                  error={errors.username?.message}
                />
              </div>

              <div className="space-y-1.5">
                <AppInput
                label ="email"
                  name="email"
                  placeholder="you@example.com"
                  register={register}
                  error={errors.email?.message}
                />
              </div>

              <div className="space-y-1.5">
                <AppInput
                label="phonenumber"
                  name="phonenumber"
                  placeholder="+91 00000 00000"
                  register={register}
                  error={errors.phonenumber?.message}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <AppInput
                  label="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    register={register}
                    error={errors.password?.message}
                  />
                </div>
                <div className="space-y-1.5">

                  <AppInput
                  label="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    register={register}
                    error={errors.confirmPassword?.message}
                  />
                </div>
              </div>

              {/* Provider toggle */}
              <Label
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  isProvider
                    ? 'border-amber-300 bg-amber-50/60'
                    : 'border-stone-100 bg-stone-50/60 hover:border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className={`relative w-10 h-6 rounded-full transition-all duration-300 ${isProvider ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-stone-200'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${isProvider ? 'left-5' : 'left-1'}`} />
                </div>
                <Input
                  type="checkbox"
                  {...register('isServiceProvider')}
                  onChange={(e) => {
                    setIsProvider(e.target.checked);
                    setValue('isServiceProvider', e.target.checked);
                  }}
                  className="sr-only"
                />
                <div>
                  <p className={`text-sm font-semibold transition-colors ${isProvider ? 'text-amber-700' : 'text-stone-600'}`}>
                    Register as Service Provider
                  </p>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Enable to offer your services on the platform
                  </p>
                </div>
                {isProvider && (
                  <span className="ml-auto text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                    Active
                  </span>
                )}
              </Label>

              {/* Service select */}
              {isProvider && (
                <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4 space-y-2">
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Select your services</p>
                  <ServiceSelect
                    services={services}
                    selected={selectedServices}
                    onChange={setSelectedServices}
                  />
                </div>
              )}

              {/* Submit */}
              <div className="pt-1">
                <AppButton
                  loading={loading}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm tracking-wide shadow-md shadow-amber-200 hover:shadow-lg hover:shadow-amber-200 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Create Account →
                </AppButton>
              </div>

            </form>

            {/* Footer */}
            <p className="text-center text-xs text-stone-400">
              Already have an account?{' '}
              <a href="/login" className="text-amber-600 hover:text-amber-800 font-semibold transition-colors">
                Sign in
              </a>
            </p>

          </CardContent>
        </Card>

        {/* Bottom shadow accent */}
        <div className="mx-6 h-3 bg-stone-200/60 rounded-b-3xl blur-sm -mt-1" />
      </div>
    </div>
  );
}