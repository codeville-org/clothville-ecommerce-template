"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/store/auth";
import { Field } from "@/components/common/field";
import { Button } from "@/components/ui/button";

/** Edit the signed-in customer's profile. */
export function ProfileForm() {
  const customer = useAuth((s) => s.customer);
  const updateProfile = useAuth((s) => s.updateProfile);
  const [form, setForm] = useState({
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    phone: customer?.phone ?? "",
  });
  const [loading, setLoading] = useState(false);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      await updateProfile(form);
      toast.success("Profile updated");
    } catch {
      toast.error("Could not update your profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="First name" name="firstName" value={form.firstName} onChange={update("firstName")} required />
        <Field label="Last name" name="lastName" value={form.lastName} onChange={update("lastName")} required />
      </div>
      <Field label="Email" name="email" type="email" value={customer?.email ?? ""} disabled readOnly />
      <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={update("phone")} required={false} />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
