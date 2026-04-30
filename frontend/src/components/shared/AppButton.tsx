import { Button } from '@/components/ui/button';

interface Props {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export default function AppButton({ children, loading, className }: Props) {
  return (
    <Button
      className={className ?? "w-full h-11 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm tracking-wide shadow-md shadow-amber-200 hover:shadow-lg hover:shadow-amber-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"}
      disabled={loading}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          <span className="animate-pulse">Please wait…</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-1.5">
          {children}
        </span>
      )}
    </Button>
  );
}