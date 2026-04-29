import { useJobs } from "@/hooks/useJobs";

export default function JobList() {
  const {
    myJob,
    otherJob,
    loading,
    error
  } = useJobs();

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading jobs...
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

  const JobCard = ({ job }: any) => (
    <div className="bg-white rounded-xl shadow-md p-4 border">
      <img
        src={job.image}
        alt={job.jobName}
        className="w-full h-40 object-cover rounded-lg"
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold">
          {job.serviceName}
        </h3>

        <p className="text-gray-600">
          ₹{job.price}
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-10">
      
      {/* My Jobs */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          My Jobs
        </h2>

        {myJob.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {myJob.map((job) => (
              <JobCard
                key={job._id}
                job={job}
              />
            ))}
          </div>
        )}
      </div>

      {/* Other Jobs */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Other Jobs
        </h2>

        {otherJob.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {otherJob.map((job) => (
              <JobCard
                key={job._id}
                job={job}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}