"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";
import { useAuth } from "@/lib/store/auth";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/common/container";
import { EmptyState } from "@/components/common/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

const NAV = [
  { label: "Profile", href: "/account" },
  { label: "Orders", href: "/account/orders" },
  { label: "Addresses", href: "/account/addresses" },
];

/** Account section wrapper: requires sign-in, renders the side nav + sign-out. */
export function AccountShell({ title, children }: { title: string; children: ReactNode }) {
  const hydrated = useHydrated();
  const ready = useAuth((s) => s.ready);
  const customer = useAuth((s) => s.customer);
  const logout = useAuth((s) => s.logout);
  const pathname = usePathname();

  if (!hydrated || !ready) {
    return (
      <Container className="py-12">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="mt-10 h-64 w-full" />
      </Container>
    );
  }

  if (!customer) {
    return (
      <Container className="py-12">
        <EmptyState
          icon={User}
          title="Please sign in"
          description="Sign in to view your profile, orders and saved addresses."
          action={{ label: "Sign in", href: "/login" }}
        />
      </Container>
    );
  }

  const isActive = (href: string) =>
    href === "/account" ? pathname === href : pathname.startsWith(href);

  return (
    <Container className="py-12">
      <h1 className="font-serif text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Welcome back, {customer.firstName}.</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[14rem_1fr]">
        <aside>
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "py-1.5 text-sm transition-colors",
                  isActive(item.href)
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => logout()}
              className="mt-1 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign out
            </button>
          </nav>
        </aside>

        <div>{children}</div>
      </div>
    </Container>
  );
}
