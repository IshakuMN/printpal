const isBrowser = () => typeof window !== "undefined";

const STORAGE_KEYS = {
  cart: "inksmith.cart.v1",
  orders: "inksmith.orders.v1",
} as const;

export function readStorage<T>(key: keyof typeof STORAGE_KEYS, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS[key]);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: keyof typeof STORAGE_KEYS, value: T) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
  } catch {
    // Storage may be full or unavailable; fail silently in the MVP.
  }
}

export function clearStorage(key: keyof typeof STORAGE_KEYS) {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEYS[key]);
  } catch {
    // ignore
  }
}
