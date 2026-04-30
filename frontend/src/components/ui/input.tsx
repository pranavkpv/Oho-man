import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base
        "h-11 w-full min-w-0 rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-800 font-medium transition-all duration-200 outline-none",
        // Placeholder
        "placeholder:text-stone-300 placeholder:font-normal",
        // Hover
        "hover:border-stone-300",
        // Focus
        "focus-visible:border-amber-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-amber-100",
        // File input
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-stone-600",
        // Disabled
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-stone-100 disabled:opacity-50 disabled:text-stone-400",
        // Invalid
        "aria-invalid:border-red-300 aria-invalid:bg-red-50/40 aria-invalid:focus-visible:border-red-400 aria-invalid:focus-visible:ring-red-100",
        className
      )}
      {...props}
    />
  )
}

export { Input }