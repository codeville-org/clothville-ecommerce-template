"use client";

import { create } from "zustand";
import type { Product } from "@/lib/commerce";

/**
 * Ephemeral UI state for overlays (cart drawer, mobile nav, search, quick
 * view). Not persisted — these always start closed on load.
 */
interface UIState {
  cartDrawerOpen: boolean;
  searchOpen: boolean;
  /** Product currently shown in the quick-view modal, or null. */
  quickViewProduct: Product | null;

  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  setSearchOpen: (open: boolean) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

export const useUI = create<UIState>((set) => ({
  cartDrawerOpen: false,
  searchOpen: false,
  quickViewProduct: null,

  openCartDrawer: () => set({ cartDrawerOpen: true }),
  closeCartDrawer: () => set({ cartDrawerOpen: false }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  openQuickView: (product) => set({ quickViewProduct: product }),
  closeQuickView: () => set({ quickViewProduct: null }),
}));
