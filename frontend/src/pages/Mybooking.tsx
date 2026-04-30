import StarRating from "@/components/shared/StarRating";
import { useBookingData } from "@/hooks/useBookingData";
import { useState } from "react";

export default function MyBookings() {
  const [shouldFetch] = useState(true);

  const { bookings, loading, error } = useBookingData(shouldFetch);

  const pending = bookings.filter((b) => b.status === "pending");
  const inprogress = bookings.filter((b) => b.status === "inprogress");
  const completed = bookings.filter((b) => b.status === "completed");

  const BookingCard = ({ b }: any) => (
    <div className="bg-white rounded-xl shadow p-4 space-y-2">
      <img
        src={b.serviceId?.image}
        alt="serviceImage"
        className="w-full h-40 object-cover rounded-md"
      />

      <h2 className="font-semibold">
        {b.serviceId?.serviceName}
      </h2>

      <p className="text-sm text-gray-500">
        Provider: {b.providerId?.username}
      </p>

      <p className="text-sm text-gray-500">
        Amount: ₹{b.amount}
      </p>

      <p>Date: {b.createdAt}</p>

      {/* ⭐ ONLY FOR COMPLETED */}
      {b.status === "completed" && (
        <div className="pt-2">
          <StarRating
            providerId={b.providerId?._id}
            bookingId={b._id}
            initialRating={b.rating}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">My Bookings</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* PENDING */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Pending</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pending.map((b) => (
            <BookingCard key={b._id} b={b} />
          ))}
        </div>
      </section>

      {/* INPROGRESS */}
      <section>
        <h2 className="text-lg font-semibold mb-3">In Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inprogress.map((b) => (
            <BookingCard key={b._id} b={b} />
          ))}
        </div>
      </section>

      {/* COMPLETED */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Completed</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {completed.map((b) => (
            <BookingCard key={b._id} b={b} />
          ))}
        </div>
      </section>
    </div>
  );
}