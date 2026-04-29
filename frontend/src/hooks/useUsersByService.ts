import { FetchUseByServiceAPI } from "@/api/user.service";
import { useEffect, useState } from "react";

export const useUsersByService = (serviceId?: string) => {
   const [users, setUsers] = useState<any[]>([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   useEffect(() => {
      if (!serviceId) return;

      const fetchUsers = async () => {
         try {
            setLoading(true);
            setError("");

            const res = await FetchUseByServiceAPI(serviceId)

            if (!res.success) {
               throw new Error("Failed to fetch users");
            }

            const data = res.data
            console.log(data)
            setUsers(data);
         } catch (err: any) {
            setError(err.message || "Something went wrong");
         } finally {
            setLoading(false);
         }
      };

      fetchUsers();
   }, [serviceId]);

   return { users, loading, error };
};