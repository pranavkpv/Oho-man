type Props = {
  rating: number;
};

export default function StarView({ rating = 0 }: Props) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= Math.round(rating)
              ? "text-yellow-400"
              : "text-gray-300"
          }
        >
          ★
        </span>
      ))}

      <span className="text-xs text-gray-500 ml-2">
        ({rating?.toFixed?.(1) || 0})
      </span>
    </div>
  );
}