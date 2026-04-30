import { useServices } from "@/hooks/useServices";
import { useNavigate } from "react-router-dom";

export default function ServicesList() {
  const navigate = useNavigate();
  const { services, loading, error } = useServices(true);

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin" />
        <p className="text-sm font-medium text-stone-400 tracking-widest uppercase animate-pulse">
          Loading services…
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

  if (!services?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <span className="text-5xl opacity-20">🛠️</span>
        <p className="text-stone-400 font-medium text-sm">No services available</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Browse</p>
        <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Services</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id.toString()}
            onClick={() => navigate(`/users/${service._id}`)}
            className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-stone-100">
              <img
                src={service.image}
                alt={service.serviceName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              {/* Price badge */}
              <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                ₹{service.price}
              </div>

              {/* Arrow on hover */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                <span className="text-amber-600 text-sm font-bold">→</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-4">
              <h2 className="font-semibold text-stone-800 text-base leading-snug group-hover:text-amber-700 transition-colors duration-200">
                {service.serviceName}
              </h2>

              <div className="mt-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Available
                </span>
                <span className="text-xs text-stone-400 font-medium group-hover:text-amber-600 transition-colors">
                  View details →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}