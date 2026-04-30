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

  const Navigate = useNavigate()

  const handleBookNow = (user: any) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const confirmBooking = async () => {
    if (!selectedUser || !serviceId) return;

    try {
      await bookService({
        serviceId,
        providerId: selectedUser._id
      });


      alert("Booking successful!");
      Navigate('/home')
      closeModal();
    } catch {
      alert("Booking failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Users for Service
      </h1>

      {loading && (
        <p className="text-gray-600 animate-pulse">Loading users...</p>
      )}

      {error && (
        <p className="text-red-500 font-medium">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={user.image}
              alt={`${ user.username } profile image`}
              className="w-full h-60 object-contain bg-gray-100"
            />

            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">
                {user.username}
              </h2>

              <p className="text-sm text-gray-500">
                📧 {user.email}
              </p>

              <div className="mb-2">
                <StarView rating={user.rating} />
              </div>


              <p className="text-sm text-gray-500">
                📞 {user.phonenumber}
              </p>

              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${ user.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                  }`}
              >
                {user.active ? "Available" : "Not Available"}
              </span>

              <button
                onClick={() => handleBookNow(user)}
                disabled={!user.active}
                className={`w-full mt-3 py-2 rounded-lg font-semibold ${ user.active
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                  }`}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">
              Confirm Booking
            </h2>

            <p className="mb-2">
              Provider: <b>{selectedUser.username}</b>
            </p>

            <p className="mb-4">
              Email: {selectedUser.email}
            </p>

            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="w-full py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={confirmBooking}
                disabled={bookingLoading}
                className="w-full py-2 bg-green-600 text-white rounded-lg"
              >
                {bookingLoading ? "Booking..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}