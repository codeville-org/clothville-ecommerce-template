/**
 * Tiny storage abstraction for the mock provider's mutable state (cart,
 * session, addresses). Uses localStorage in the browser and an in-memory
 * fallback on the server. Mutations only ever originate from client event
 * handlers, so the server fallback never needs to persist.
 */

const memory = new Map<string, string>();

const isBrowser = typeof window !== "undefined";

export const mockStorage = {
  get(key: string): string | null {
    return isBrowser ? window.localStorage.getItem(key) : (memory.get(key) ?? null);
  },
  set(key: string, value: string): void {
    if (isBrowser) window.localStorage.setItem(key, value);
    else memory.set(key, value);
  },
  remove(key: string): void {
    if (isBrowser) window.localStorage.removeItem(key);
    else memory.delete(key);
  },
};

export function readJSON<T>(key: string, fallback: T): T {
  const raw = mockStorage.get(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  mockStorage.set(key, JSON.stringify(value));
}

/** Short, sufficiently-unique id for client-only entities (carts, addresses). */
export function genId(prefix: string): string {
  if (isBrowser && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
