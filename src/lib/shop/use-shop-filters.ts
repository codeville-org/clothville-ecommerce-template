"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Read and mutate the PLP filter/sort/page state, which lives entirely in the
 * URL search params so the server can render results (and they stay
 * shareable/bookmarkable). Mutations reset pagination unless told otherwise.
 */
export function useShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const push = useCallback(
    (next: URLSearchParams) => {
      const qs = next.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  const get = useCallback((key: string) => searchParams.get(key) ?? "", [searchParams]);

  const getList = useCallback(
    (key: string) => {
      const value = searchParams.get(key);
      return value ? value.split(",").filter(Boolean) : [];
    },
    [searchParams],
  );

  const toggleInList = useCallback(
    (key: string, value: string) => {
      const set = new Set(getList(key));
      if (set.has(value)) set.delete(value);
      else set.add(value);
      const next = new URLSearchParams(searchParams.toString());
      if (set.size) next.set(key, [...set].join(","));
      else next.delete(key);
      next.delete("page");
      push(next);
    },
    [getList, searchParams, push],
  );

  const setParam = useCallback(
    (key: string, value: string | null, opts?: { resetPage?: boolean }) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
      if (opts?.resetPage !== false && key !== "page") next.delete("page");
      push(next);
    },
    [searchParams, push],
  );

  const setParams = useCallback(
    (entries: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(entries)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      }
      next.delete("page");
      push(next);
    },
    [searchParams, push],
  );

  const clearAll = useCallback(() => router.push(pathname, { scroll: false }), [router, pathname]);

  return { searchParams, get, getList, toggleInList, setParam, setParams, clearAll };
}
