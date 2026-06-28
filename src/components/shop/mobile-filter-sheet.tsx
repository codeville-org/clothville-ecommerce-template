"use client";

import { SlidersHorizontal } from "lucide-react";
import type { Facets } from "@/lib/commerce";
import { useShopFilters } from "@/lib/shop/use-shop-filters";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterPanel } from "./filter-panel";

/** "Filters" button + bottom sheet, shown below the lg breakpoint. */
export function MobileFilterSheet({ facets }: { facets: Facets }) {
  const { clearAll } = useShopFilters();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 lg:hidden">
          <SlidersHorizontal size={14} strokeWidth={1.5} />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-2">
          <FilterPanel facets={facets} />
        </div>
        <SheetFooter className="flex flex-row gap-2">
          <Button variant="outline" className="flex-1" onClick={clearAll}>
            Clear all
          </Button>
          <SheetClose asChild>
            <Button className="flex-1">View results</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
