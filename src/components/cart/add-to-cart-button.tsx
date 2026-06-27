"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/store/cart";
import { useUI } from "@/lib/store/ui";
import { Button, type ButtonProps } from "@/components/ui/button";

interface AddToCartButtonProps extends Omit<ButtonProps, "onClick"> {
  /** Variant to add. When undefined the button is disabled (e.g. no size picked). */
  variantId?: string;
  quantity?: number;
  label?: string;
  /** Open the cart drawer after adding (default true). */
  openDrawer?: boolean;
  /** Called after a successful add (e.g. to close a quick-view modal). */
  onAdded?: () => void;
}

/** Adds a variant to the cart through the commerce provider, with feedback. */
export function AddToCartButton({
  variantId,
  quantity = 1,
  label = "Add to bag",
  openDrawer = true,
  onAdded,
  disabled,
  className,
  ...props
}: AddToCartButtonProps) {
  const addItem = useCart((s) => s.addItem);
  const openCart = useUI((s) => s.openCartDrawer);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!variantId) return;
    setLoading(true);
    try {
      await addItem(variantId, quantity);
      toast.success("Added to your bag");
      onAdded?.();
      if (openDrawer) openCart();
    } catch {
      toast.error("Sorry — that couldn't be added.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || loading || !variantId}
      className={className}
      {...props}
    >
      {loading ? "Adding…" : label}
    </Button>
  );
}
