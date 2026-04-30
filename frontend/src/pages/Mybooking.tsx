import StarRating from "@/components/shared/StarRating";
import { useBookingData } from "@/hooks/useBookingData";
import { useState } from "react";

export default function MyBookings() {
  const [shouldFetch] = useState(true);
  const { bookings, loading, error } = useBookingData(shouldFetch);

  const pending = bookings.filter((b) => b.status === "pending");
  const inprogress = bookings.filter((b) => b.status === "inprogress");
  const completed = bookings.filter((b) => b.status === "completed");

  const statusConfig = {
    pending: {
      label: "Pending",
      dot: "bg-amber-400",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      header: "text-amber-700",
      divider: "bg-amber-200",
      icon: "⏳",
    },
    inprogress: {
      label: "In Progress",
      dot: "bg-blue-400",
      badge: "bg-blue-50 text-blue-700 border-blue-200",
      header: "text-blue-700",
      divider: "bg-blue-200",
      icon: "🔧",
    },
    completed: {
      label: "Completed",
      dot: "bg-emerald-400",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      header: "text-emerald-700",
      divider: "bg-emerald-200",
      icon: "✓",
    },
  };

  const formatDate = (raw: string) => {
    try {
      return new Date(raw).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return raw;
    }
  };

  const BookingCard = ({ b, status }: any) => {
    const cfg = statusConfig[status as keyof typeof statusConfig];
    return (
      <div className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col">

        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-stone-100">
          <img
            src={b.serviceId?.image}
            alt="serviceImage"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Amount pill */}
          <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
            ₹{b.amount}
          </span>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-3 flex-1">
          <h2 className="font-semibold text-stone-800 text-base leading-snug group-hover:text-amber-700 transition-colors">
            {b.serviceId?.serviceName}
          </h2>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span className="w-4 h-4 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">👤</span>
              <span className="font-medium text-stone-600">{b.providerId?.username}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span className="w-4 h-4 rounded-full bg-stone-100 flex items-center justify-center">📅</span>
              {formatDate(b.createdAt)}
            </div>
          </div>

          {/* Star rating for completed */}
          {b.status === "completed" && (
            <div className="pt-2 border-t border-stone-100 mt-auto">
              <p className="text-xs text-stone-400 font-medium mb-1.5 uppercase tracking-wider">Your rating</p>
              <StarRating
                providerId={b.providerId?._id}
                bookingId={b._id}
                initialRating={b.rating}
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  const Section = ({
    status,
    data,
  }: {
    status: keyof typeof statusConfig;
    data: any[];
  }) => {
    const cfg = statusConfig[status];
    return (
      <section>
        {/* Section header */}
        <div className="flex items-center gap-3 mb-5">
          <span className={`text-lg font-bold tracking-tight ${cfg.header}`}>
            {cfg.icon} {cfg.label}
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg.badge}`}>
            {data.length}
          </span>
          <div className={`flex-1 h-px ${cfg.divider}`} />
        </div>

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 rounded-2xl bg-stone-50 border border-dashed border-stone-200">
            <span className="text-3xl mb-2 opacity-40">{cfg.icon}</span>
            <p className="text-sm text-stone-400 font-medium">No {cfg.label.toLowerCase()} bookings</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map((b) => (
              <BookingCard key={b._id} b={b} status={status} />
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
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Overview</p>
          <h1 className="text-3xl font-bold text-stone-800 tracking-tight">My Bookings</h1>
        </div>

        {/* Summary pills */}
        <div className="hidden sm:flex items-center gap-2">
          {(["pending", "inprogress", "completed"] as const).map((s) => {
            const cfg = statusConfig[s];
            const count = { pending, inprogress, completed }[s].length;
            return (
              <span key={s} className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${cfg.badge}`}>
                {count} {cfg.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-9 h-9 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin" />
          <p className="text-sm text-stone-400 font-medium animate-pulse tracking-widest uppercase">Loading bookings…</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl px-5 py-4 text-sm">
          <span className="text-lg">⚠️</span>
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <Section status="pending" data={pending} />
          <Section status="inprogress" data={inprogress} />
          <Section status="completed" data={completed} />
        </>
      )}
    </div>
  );
}