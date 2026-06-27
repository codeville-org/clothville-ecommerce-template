"use client";

import * as React from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Slide-in panel built on Radix Dialog. Used for the cart drawer, mobile nav
 * and mobile filters. Each Sheet must include a <SheetTitle> for accessibility
 * (wrap it in <VisuallyHidden> if it should not be visible).
 */
const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;

const SIDE = {
  right:
    "inset-y-0 right-0 h-full w-full max-w-md border-l data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right",
  left: "inset-y-0 left-0 h-full w-full max-w-sm border-r data-[state=open]:animate-slide-in-left data-[state=closed]:animate-slide-out-left",
  bottom:
    "inset-x-0 bottom-0 max-h-[85vh] rounded-t-lg border-t data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-slide-out-bottom",
} as const;

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  side?: keyof typeof SIDE;
  hideClose?: boolean;
}

const SheetContent = React.forwardRef<React.ComponentRef<typeof Dialog.Content>, SheetContentProps>(
  ({ className, children, side = "right", hideClose = false, ...props }, ref) => (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-[2px] data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
      <Dialog.Content
        ref={ref}
        className={cn(
          "fixed z-50 flex flex-col border-border bg-background shadow-2xl focus:outline-none",
          SIDE[side],
          className,
        )}
        {...props}
      >
        {children}
        {!hideClose && (
          <Dialog.Close
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-sm text-foreground/70 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X size={18} strokeWidth={1.5} />
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  ),
);
SheetContent.displayName = "SheetContent";

function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-b border-border px-6 py-5", className)} {...props} />;
}

function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto border-t border-border px-6 py-5", className)} {...props} />;
}

const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn("font-serif text-lg tracking-wide text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
