"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/lib/store/auth";
import { Field } from "@/components/common/field";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const router = useRouter();
  const register = useAuth((s) => s.register);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Your account has been created");
      router.push("/account");
    } catch {
      toast.error("Could not create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm">
      <h1 className="text-center font-serif text-3xl">Create account</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Join the house for early access and private previews.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="First name" name="firstName" autoComplete="given-name" required value={form.firstName} onChange={update("firstName")} />
          <Field label="Last name" name="lastName" autoComplete="family-name" required value={form.lastName} onChange={update("lastName")} />
        </div>
        <Field label="Email" name="email" type="email" autoComplete="email" required value={form.email} onChange={update("email")} />
        <Field label="Password" name="password" type="password" autoComplete="new-password" required value={form.password} onChange={update("password")} />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating…" : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
