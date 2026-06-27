"use client";

import { create } from "zustand";

/**
 * Ephemeral UI state for overlays (cart drawer, mobile nav, search, quick
 * view). Not persisted — these always start closed on load.
 */
interface UIState {
  cartDrawerOpen: boolean;
  mobileNavOpen: boolean;
  searchOpen: boolean;
  /** Product slug currently shown in the quick-view modal, or null. */
  quickViewSlug: string | null;

  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  setMobileNavOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  openQuickView: (slug: string) => void;
  closeQuickView: () => void;
}

export const useUI = create<UIState>((set) => ({
  cartDrawerOpen: false,
  mobileNavOpen: false,
  searchOpen: false,
  quickViewSlug: null,

  openCartDrawer: () => set({ cartDrawerOpen: true }),
  closeCartDrawer: () => set({ cartDrawerOpen: false }),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  openQuickView: (slug) => set({ quickViewSlug: slug }),
  closeQuickView: () => set({ quickViewSlug: null }),
}));
