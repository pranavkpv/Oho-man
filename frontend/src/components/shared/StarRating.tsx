import { addRatingApi } from "@/api/user.service";
import { useState } from "react";

type Props = {
  providerId: string;
  bookingId: string;
  initialRating?: number;
};

export default function StarRating({
  providerId,
  bookingId,
  initialRating = 0
}: Props) {

  const [rating, setRating] = useState(initialRating);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(0);

  const handleRate = async (value: number) => {
    try {
      setLoading(true);

      // optimistic UI
      setRating(value);

      await addRatingApi(providerId, value, bookingId);

    } catch (err) {
      console.error("Rating failed", err);

      // rollback if needed
      setRating(initialRating);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          disabled={loading}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => handleRate(star)}
          className="text-2xl transition"
        >
          <span
            className={
              star <= (hover || rating)
                ? "text-yellow-400"
                : "text-gray-300"
            }
          >
            ★
          </span>
        </button>
      ))}

      {loading && (
        <span className="text-xs text-gray-500 ml-2">
          sending...
        </span>
      )}
    </div>
  );
}