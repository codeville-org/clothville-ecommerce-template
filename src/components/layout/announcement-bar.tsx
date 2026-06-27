"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { siteConfig } from "@/config/site";

/**
 * Top announcement bar. Cross-fades through the configured messages every few
 * seconds; under `prefers-reduced-motion` it shows the first message only.
 * Dismissible for the current session.
 */
export function AnnouncementBar() {
  const messages = [...siteConfig.announcements];
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (reduceMotion || messages.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [reduceMotion, messages.length]);

  if (dismissed || messages.length === 0) return null;

  return (
    <div className="relative bg-foreground text-background">
      <div className="mx-auto flex max-w-editorial items-center justify-center px-10 py-2">
        <p
          key={index}
          className="text-center text-[0.7rem] uppercase tracking-[0.2em] motion-safe:animate-fade-in"
        >
          {messages[index]}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center text-background/70 transition-colors hover:text-background"
      >
        <X size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}
