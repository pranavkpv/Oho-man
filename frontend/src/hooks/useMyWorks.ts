import { useEffect, useState } from "react";
import { getMyWorksApi } from "@/api/provider.service";

export interface WorkItem {
   _id: string;

   serviceId: {
      _id: string;
      serviceName: string;
      amount: number;
   };

   userId: {
      _id: string;
      username: string;
      email: string;
      phonenumber: string;
   };

   date: string;
}

export const useMyWorks = () => {

   const [pending, setPending] =
      useState<WorkItem[]>([]);

   const [progress, setProgress] =
      useState<WorkItem[]>([]);

   const [completed, setCompleted] =
      useState<WorkItem[]>([]);

   const [loading, setLoading] =
      useState(true);

   const [error, setError] =
      useState("");

   const fetchWorks = async () => {
      try {

         setLoading(true);

         const data =
            await getMyWorksApi();
   

         setPending(
            data.data.pending || []
         );

         setProgress(
            data.data.progress || []
         );

         setCompleted(
            data.data.completed || []
         );

      } catch (err: any) {

         setError(
            err?.response?.data?.message ||
            "Failed to fetch works"
         );

      } finally {

         setLoading(false);

      }
   };

   useEffect(() => {
      fetchWorks();
   }, []);

   return {
      pending,
      progress,
      completed,
      loading,
      error,
      refetchWorks: fetchWorks
   };
};