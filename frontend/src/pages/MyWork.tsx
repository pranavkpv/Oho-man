import { useChangeBookingStatus } from "@/hooks/useChangeBookingStatus";
import { useMyWorks } from "@/hooks/useMyWorks";

export default function MyWorkList() {
  const { pending, progress, completed, loading, error } = useMyWorks();
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
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin" />
        <p className="text-sm font-medium text-stone-400 tracking-widest uppercase animate-pulse">
          Loading works…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl px-5 py-4 text-sm">
        <span className="text-lg">⚠️</span>
        {error}
      </div>
    );
  }

  const statusConfig = {
    pending: {
      label: "Pending",
      icon: "⏳",
      dot: "bg-amber-400",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      divider: "bg-amber-200",
      headerColor: "text-amber-700",
      strip: "from-amber-300 to-amber-500",
    },
    progress: {
      label: "In Progress",
      icon: "🔧",
      dot: "bg-blue-400",
      badge: "bg-blue-50 text-blue-700 border-blue-200",
      divider: "bg-blue-200",
      headerColor: "text-blue-700",
      strip: "from-blue-300 to-blue-500",
    },
    complete: {
      label: "Completed",
      icon: "✓",
      dot: "bg-emerald-400",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      divider: "bg-emerald-200",
      headerColor: "text-emerald-700",
      strip: "from-emerald-300 to-emerald-500",
    },
  };

  const WorkCard = ({ work, status }: { work: any; status: keyof typeof statusConfig }) => {
    const cfg = statusConfig[status];

    return (
      <div className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">

        {/* Top color strip */}
        <div className={`h-1 w-full bg-gradient-to-r ${cfg.strip}`} />

        <div className="p-5 flex flex-col gap-4 flex-1">

          {/* Title + status badge */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-stone-800 text-base leading-snug group-hover:text-amber-700 transition-colors duration-200">
              {work.serviceId.serviceName}
            </h3>
            <span className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
          </div>

          {/* Amount */}
          <div className="inline-flex items-center gap-1.5 bg-stone-50 border border-stone-100 rounded-xl px-3 py-2 w-fit">
            <span className="text-xs text-stone-400 font-medium">Amount</span>
            <span className="text-sm font-bold text-stone-700">₹{work.serviceId.amount}</span>
          </div>

          {/* Customer info */}
          <div className="space-y-2 border-t border-stone-100 pt-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-xs">👤</span>
              <span className="text-sm font-semibold text-stone-700">{work.userId.username}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-xs">✉️</span>
              <span className="text-xs text-stone-500 truncate">{work.userId.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-xs">📞</span>
              <span className="text-xs text-stone-500">{work.userId.phonenumber}</span>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-auto">
            <span>📅</span>
            {new Date(work.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>

          {/* Action button */}
          {status === "pending" && (
            <button
              onClick={() => handleStatusChange(work._id, "inprogress")}
              disabled={statusLoading}
              className="w-full mt-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-blue-200 hover:shadow-md hover:shadow-blue-200 hover:-translate-y-0.5 transition-all duration-200"
            >
              {statusLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Updating…
                </>
              ) : (
                <>▶ Start Work</>
              )}
            </button>
          )}

          {status === "progress" && (
            <button
              onClick={() => handleStatusChange(work._id, "completed")}
              disabled={statusLoading}
              className="w-full mt-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-emerald-200 hover:shadow-md hover:shadow-emerald-200 hover:-translate-y-0.5 transition-all duration-200"
            >
              {statusLoading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Updating…
                </>
              ) : (
                <>✓ Mark Completed</>
              )}
            </button>
          )}

          {status === "complete" && (
            <div className="w-full mt-1 flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-semibold px-4 py-2.5 rounded-xl">
              ✓ Work Completed
            </div>
          )}
        </div>
      </div>
    );
  };

  const Section = ({
    title,
    items,
    status,
  }: {
    title: string;
    items: any[];
    status: keyof typeof statusConfig;
  }) => {
    const cfg = statusConfig[status];
    return (
      <section className="space-y-5">
        {/* Section header */}
        <div className="flex items-center gap-3">
          <span className={`text-lg font-bold tracking-tight ${cfg.headerColor}`}>
            {cfg.icon} {title}
          </span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${cfg.badge}`}>
            {items.length}
          </span>
          <div className={`flex-1 h-px ${cfg.divider}`} />
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 rounded-2xl bg-stone-50 border border-dashed border-stone-200">
            <span className="text-3xl mb-2 opacity-30">{cfg.icon}</span>
            <p className="text-sm text-stone-400 font-medium">No {cfg.label.toLowerCase()} work</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((work: any) => (
              <WorkCard key={work._id} work={work} status={status} />
            ))}
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">

      {/* Page header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Provider</p>
          <h1 className="text-3xl font-bold text-stone-800 tracking-tight">My Work</h1>
        </div>

        {/* Summary pills */}
        <div className="hidden sm:flex items-center gap-2">
          {(["pending", "progress", "complete"] as const).map((s) => {
            const cfg = statusConfig[s];
            const count = { pending, progress, complete: completed }[s].length;
            return (
              <span key={s} className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${cfg.badge}`}>
                {count} {cfg.label}
              </span>
            );
          })}
        </div>
      </div>

      <Section title="Pending Work" items={pending} status="pending" />
      <Section title="In Progress" items={progress} status="progress" />
      <Section title="Completed" items={completed} status="complete" />
    </div>
  );
}