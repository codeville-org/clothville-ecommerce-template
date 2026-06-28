"use client";

import { useState } from "react";
import { toast } from "sonner";
import { commerce } from "@/lib/commerce";
import { Field } from "@/components/common/field";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const INITIAL = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      await commerce.submitContact(form);
      toast.success("Thank you — we'll be in touch shortly.");
      setForm(INITIAL);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" value={form.name} onChange={update("name")} required />
        <Field label="Email" name="email" type="email" value={form.email} onChange={update("email")} required />
      </div>
      <Field label="Subject" name="subject" value={form.subject} onChange={update("subject")} required={false} />
      <div>
        <Label htmlFor="message" className="mb-1.5 block">
          Message
        </Label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={update("message")}
          required
          rows={5}
          className="w-full border border-input bg-transparent px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/70 focus-visible:border-foreground focus-visible:outline-none"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
