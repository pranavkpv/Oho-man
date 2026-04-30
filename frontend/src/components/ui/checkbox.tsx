import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Base
        "peer relative flex size-5 shrink-0 items-center justify-center rounded-md border-2 border-stone-200 bg-white transition-all duration-200 outline-none",
        // Hover
        "hover:border-amber-300",
        // Focus
        "focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-1 focus-visible:border-amber-400",
        // Checked
        "data-[state=checked]:border-amber-500 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-amber-400 data-[state=checked]:to-orange-500 data-[state=checked]:shadow-sm data-[state=checked]:shadow-amber-200",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-stone-200",
        // Invalid
        "aria-invalid:border-red-300 aria-invalid:focus-visible:ring-red-100",
        // Extended hit area
        "after:absolute after:-inset-x-3 after:-inset-y-2",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-white transition-none [&>svg]:size-3"
      >
        <CheckIcon strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }