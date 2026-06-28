"use client";

import { useState } from "react";
import type { Facets } from "@/lib/commerce";
import { useShopFilters } from "@/lib/shop/use-shop-filters";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils/cn";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-6 first:pt-0">
      <h3 className="text-xs font-medium uppercase tracking-[0.15em]">{title}</h3>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function CheckRow({
  checked,
  onToggle,
  label,
  count,
  swatch,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  count?: number;
  swatch?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5">
      <Checkbox checked={checked} onCheckedChange={onToggle} />
      {swatch && (
        <span className="h-3.5 w-3.5 rounded-full border border-border" style={{ backgroundColor: swatch }} />
      )}
      <span className="flex-1 text-foreground/80">{label}</span>
      {typeof count === "number" && <span className="text-xs text-muted-foreground">{count}</span>}
    </label>
  );
}

function PriceFilter({
  min,
  max,
  initial,
  onCommit,
}: {
  min: number;
  max: number;
  initial: [number, number];
  onCommit: (low: number, high: number) => void;
}) {
  const [range, setRange] = useState<[number, number]>(initial);
  return (
    <div>
      <Slider
        min={min}
        max={max}
        step={10}
        minStepsBetweenThumbs={1}
        value={range}
        onValueChange={(v) => setRange([v[0], v[1]])}
        onValueCommit={(v) => onCommit(v[0], v[1])}
        aria-label="Price range"
      />
      <div className="mt-3 flex items-center justify-between text-xs tabular-nums text-muted-foreground">
        <span>${range[0]}</span>
        <span>${range[1]}</span>
      </div>
    </div>
  );
}

/** The full set of catalog filters; shared by the desktop sidebar and mobile sheet. */
export function FilterPanel({ facets, className }: { facets: Facets; className?: string }) {
  const { get, getList, toggleInList, setParam, setParams } = useShopFilters();

  const selectedCategories = getList("category");
  const selectedSizes = getList("size");
  const selectedColors = getList("color");

  const minBound = Math.floor(facets.priceRange.min / 100);
  const maxBound = Math.ceil(facets.priceRange.max / 100);
  const curMin = get("minPrice");
  const curMax = get("maxPrice");
  const initialRange: [number, number] = [
    curMin ? Number(curMin) : minBound,
    curMax ? Number(curMax) : maxBound,
  ];

  return (
    <div className={cn("text-sm", className)}>
      {facets.categories.length > 0 && (
        <Group title="Category">
          {facets.categories.map((c) => (
            <CheckRow
              key={c.value}
              label={c.value}
              count={c.count}
              checked={selectedCategories.includes(c.value)}
              onToggle={() => toggleInList("category", c.value)}
            />
          ))}
        </Group>
      )}

      {facets.sizes.length > 0 && (
        <Group title="Size">
          {facets.sizes.map((s) => (
            <CheckRow
              key={s.value}
              label={s.value}
              count={s.count}
              checked={selectedSizes.includes(s.value)}
              onToggle={() => toggleInList("size", s.value)}
            />
          ))}
        </Group>
      )}

      {facets.colors.length > 0 && (
        <Group title="Colour">
          {facets.colors.map((c) => (
            <CheckRow
              key={c.value}
              label={c.value}
              count={c.count}
              swatch={c.hex}
              checked={selectedColors.includes(c.value)}
              onToggle={() => toggleInList("color", c.value)}
            />
          ))}
        </Group>
      )}

      {maxBound > minBound && (
        <Group title="Price">
          <PriceFilter
            key={`${curMin}:${curMax}`}
            min={minBound}
            max={maxBound}
            initial={initialRange}
            onCommit={(low, high) =>
              setParams({
                minPrice: low <= minBound ? null : String(low),
                maxPrice: high >= maxBound ? null : String(high),
              })
            }
          />
        </Group>
      )}

      <Group title="Availability">
        <CheckRow
          label="In stock only"
          checked={get("inStock") === "1"}
          onToggle={() => setParam("inStock", get("inStock") === "1" ? null : "1")}
        />
      </Group>
    </div>
  );
}
