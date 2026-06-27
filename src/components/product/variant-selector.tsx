"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/commerce";
import { cn } from "@/lib/utils/cn";

export type OptionSelection = Record<string, string>;

/**
 * Manage variant selection for a product. Returns the currently-selected
 * option map and the resolved variant (if the combination exists). Shared by
 * the quick-view modal and the PDP.
 */
export function useVariantSelection(product: Product) {
  const [selected, setSelected] = useState<OptionSelection>(() =>
    Object.fromEntries(product.options.map((o) => [o.name, o.values[0]?.value ?? ""])),
  );

  const variant = useMemo(
    () => product.variants.find((v) => v.selectedOptions.every((o) => selected[o.name] === o.value)),
    [product.variants, selected],
  );

  const select = (name: string, value: string) => setSelected((s) => ({ ...s, [name]: value }));

  return { selected, select, variant };
}

function isColourOption(name: string): boolean {
  return name.toLowerCase().startsWith("colour") || name.toLowerCase().startsWith("color");
}

/** Is there an available variant with `value` for `optionName`, given the rest of the selection? */
function valueAvailable(
  product: Product,
  optionName: string,
  value: string,
  selected: OptionSelection,
): boolean {
  return product.variants.some(
    (v) =>
      v.available &&
      v.selectedOptions.every((o) =>
        o.name === optionName ? o.value === value : selected[o.name] === o.value,
      ),
  );
}

/** Colour swatches + size/option buttons with availability handling. */
export function VariantSelector({
  product,
  selected,
  onSelect,
  className,
}: {
  product: Product;
  selected: OptionSelection;
  onSelect: (name: string, value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("space-y-5", className)}>
      {product.options.map((option) => {
        const colour = isColourOption(option.name);
        return (
          <div key={option.id}>
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{option.name}</p>
              <p className="text-xs text-foreground">{selected[option.name]}</p>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {option.values.map((val) => {
                const isSelected = selected[option.name] === val.value;
                const available = valueAvailable(product, option.name, val.value, selected);

                if (colour && val.hex) {
                  return (
                    <button
                      key={val.value}
                      type="button"
                      onClick={() => onSelect(option.name, val.value)}
                      aria-label={val.value}
                      aria-pressed={isSelected}
                      disabled={!available}
                      style={{ backgroundColor: val.hex }}
                      className={cn(
                        "h-8 w-8 rounded-full border transition",
                        isSelected
                          ? "border-transparent ring-2 ring-foreground ring-offset-2 ring-offset-background"
                          : "border-border",
                        !available && "opacity-30",
                      )}
                    />
                  );
                }

                return (
                  <button
                    key={val.value}
                    type="button"
                    onClick={() => onSelect(option.name, val.value)}
                    aria-pressed={isSelected}
                    disabled={!available}
                    className={cn(
                      "min-w-10 border px-3 py-2 text-xs uppercase tracking-[0.08em] transition",
                      isSelected
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-foreground hover:border-foreground",
                      !available && "cursor-not-allowed opacity-30 line-through hover:border-border",
                    )}
                  >
                    {val.value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
