import type { CommerceProvider } from "./provider";
import { mockProvider } from "./providers/mock";

/**
 * Selects the active commerce backend. Swapping backends is a one-line change:
 * implement CommerceProvider in a new file under providers/, register it in the
 * switch below, and set NEXT_PUBLIC_COMMERCE_PROVIDER in your environment.
 */

/** Add your provider's name to this union as you implement it. */
export type ProviderName = "mock"; // | "medusa" | "supabase" | "custom"

const ACTIVE = (process.env.NEXT_PUBLIC_COMMERCE_PROVIDER ?? "mock") as ProviderName;

function selectProvider(name: ProviderName): CommerceProvider {
  switch (name) {
    // case "medusa": return medusaProvider;
    // case "supabase": return supabaseProvider;
    case "mock":
    default:
      return mockProvider;
  }
}

/** The single active provider instance used throughout the app. */
export const commerce: CommerceProvider = selectProvider(ACTIVE);
