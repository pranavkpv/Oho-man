import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import AppInput from "@/components/shared/AppInput";
import { loginSchema, LoginSchema } from "@/validation/loginSchema";

export default function Login() {

  const { login, loading, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await login(data);
      console.log("Login Success:", res);
      alert("Login successful!");
    } catch (error) {
      console.log("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">

      <div className="w-[400px] p-6 border rounded-xl space-y-5">

        <h1 className="text-xl font-bold text-center">
          Login
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <AppInput
            label="Email"
            placeholder="Enter email"
            type="email"
            name="email"
            register={register}
            error={errors.email?.message}
          />

          <AppInput
            label="Password"
            placeholder="Enter password"
            type="password"
            name="password"
            register={register}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

        </form>
      </div>
    </div>
  );
}