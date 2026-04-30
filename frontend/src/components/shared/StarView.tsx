type Props = {
  rating: number;
};

export default function StarView({ rating = 0 }: Props) {
  const rounded = Math.round(rating);

  return (
    <div className="flex items-center gap-1.5">

      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= rounded;
          return (
            <svg
              key={star}
              viewBox="0 0 24 24"
              className={`w-4 h-4 transition-colors duration-150 ${
                filled ? "fill-amber-400 drop-shadow-sm" : "fill-stone-200"
              }`}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          );
        })}
      </div>

      {/* Score */}
      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${
        rating >= 4
          ? "text-amber-700 bg-amber-50"
          : rating >= 2.5
          ? "text-stone-600 bg-stone-100"
          : "text-stone-400 bg-stone-50"
      }`}>
        {rating?.toFixed?.(1) || "0.0"}
      </span>
    </div>
  );
}