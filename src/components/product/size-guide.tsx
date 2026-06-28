"use client";

import type { ReactNode } from "react";
import type { SizeGuide as SizeGuideData } from "@/lib/commerce";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/** Size-guide table in a modal. `trigger` is the element that opens it. */
export function SizeGuide({ guide, trigger }: { guide: SizeGuideData; trigger: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl p-6">
        <DialogTitle>Size Guide</DialogTitle>
        {guide.note && <DialogDescription className="mt-1">{guide.note}</DialogDescription>}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-[0.1em] text-muted-foreground">
                {guide.columns.map((col) => (
                  <th key={col} className="py-2 pr-4 font-medium">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guide.rows.map((row) => (
                <tr key={row.label} className="border-b border-border/60">
                  <td className="py-2.5 pr-4 font-medium">{row.label}</td>
                  {row.values.map((value, i) => (
                    <td key={i} className="py-2.5 pr-4 text-muted-foreground">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
