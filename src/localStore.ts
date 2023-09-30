import { writable } from 'svelte/store';
import type { JsonType } from './types/json.type';

export const localStore = (key: string, defaultValue: JsonType) => {
  const toString = (value: JsonType) => JSON.stringify(value, null, 2);
  const toObj = JSON.parse;

  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, toString(defaultValue));
  }

  const saved = toObj(localStorage.getItem(key));
  const { subscribe, set, update } = writable(saved);

  return {
    subscribe,
    set: (value: JsonType) => {
      localStorage.setItem(key, toString(value));
      return set(value);
    },
    update,
    clear: () => {
      localStorage.removeItem(key);
      return set(null);
    },
  };
};
