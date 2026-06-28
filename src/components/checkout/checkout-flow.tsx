"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Lock } from "lucide-react";
import { toast } from "sonner";
import { commerce } from "@/lib/commerce";
import { siteConfig } from "@/config/site";
import { formatMoney } from "@/lib/commerce";
import { useCart } from "@/lib/store/cart";
import { useHydrated } from "@/lib/hooks/use-hydrated";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/common/empty-state";
import { OrderSummary } from "./order-summary";

type Step = "information" | "shipping" | "payment" | "confirmation";

const STEPS: { id: Step; label: string }[] = [
  { id: "information", label: "Information" },
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
];

const INITIAL_FORM = {
  email: "",
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  province: "",
  postalCode: "",
  country: "United States",
  phone: "",
  shippingMethod: "standard",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
  required = true,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={name} className="mb-1.5 block">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}

export function CheckoutFlow() {
  const hydrated = useHydrated();
  const cart = useCart((s) => s.cart);
  const cartId = useCart((s) => s.cartId);
  const clearCart = useCart((s) => s.clearCart);

  const [step, setStep] = useState<Step>("information");
  const [form, setForm] = useState(INITIAL_FORM);
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState<{ number: string; email: string; total: string } | null>(null);

  const update = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const lines = cart?.lines ?? [];

  if (!hydrated) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (step === "confirmation" && placed) {
    return (
      <div className="mx-auto max-w-lg py-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success text-success-foreground">
          <Check size={26} strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 font-serif text-3xl">Thank you for your order</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Order <span className="font-medium text-foreground">{placed.number}</span> is confirmed.
          A receipt has been sent to {placed.email}.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Order total: <span className="text-foreground">{placed.total}</span>
        </p>
        <Button asChild className="mt-8">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Nothing to check out"
        description="Your bag is empty — add a few pieces first."
        action={{ label: "Continue shopping", href: "/shop" }}
      />
    );
  }

  const goTo = (next: Step) => {
    setStep(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function placeOrder() {
    if (!cartId) return;
    setPlacing(true);
    try {
      await commerce.createCheckoutSession(cartId);
      setPlaced({
        number: `CLV-${Math.floor(100000 + Math.random() * 900000)}`,
        email: form.email,
        total: cart ? formatMoney(cart.total, siteConfig.locale) : "",
      });
      await clearCart();
      goTo("confirmation");
    } catch {
      toast.error("Something went wrong placing your order.");
    } finally {
      setPlacing(false);
    }
  }

  const currentIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_24rem]">
      <div>
        {/* Stepper */}
        <ol className="flex items-center gap-2 text-xs uppercase tracking-[0.12em]">
          {STEPS.map((s, i) => (
            <li key={s.id} className="flex items-center gap-2">
              <span className={cn(i <= currentIndex ? "text-foreground" : "text-muted-foreground")}>
                {s.label}
              </span>
              {i < STEPS.length - 1 && <span className="text-muted-foreground/50">/</span>}
            </li>
          ))}
        </ol>

        <div className="mt-8">
          {step === "information" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                goTo("shipping");
              }}
              className="space-y-6"
            >
              <section>
                <h2 className="font-serif text-xl">Contact</h2>
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-4"
                />
              </section>

              <section>
                <h2 className="font-serif text-xl">Shipping address</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="First name" name="firstName" value={form.firstName} onChange={update} autoComplete="given-name" />
                  <Field label="Last name" name="lastName" value={form.lastName} onChange={update} autoComplete="family-name" />
                  <Field label="Address" name="address" value={form.address} onChange={update} autoComplete="address-line1" className="sm:col-span-2" />
                  <Field label="Apartment, suite (optional)" name="apartment" value={form.apartment} onChange={update} required={false} className="sm:col-span-2" />
                  <Field label="City" name="city" value={form.city} onChange={update} autoComplete="address-level2" />
                  <Field label="State / Province" name="province" value={form.province} onChange={update} autoComplete="address-level1" />
                  <Field label="Postal code" name="postalCode" value={form.postalCode} onChange={update} autoComplete="postal-code" />
                  <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={update} autoComplete="tel" />
                </div>
              </section>

              <div className="flex items-center justify-between pt-2">
                <Link href="/cart" className="text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground">
                  ← Return to bag
                </Link>
                <Button type="submit">Continue to shipping</Button>
              </div>
            </form>
          )}

          {step === "shipping" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                goTo("payment");
              }}
              className="space-y-6"
            >
              <h2 className="font-serif text-xl">Shipping method</h2>
              <RadioGroup
                value={form.shippingMethod}
                onValueChange={(v) => setForm((f) => ({ ...f, shippingMethod: v }))}
                className="gap-3"
              >
                {[
                  { id: "standard", label: "Standard", note: "5–7 business days", price: "Complimentary" },
                  { id: "express", label: "Express", note: "2–3 business days", price: "Illustrative" },
                ].map((option) => (
                  <label
                    key={option.id}
                    className={cn(
                      "flex cursor-pointer items-center justify-between border px-4 py-3.5 transition-colors",
                      form.shippingMethod === option.id ? "border-foreground" : "border-border hover:border-foreground/50",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <RadioGroupItem value={option.id} />
                      <span>
                        <span className="block text-sm font-medium">{option.label}</span>
                        <span className="block text-xs text-muted-foreground">{option.note}</span>
                      </span>
                    </span>
                    <span className="text-sm">{option.price}</span>
                  </label>
                ))}
              </RadioGroup>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => goTo("information")}
                  className="text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
                >
                  ← Information
                </button>
                <Button type="submit">Continue to payment</Button>
              </div>
            </form>
          )}

          {step === "payment" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void placeOrder();
              }}
              className="space-y-6"
            >
              <div>
                <h2 className="font-serif text-xl">Payment</h2>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Lock size={12} strokeWidth={1.5} /> Demo checkout — no payment is processed.
                </p>
              </div>
              <div className="grid gap-4">
                <Field label="Name on card" name="cardName" value={form.cardName} onChange={update} autoComplete="cc-name" />
                <Field label="Card number" name="cardNumber" value={form.cardNumber} onChange={update} autoComplete="cc-number" placeholder="4242 4242 4242 4242" />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Expiry (MM/YY)" name="cardExpiry" value={form.cardExpiry} onChange={update} autoComplete="cc-exp" placeholder="12/28" />
                  <Field label="CVC" name="cardCvc" value={form.cardCvc} onChange={update} autoComplete="cc-csc" placeholder="123" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => goTo("shipping")}
                  className="text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground"
                >
                  ← Shipping
                </button>
                <Button type="submit" disabled={placing}>
                  {placing ? "Placing order…" : "Place order"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="border border-border p-6">
          <h2 className="mb-5 font-serif text-xl">Order Summary</h2>
          {cart && <OrderSummary cart={cart} />}
        </div>
      </aside>
    </div>
  );
}
