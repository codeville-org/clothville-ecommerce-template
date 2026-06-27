"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Returns `false` during SSR and the initial hydration render, then `true`
 * once running on the client. Use it to gate client-only values (theme, cart
 * count, localStorage state) without triggering a hydration mismatch — and
 * without the discouraged setState-in-effect pattern.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
