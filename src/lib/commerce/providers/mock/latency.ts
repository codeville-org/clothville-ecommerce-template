/**
 * Optional artificial latency so loading skeletons are demonstrable in the
 * mock provider. Defaults to 0 (instant). Set NEXT_PUBLIC_MOCK_LATENCY (ms)
 * to simulate a slower backend during development.
 */
const DEFAULT_LATENCY = Number(process.env.NEXT_PUBLIC_MOCK_LATENCY ?? 0);

export function delay(ms: number = DEFAULT_LATENCY): Promise<void> {
  return ms > 0 ? new Promise((resolve) => setTimeout(resolve, ms)) : Promise.resolve();
}
