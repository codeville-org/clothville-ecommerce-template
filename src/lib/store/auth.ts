"use client";

import { create } from "zustand";
import { commerce } from "@/lib/commerce";
import type { Customer, LoginInput, ProfileUpdateInput, RegisterInput } from "@/lib/commerce";

/**
 * UI-level auth state, delegating to the commerce provider. With the mock
 * provider any credentials succeed and the session lives in localStorage; a
 * real provider swaps in its own auth without changing the account UI.
 */
interface AuthState {
  customer: Customer | null;
  /** True once the initial session lookup has completed. */
  ready: boolean;
  init: () => Promise<void>;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (input: ProfileUpdateInput) => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  customer: null,
  ready: false,

  async init() {
    const customer = await commerce.getCurrentCustomer();
    set({ customer, ready: true });
  },
  async login(input) {
    set({ customer: await commerce.login(input) });
  },
  async register(input) {
    set({ customer: await commerce.register(input) });
  },
  async logout() {
    await commerce.logout();
    set({ customer: null });
  },
  async updateProfile(input) {
    set({ customer: await commerce.updateProfile(input) });
  },
}));
