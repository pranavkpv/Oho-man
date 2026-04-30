import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-1 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-red-300 aria-invalid:ring-2 aria-invalid:ring-red-200 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-200 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:shadow-amber-200 hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border-2 border-stone-200 bg-white text-stone-700 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 aria-expanded:border-amber-300 aria-expanded:bg-amber-50",
        secondary:
          "bg-stone-100 text-stone-700 hover:bg-stone-200 hover:-translate-y-0.5 aria-expanded:bg-stone-200",
        ghost:
          "text-stone-600 hover:bg-stone-100 hover:text-stone-800 aria-expanded:bg-stone-100",
        destructive:
          "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 focus-visible:ring-red-200",
        link: "text-amber-600 underline-offset-4 hover:underline hover:text-amber-700",
      },
      size: {
        default: "h-10 gap-1.5 px-4",
        xs:     "h-6 gap-1 rounded-lg px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm:     "h-8 gap-1 rounded-xl px-3 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg:     "h-11 gap-2 px-5 text-base rounded-xl",
        icon:        "size-10 rounded-xl",
        "icon-xs":   "size-6 rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":   "size-8 rounded-xl [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg":   "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }