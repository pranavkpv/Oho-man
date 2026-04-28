import { loginAPI } from "@/api/auth.service";
import { loginData } from "@/types/data";
import { useState } from "react";


export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: loginData) => {
    try {
      setLoading(true);
      setError(null);

      const res = await loginAPI(data);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};