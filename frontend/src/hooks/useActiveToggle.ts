import { updateActiveStatusApi } from "@/api/provider.service";
import { setAccessToken } from "@/utils/token";
import { useState } from "react";

export const useActiveToggle = (initialValue: boolean) => {
  const [active, setActive] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const toggleActive = async () => {
    if (loading) return;

    const prev = active;
    const nextValue = !active;

    // ✅ optimistic UI update (prevents UI jump / redirect glitches)
    setActive(nextValue);

    try {
      setLoading(true);

      const res = await updateActiveStatusApi(nextValue);

      const data = res?.data;

      // ⚠️ FIX: correct response handling (no double .data)
      const serverActive = data?.active;

      if (typeof serverActive === "boolean") {
        setActive(serverActive);
      }

      // update token ONLY if provided
      if (data?.accessToken) {
        setAccessToken(data.accessToken);
      }

    } catch (err) {
      console.error("Active toggle failed", err);

      // 🔥 rollback state instead of breaking auth
      setActive(prev);
    } finally {
      setLoading(false);
    }
  };

  return {
    active,
    toggleActive,
    loading
  };
};