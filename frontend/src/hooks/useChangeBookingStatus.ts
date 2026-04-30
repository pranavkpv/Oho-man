import { changeBookingStatus } from "@/api/provider.service";
import { useState } from "react";


export const useChangeBookingStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (_id: string, status: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await changeBookingStatus(_id, status);
      return data;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || "Something went wrong";

      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateStatus,
    loading,
    error,
  };
};