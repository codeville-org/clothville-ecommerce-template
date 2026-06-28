"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { commerce, type Address, type AddressInput } from "@/lib/commerce";
import { Field } from "@/components/common/field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const EMPTY: AddressInput = {
  firstName: "",
  lastName: "",
  line1: "",
  line2: "",
  city: "",
  province: "",
  postalCode: "",
  country: "United States",
  countryCode: "US",
  phone: "",
};

function AddressCard({
  address,
  onEdit,
  onRemove,
}: {
  address: Address;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="border border-border p-5 text-sm">
      <div className="flex items-center justify-between">
        <p className="font-medium">
          {address.firstName} {address.lastName}
        </p>
        {address.isDefault && <Badge variant="muted">Default</Badge>}
      </div>
      <address className="mt-2 not-italic leading-relaxed text-muted-foreground">
        {address.line1}
        {address.line2 ? `, ${address.line2}` : ""}
        <br />
        {address.city}, {address.province} {address.postalCode}
        <br />
        {address.country}
        {address.phone ? (
          <>
            <br />
            {address.phone}
          </>
        ) : null}
      </address>
      <div className="mt-4 flex gap-4 text-xs uppercase tracking-[0.1em]">
        <button type="button" onClick={onEdit} className="underline-offset-4 hover:underline">
          Edit
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="text-muted-foreground transition-colors hover:text-destructive"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

function AddressForm({
  address,
  onCancel,
  onSaved,
}: {
  address?: Address;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<AddressInput>(address ?? EMPTY);
  const [loading, setLoading] = useState(false);

  const update = (key: keyof AddressInput) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      if (address) await commerce.updateAddress(address.id, form);
      else await commerce.addAddress(form);
      toast.success("Address saved");
      onSaved();
    } catch {
      toast.error("Could not save the address.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <h2 className="font-serif text-xl">{address ? "Edit address" : "Add address"}</h2>
      <div className="grid grid-cols-2 gap-4">
        <Field label="First name" name="firstName" value={form.firstName} onChange={update("firstName")} required />
        <Field label="Last name" name="lastName" value={form.lastName} onChange={update("lastName")} required />
      </div>
      <Field label="Address" name="line1" value={form.line1} onChange={update("line1")} required />
      <Field label="Apartment, suite (optional)" name="line2" value={form.line2 ?? ""} onChange={update("line2")} required={false} />
      <div className="grid grid-cols-2 gap-4">
        <Field label="City" name="city" value={form.city} onChange={update("city")} required />
        <Field label="State / Province" name="province" value={form.province ?? ""} onChange={update("province")} required={false} />
        <Field label="Postal code" name="postalCode" value={form.postalCode} onChange={update("postalCode")} required />
        <Field label="Country" name="country" value={form.country} onChange={update("country")} required />
      </div>
      <Field label="Phone" name="phone" type="tel" value={form.phone ?? ""} onChange={update("phone")} required={false} />
      <div className="flex gap-3 pt-1">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : "Save address"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

/** Saved addresses with add/edit/remove, backed by the provider. */
export function AddressesView() {
  const [addresses, setAddresses] = useState<Address[] | null>(null);
  const [editing, setEditing] = useState<Address | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    commerce.getAddresses().then(setAddresses);
  }, []);

  async function refresh() {
    setAddresses(await commerce.getAddresses());
  }

  async function remove(id: string) {
    await commerce.removeAddress(id);
    toast.success("Address removed");
    await refresh();
  }

  if (addresses === null) return <Skeleton className="h-40 w-full" />;

  if (adding || editing) {
    return (
      <AddressForm
        address={editing ?? undefined}
        onCancel={() => {
          setAdding(false);
          setEditing(null);
        }}
        onSaved={() => {
          setAdding(false);
          setEditing(null);
          void refresh();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {addresses.length === 0 ? (
        <p className="text-sm text-muted-foreground">You have no saved addresses.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => setEditing(address)}
              onRemove={() => remove(address.id)}
            />
          ))}
        </div>
      )}
      <Button variant="outline" onClick={() => setAdding(true)}>
        Add address
      </Button>
    </div>
  );
}
