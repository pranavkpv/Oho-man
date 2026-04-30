import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUsersByService } from "@/hooks/useUsersByService";
import { useBooking } from "@/hooks/useBooking";
import StarView from "@/components/shared/StarView";

export default function UserList() {
  const { serviceId } = useParams();
  const { users, loading, error } = useUsersByService(serviceId);
  const { bookService, loading: bookingLoading } = useBooking();

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [sortBy, setSortBy] = useState<"none" | "high" | "low">("none");

  const Navigate = useNavigate();

  const closeModal = () => setSelectedUser(null);

  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === "high") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "low") return (a.rating || 0) - (b.rating || 0);
    return 0;
  });

  const confirmBooking = async () => {
    if (!selectedUser || !serviceId) return;
    try {
      await bookService({ serviceId, providerId: selectedUser._id });
      alert("Booking successful!");
      Navigate("/home");
      closeModal();
    } catch {
      alert("Booking failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/40 to-stone-100">

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-orange-200/15 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Browse Providers</p>
            <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Available Providers</h1>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              aria-label="select one sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-white border-2 border-stone-100 hover:border-amber-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm font-medium text-stone-600 px-4 py-2.5 pr-9 rounded-xl transition-all duration-200 cursor-pointer shadow-sm"
            >
              <option value="none">Sort by rating</option>
              <option value="high">Rating: High → Low</option>
              <option value="low">Rating: Low → High</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 rounded-full border-4 border-amber-200 border-t-amber-500 animate-spin" />
            <p className="text-sm font-medium text-stone-400 tracking-widest uppercase animate-pulse">Loading providers…</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl px-5 py-4 text-sm">
            <span className="text-lg">⚠️</span>
            {error}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedUsers.map((user) => (
              <div
                key={user._id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 bg-stone-100 overflow-hidden">
                  <img
                    src={user.image}
                    alt={`${user.username} profile`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Availability badge */}
                  <span className={`absolute top-3 right-3 flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm border ${
                    user.active
                      ? "bg-emerald-50/90 text-emerald-700 border-emerald-200"
                      : "bg-red-50/90 text-red-600 border-red-200"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${user.active ? "bg-emerald-500 animate-pulse" : "bg-red-400"}`} />
                    {user.active ? "Available" : "Unavailable"}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h2 className="font-bold text-stone-800 text-lg leading-snug group-hover:text-amber-700 transition-colors duration-200">
                    {user.username}
                  </h2>

                  {/* Star rating */}
                  <div className="flex items-center gap-2">
                    <StarView rating={user.rating} />
                    {user.rating > 0 && (
                      <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                        {user.rating.toFixed(1)}
                      </span>
                    )}
                  </div>

                  {/* Info rows */}
                  <div className="space-y-1.5 border-t border-stone-100 pt-3">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center shrink-0">✉️</span>
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center shrink-0">📞</span>
                      <span>{user.phonenumber}</span>
                    </div>
                  </div>

                  {/* Book button */}
                  <button
                    onClick={() => setSelectedUser(user)}
                    disabled={!user.active}
                    className={`mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      user.active
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md shadow-amber-200 hover:shadow-lg hover:shadow-amber-200 hover:-translate-y-0.5 active:translate-y-0"
                        : "bg-stone-100 text-stone-400 cursor-not-allowed"
                    }`}
                  >
                    {user.active ? "Book Now →" : "Not Available"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && sortedUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <span className="text-5xl opacity-20">👤</span>
            <p className="text-stone-400 font-medium text-sm">No providers found for this service</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

            {/* Modal accent bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500" />

            <div className="p-7 space-y-6">

              {/* Modal header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Confirm</p>
                  <h2 className="text-xl font-bold text-stone-800">Book this Provider</h2>
                </div>
                <button
                aria-label="close"
                  onClick={closeModal}
                  className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Provider info card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                <img
                  src={selectedUser.image}
                  alt={selectedUser.username}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-800 text-base">{selectedUser.username}</p>
                  <p className="text-xs text-stone-400 truncate mt-0.5">{selectedUser.email}</p>
                  <div className="mt-1.5">
                    <StarView rating={selectedUser.rating} />
                  </div>
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available
                </span>
              </div>

              {/* Notice */}
              <p className="text-xs text-stone-400 text-center">
                By confirming, you agree to proceed with this booking. You can manage it from <span className="text-amber-600 font-semibold">My Bookings</span>.
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  disabled={bookingLoading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md shadow-amber-200 hover:shadow-lg hover:shadow-amber-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  {bookingLoading ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Booking…
                    </>
                  ) : (
                    "Confirm Booking →"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}