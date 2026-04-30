import { useEffect, useState } from "react";
import axios from "axios";
import { getJobAPI } from "@/api/provider.service";

export interface Job {
   _id: string;
   jobName: string;
   image: string;
   price: number;
}

interface JobResponse {
   myJob: Job[];
   otherJob: Job[];
}

export const useJobs = () => {
   const [myJob, setMyJob] = useState<Job[]>([]);
   const [otherJob, setOtherJob] = useState<Job[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   const fetchJobs = async () => {
      try {
         setLoading(true);
         const res = await getJobAPI()
         setMyJob(res.data.myJob || []);
         setOtherJob(res.data.otherJob || []);
      } catch (err: any) {
         setError(err?.response?.data?.message || "Failed to fetch jobs");
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchJobs();
   }, []);

   return {
      myJob,
      otherJob,
      loading,
      error,
      refetchJobs: fetchJobs
   };
};