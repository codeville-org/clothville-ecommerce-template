"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/**
 * Client wishlist store — a persisted set of product ids. Purely client-side;
 * extend it to sync through the provider if your backend supports wishlists.
 */
interface WishlistState {
  ids: string[];
  toggle: (productId: string) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle(productId) {
        const { ids } = get();
        set({
          ids: ids.includes(productId)
            ? ids.filter((id) => id !== productId)
            : [...ids, productId],
        });
      },
      add(productId) {
        if (!get().ids.includes(productId)) set({ ids: [...get().ids, productId] });
      },
      remove(productId) {
        set({ ids: get().ids.filter((id) => id !== productId) });
      },
      has(productId) {
        return get().ids.includes(productId);
      },
      clear() {
        set({ ids: [] });
      },
    }),
    {
      name: "cdv-wishlist",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
