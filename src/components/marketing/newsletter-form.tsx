"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { commerce } from "@/lib/commerce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

/** Newsletter signup. Subscribes through the commerce provider seam. */
export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await commerce.subscribeNewsletter(email);
      toast.success("Thank you — you're on the list.");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex w-full max-w-sm items-center gap-2", className)}>
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={loading} aria-label="Subscribe">
        <ArrowRight size={16} strokeWidth={1.5} />
      </Button>
    </form>
  );
}
