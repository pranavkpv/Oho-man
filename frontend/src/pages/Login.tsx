import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import AppInput from "@/components/shared/AppInput";
import { loginSchema, LoginSchema } from "@/validation/loginSchema";
import { setAccessToken } from "@/utils/token";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const { login, loading, error } = useLogin();
  const Navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await login(data);
      setAccessToken(res.data.accessToken);
      toast.success("Login successful!");
      Navigate("/home");
    } catch (error) {
      console.log("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/40 to-stone-100 flex items-center justify-center px-4">

      {/* Decorative blobs */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-200/25 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl shadow-stone-200/60 border border-white/60 overflow-hidden">

          {/* Top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

          <div className="px-8 py-10 space-y-7">

            {/* Header */}
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-md shadow-amber-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-stone-800 tracking-tight">Welcome back</h1>
              <p className="text-sm text-stone-400">Sign in to your account</p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <div className="space-y-1.5">
                <AppInput
                  label="email"
                  placeholder="you@example.com"
                  type="email"
                  name="email"
                  register={register}
                  error={errors.email?.message}
                />
              </div>

              <div className="space-y-1.5">
                <AppInput
                  label="password"
                  placeholder="••••••••"
                  type="password"
                  name="password"
                  register={register}
                  error={errors.password?.message}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm tracking-wide shadow-md shadow-amber-200 hover:shadow-lg hover:shadow-amber-200 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in…
                  </span>
                ) : (
                  "Sign in →"
                )}
              </Button>

            </form>

            {/* Footer */}
            <p className="text-center text-xs text-stone-400">
              Don't have an account?{" "}
              <a href="/register" className="text-amber-600 hover:text-amber-800 font-semibold transition-colors">
                Sign up
              </a>
            </p>

          </div>
        </div>

        {/* Bottom shadow accent */}
        <div className="mx-6 h-3 bg-stone-200/60 rounded-b-3xl blur-sm -mt-1" />
      </div>

    </div>
  );
}