import { useChangeBookingStatus } from "@/hooks/useChangeBookingStatus";
import { useMyWorks } from "@/hooks/useMyWorks";

export default function MyWorkList() {

   const {
      pending,
      progress,
      completed,
      loading,
      error
   } = useMyWorks();

   const { updateStatus, loading: statusLoading } = useChangeBookingStatus();

   const handleStatusChange = async (id: string, status: string) => {
      try {
         await updateStatus(id, status);
      } catch (err) {
         console.error(err);
      }
   };


   if (loading) {
      return (
         <div className="p-6">
            Loading works...
         </div>
      );
   }

   if (error) {
      return (
         <div className="p-6 text-red-500">
            {error}
         </div>
      );
   }

   const WorkCard = ({ work, status }: any) => (
      <div className="border rounded-xl p-4 shadow">
         <h3 className="font-bold text-lg">
            {work.serviceId.serviceName}
         </h3>

         <p>Amount: ₹{work.serviceId.amount}</p>
         <p>Customer: {work.userId.username}</p>
         <p>Email: {work.userId.email}</p>
         <p>Phone: {work.userId.phonenumber}</p>

         <p className="text-sm text-gray-500 mt-2">
            {new Date(work.date).toLocaleDateString()}
         </p>
         <div className="mt-4">
            {status === "pending" && (
               <button
                  onClick={() =>
                     handleStatusChange(work._id, "inprogress")
                  }
                  disabled={statusLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
               >
                  {statusLoading ? "Updating..." : "Start Work"}
               </button>
            )}

            {status === "progress" && (
               <button
                  onClick={() =>
                     handleStatusChange(work._id, "completed")
                  }
                  disabled={statusLoading}
                  className="bg-green-500 text-white px-4 py-2 rounded"
               >
                  {statusLoading ? "Updating..." : "Mark Completed"}
               </button>
            )}
         </div>
      </div>
   );

   const Section = ({ title, items, status }: any) => (
      <div className="mb-10">
         <h2 className="text-2xl font-bold mb-4">{title}</h2>

         {items.length === 0 ? (
            <p>No work found</p>
         ) : (
            <div className="grid md:grid-cols-3 gap-6">
               {items.map((work: any) => (
                  <WorkCard
                     key={work._id}
                     work={work}
                     status={status}
                  />
               ))}
            </div>
         )}
      </div>
   );

   return (
      <div className="p-6">
         <Section title="Pending Work" items={pending} status="pending" />
         <Section title="In Progress" items={progress} status="progress" />
         <Section title="Completed" items={completed} status="complete" />
      </div>
   );
}