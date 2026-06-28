"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/store/cart";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/** Promo-code field wired to the cart's discount methods. */
export function PromoCode() {
  const activeCode = useCart((s) => s.cart?.discountCode);
  const applyDiscount = useCart((s) => s.applyDiscount);
  const removeDiscount = useCart((s) => s.removeDiscount);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleApply(event: React.FormEvent) {
    event.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    try {
      await applyDiscount(code.trim());
      toast.success("Promo code applied");
      setCode("");
    } catch {
      toast.error("That promo code isn't valid.");
    } finally {
      setLoading(false);
    }
  }

  if (activeCode) {
    return (
      <div className="flex items-center justify-between border border-border px-3 py-2.5 text-sm">
        <span>
          Code <span className="font-medium">{activeCode}</span> applied
        </span>
        <button
          type="button"
          onClick={() => removeDiscount()}
          aria-label="Remove promo code"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <X size={15} strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleApply} className="flex gap-2">
      <Input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Promo code"
        aria-label="Promo code"
        className="flex-1"
      />
      <Button type="submit" variant="outline" disabled={loading}>
        Apply
      </Button>
    </form>
  );
}
