import * as React from "react";
import { cn } from "@/lib/utils/cn";

/** Bespoke text input, square-cornered with a token-based focus ring. */
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-11 w-full border border-input bg-transparent px-4 text-sm text-foreground transition-colors",
        "placeholder:text-muted-foreground/70 focus-visible:border-foreground focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
