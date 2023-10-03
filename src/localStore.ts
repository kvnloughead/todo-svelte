import { writable } from "svelte/store";

export function localStore<T>(
  key: string,
  defaultValue: T,
  cleanup?: Function,
) {
  const toString = (value: T) => JSON.stringify(value, null, 2);

  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, toString(defaultValue));
  }

  const storedValue = localStorage.getItem(key);
  let saved: T;
  try {
    saved = JSON.parse(storedValue!);
  } catch {
    saved = defaultValue;
    localStorage.setItem(key, toString(saved));
  }

  const { subscribe, set, update } = writable<T>(saved);

  return {
    subscribe,
    set: (value: T) => {
      localStorage.setItem(key, toString(value));
      return set(value);
    },
    update,
    clear: () => {
      localStorage.removeItem(key);
      cleanup && set(cleanup());
    },
  };
}
