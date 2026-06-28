"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { Toaster } from "sonner";
import { useCart } from "@/lib/store/cart";
import { useAuth } from "@/lib/store/auth";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QuickView } from "@/components/product/quick-view";

/** Loads the persisted cart and auth session once on mount. Renders nothing. */
function StoreInitializer() {
  useEffect(() => {
    void useCart.getState().init();
    void useAuth.getState().init();
  }, []);
  return null;
}

/** Sonner toaster, kept in sync with the active (light/dark) theme. */
function ThemedToaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: "!rounded-none !border-border !bg-card !text-card-foreground !font-sans",
        },
      }}
    />
  );
}

/**
 * App-wide client providers: theme (class-based dark mode via next-themes),
 * toast notifications, and cart hydration.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={200}>
        {children}
        <StoreInitializer />
        <QuickView />
        <ThemedToaster />
      </TooltipProvider>
    </NextThemesProvider>
  );
}
