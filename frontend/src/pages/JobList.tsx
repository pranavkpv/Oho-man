import { useJobs } from "@/hooks/useJobs";

export default function JobList() {
  const { myJob, otherJob, loading, error } = useJobs();

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin" />
        <p className="text-sm font-medium text-amber-700 tracking-widest uppercase animate-pulse">
          Loading jobs…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-6 p-5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
        <span className="text-red-400 text-xl mt-0.5">⚠</span>
        <div>
          <p className="font-semibold text-red-700 text-sm">Something went wrong</p>
          <p className="text-red-500 text-sm mt-0.5">{error}</p>
        </div>
      </div>
    );
  }

  const JobCard = ({ job }: any) => (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <img
          src={job.image}
          alt={job.jobName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Price badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          ₹{job.price}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-semibold text-stone-800 text-base leading-snug group-hover:text-amber-700 transition-colors duration-200">
          {job.serviceName}
        </h3>

        {job.jobName && (
          <p className="text-stone-400 text-xs mt-1 truncate">{job.jobName}</p>
        )}

        <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Available
          </span>
          <button className="text-xs font-semibold text-amber-600 hover:text-amber-800 transition-colors">
            View →
          </button>
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ label }: { label: string }) => (
    <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-stone-50 border border-dashed border-stone-200">
      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-3 text-2xl">
        📋
      </div>
      <p className="text-stone-500 text-sm font-medium">{label}</p>
    </div>
  );

  const SectionHeader = ({ title, count }: { title: string; count: number }) => (
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-xl font-bold text-stone-800 tracking-tight">{title}</h2>
      <span className="text-xs font-semibold text-stone-400 bg-stone-100 px-2.5 py-0.5 rounded-full">
        {count}
      </span>
      <div className="flex-1 h-px bg-stone-100" />
    </div>
  );

  return (
    <div className="px-6 py-8 space-y-12 max-w-6xl mx-auto">

      {/* My Jobs */}
      <section>
        <SectionHeader title="My Jobs" count={myJob.length} />
        {myJob.length === 0 ? (
          <EmptyState label="You haven't posted any jobs yet" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {myJob.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </section>

      {/* Other Jobs */}
      <section>
        <SectionHeader title="Other Jobs" count={otherJob.length} />
        {otherJob.length === 0 ? (
          <EmptyState label="No other jobs available right now" />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherJob.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}