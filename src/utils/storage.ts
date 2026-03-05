const PREFIX = "rockon:";

function makeKey(key: string) {
  return `${PREFIX}${key}`;
}

export function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(makeKey(key), JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(makeKey(key));
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

