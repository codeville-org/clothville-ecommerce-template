"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { commerce, type Cart } from "@/lib/commerce";

/**
 * Client cart store. The store is the UI's source of truth, but ALL mutations
 * are delegated to the active commerce provider — so a server-backed cart works
 * without any component changes. Only the cart id is persisted here; the cart
 * contents live wherever the provider keeps them (localStorage for `mock`).
 */
interface CartState {
  cartId: string | null;
  cart: Cart | null;
  isLoading: boolean;
  /** True once the persisted cart id has rehydrated and the cart is loaded. */
  hydrated: boolean;

  /** Load the persisted cart (call once on mount). */
  init: () => Promise<void>;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  applyDiscount: (code: string) => Promise<void>;
  removeDiscount: () => Promise<void>;
  /** Empty the cart (e.g. after a completed checkout). */
  clearCart: () => Promise<void>;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      cart: null,
      isLoading: false,
      hydrated: false,

      async init() {
        const id = get().cartId;
        if (id) {
          const cart = await commerce.getCart(id);
          if (cart) {
            set({ cart, hydrated: true });
            return;
          }
        }
        set({ hydrated: true });
      },

      async addItem(variantId, quantity = 1) {
        const id = await ensureCart(get, set);
        set({ isLoading: true });
        try {
          const cart = await commerce.addLine(id, { variantId, quantity });
          set({ cart, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      async updateItem(lineId, quantity) {
        const id = get().cartId;
        if (!id) return;
        set({ isLoading: true });
        const cart = await commerce.updateLine(id, lineId, quantity);
        set({ cart, isLoading: false });
      },

      async removeItem(lineId) {
        const id = get().cartId;
        if (!id) return;
        set({ isLoading: true });
        const cart = await commerce.removeLine(id, lineId);
        set({ cart, isLoading: false });
      },

      async applyDiscount(code) {
        const id = await ensureCart(get, set);
        const cart = await commerce.applyDiscount(id, code);
        set({ cart });
      },

      async removeDiscount() {
        const id = get().cartId;
        if (!id) return;
        const cart = await commerce.removeDiscount(id);
        set({ cart });
      },

      async clearCart() {
        const fresh = await commerce.createCart();
        set({ cartId: fresh.id, cart: fresh });
      },
    }),
    {
      name: "clv-cart",
      storage: createJSONStorage(() => localStorage),
      // Only the cart id is persisted; contents are re-fetched from the provider.
      partialize: (state) => ({ cartId: state.cartId }),
    },
  ),
);

type Get = () => CartState;
type Set = (partial: Partial<CartState>) => void;

/** Ensure a cart exists, creating one on first use. */
async function ensureCart(get: Get, set: Set): Promise<string> {
  const existingId = get().cartId;
  if (existingId) {
    const existing = await commerce.getCart(existingId);
    if (existing) return existingId;
  }
  const created = await commerce.createCart();
  set({ cartId: created.id, cart: created });
  return created.id;
}

/** Convenience selector for the header cart badge. */
export const selectItemCount = (state: CartState): number => state.cart?.itemCount ?? 0;
