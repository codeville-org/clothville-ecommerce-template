import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/** Editorial section header: optional eyebrow, serif title, optional link. */
export function SectionHeading({
  eyebrow,
  title,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-6", className)}>
      <div>
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
        )}
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl">{title}</h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className="group hidden shrink-0 items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:text-foreground sm:inline-flex"
        >
          {action.label}
          <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
