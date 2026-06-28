import type { InputHTMLAttributes } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/** Labelled text input for forms. Extra props pass through to the <input>. */
export function Field({
  label,
  name,
  containerClassName,
  ...inputProps
}: { label: string; name: string; containerClassName?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={containerClassName}>
      <Label htmlFor={name} className="mb-1.5 block">
        {label}
      </Label>
      <Input id={name} name={name} {...inputProps} />
    </div>
  );
}
