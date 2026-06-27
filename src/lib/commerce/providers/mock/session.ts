import type {
  Address,
  AddressInput,
  Customer,
  LoginInput,
  Order,
  ProfileUpdateInput,
  RegisterInput,
} from "@/lib/commerce/types";
import { demoAddresses, demoCustomer, demoOrders } from "./data";
import { genId, readJSON, writeJSON, mockStorage } from "./storage";

/**
 * UI-level auth + account state for the mock provider. Credentials are NOT
 * validated (any email/password signs you in as the demo customer) — this is
 * a frontend template, not a real auth system. A real provider replaces these
 * methods with calls to its own auth/customer APIs.
 */

const SESSION_KEY = "cdv_session";
const ADDRESS_KEY = "cdv_addresses";

export function getCurrentCustomer(): Customer | null {
  return readJSON<Customer | null>(SESSION_KEY, null);
}

export function login(input: LoginInput): Customer {
  const customer: Customer = { ...demoCustomer, email: input.email || demoCustomer.email };
  writeJSON(SESSION_KEY, customer);
  return customer;
}

export function register(input: RegisterInput): Customer {
  const customer: Customer = {
    id: genId("cus"),
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    createdAt: new Date().toISOString(),
  };
  writeJSON(SESSION_KEY, customer);
  return customer;
}

export function logout(): void {
  mockStorage.remove(SESSION_KEY);
}

export function updateProfile(input: ProfileUpdateInput): Customer {
  const current = getCurrentCustomer() ?? demoCustomer;
  const updated: Customer = { ...current, ...input };
  writeJSON(SESSION_KEY, updated);
  return updated;
}

function loadAddresses(): Address[] {
  return readJSON<Address[]>(ADDRESS_KEY, demoAddresses);
}

export function getAddresses(): Address[] {
  return loadAddresses();
}

export function addAddress(input: AddressInput): Address {
  const addresses = loadAddresses();
  const address: Address = { ...input, id: genId("addr") };
  // First address (or one flagged default) becomes the sole default.
  if (address.isDefault || addresses.length === 0) {
    addresses.forEach((a) => (a.isDefault = false));
    address.isDefault = true;
  }
  addresses.push(address);
  writeJSON(ADDRESS_KEY, addresses);
  return address;
}

export function updateAddress(id: string, input: Partial<AddressInput>): Address {
  const addresses = loadAddresses();
  const index = addresses.findIndex((a) => a.id === id);
  if (index === -1) throw new Error(`Unknown address: ${id}`);
  const updated = { ...addresses[index], ...input };
  if (input.isDefault) addresses.forEach((a) => (a.isDefault = false));
  addresses[index] = updated;
  writeJSON(ADDRESS_KEY, addresses);
  return updated;
}

export function removeAddress(id: string): void {
  const addresses = loadAddresses().filter((a) => a.id !== id);
  if (addresses.length && !addresses.some((a) => a.isDefault)) {
    addresses[0].isDefault = true;
  }
  writeJSON(ADDRESS_KEY, addresses);
}

export function getOrders(): Order[] {
  return demoOrders;
}

export function getOrder(id: string): Order | null {
  return demoOrders.find((o) => o.id === id) ?? null;
}
