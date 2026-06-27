import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";
import { cn } from "@/lib/utils/cn";

/** Form label — uppercase, letter-spaced, muted. */
export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      "text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground peer-disabled:opacity-60",
      className,
    )}
    {...props}
  />
));
Label.displayName = "Label";
