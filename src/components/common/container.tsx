import * as React from "react";
import { cn } from "@/lib/utils/cn";

/** Centered page container at the editorial max width with responsive gutters. */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-editorial px-4 sm:px-6 lg:px-8", className)} {...props} />;
}
