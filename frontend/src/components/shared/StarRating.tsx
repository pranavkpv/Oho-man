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
  initialRating = 0,
}: Props) {
  const [rating, setRating] = useState(initialRating);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(initialRating > 0);

  const handleRate = async (value: number) => {
    if (loading) return;
    try {
      setLoading(true);
      setRating(value);
      await addRatingApi(providerId, value, bookingId);
      setSubmitted(true);
    } catch (err) {
      console.error("Rating failed", err);
      setRating(initialRating);
    } finally {
      setLoading(false);
    }
  };

  const active = hover || rating;

  const labels: Record<number, string> = {
    1: "Poor",
    2: "Fair",
    3: "Good",
    4: "Great",
    5: "Excellent",
  };

  return (
    <div className="space-y-2">

      {/* Stars row */}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = star <= active;
          return (
            <button
            aria-label="submit"
              key={star}
              disabled={loading || submitted}
              onMouseEnter={() => !submitted && setHover(star)}
              onMouseLeave={() => !submitted && setHover(0)}
              onClick={() => !submitted && handleRate(star)}
              className={`relative w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150
                ${!submitted && !loading ? "hover:scale-125 hover:bg-amber-50 cursor-pointer" : "cursor-default"}
                ${isActive ? "scale-110" : "scale-100"}
              `}
            >
              <svg
                viewBox="0 0 24 24"
                className={`w-6 h-6 transition-all duration-200 ${
                  isActive
                    ? "fill-amber-400 drop-shadow-sm"
                    : "fill-stone-200"
                }`}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          );
        })}

        {/* Label */}
        <span className={`ml-2 text-xs font-semibold transition-all duration-200 ${
          hover
            ? "text-amber-600 opacity-100"
            : rating
            ? "text-stone-500 opacity-80"
            : "opacity-0"
        }`}>
          {labels[hover || rating]}
        </span>

        {/* Loading spinner */}
        {loading && (
          <span className="ml-2 w-3.5 h-3.5 rounded-full border-2 border-amber-200 border-t-amber-500 animate-spin" />
        )}
      </div>

      {/* Submitted confirmation */}
      {submitted && !loading && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
          </svg>
          Rating submitted
        </div>
      )}
    </div>
  );
}