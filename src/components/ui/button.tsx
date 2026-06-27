import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils/cn";

/**
 * Bespoke button. Editorial, square-cornered, uppercase letter-spaced.
 * Use `asChild` to render the styles on a child element (e.g. a Next <Link>).
 */
const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-xs uppercase tracking-[0.15em] transition-[opacity,background-color,color,border-color] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const VARIANTS = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  accent: "bg-accent text-accent-foreground hover:opacity-90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
  outline: "border border-border text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  link: "text-foreground normal-case tracking-normal underline-offset-4 hover:underline",
} as const;

const SIZES = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-12 px-8",
  icon: "h-10 w-10",
} as const;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  /** Render styles onto the single child element instead of a <button>. */
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button";
    return (
      <Comp ref={ref} className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props} />
    );
  },
);
Button.displayName = "Button";
