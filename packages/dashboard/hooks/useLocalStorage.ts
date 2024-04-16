import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

export type UseLocalStorage<T> = [T, Dispatch<SetStateAction<T>>];
export default function useLocalStorage<T>(
  key: string,
  initialValue: T | ((storedValue?: T) => T)
): UseLocalStorage<T> {
  const saveToLocalStorage = (valueToStore: T | null) => {
    try {
      if (typeof valueToStore === 'string') {
        localStorage.setItem(key, valueToStore);
      } else if (typeof valueToStore === 'undefined') {
        localStorage.setItem(key, '');
      } else {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch {
      console.warn(`Could not save ${key} to localStorage`);
    }
  };

  function getValue(value: T | null, initOrCb: SetStateAction<T | null>): T {
    if (initOrCb instanceof Function) {
      const newValue = initOrCb(value);
      if (!newValue) {
        throw new Error('Empty value');
      }
      saveToLocalStorage(newValue);
      return newValue;
    }
    if (!value && !initOrCb) {
      throw new Error('>>>>> Empty value');
    }
    return value ?? (initOrCb as T);
  }

  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    let result: T;
    const item = localStorage.getItem(key);
    if (item === null) {
      result = getValue(null, initialValue);
    } else {
      try {
        const parsed = JSON.parse(item);
        if (!parsed) throw new Error('Empty value');
        result = parsed;
      } catch {
        // Casting to T (which should resolve to string) because JSON.parse would
        // throw an error if "foo" was passed, but properly casting "true" or "1"
        // to their respective types
        result = item as unknown as T;
      }

      result = getValue(result, initialValue);
    }
    setStoredValue(result);
  }, []);

  const setValue = (value: SetStateAction<T>) => {
    const valueToStore = value instanceof Function ? value(storedValue as T) : value;
    setStoredValue(valueToStore);
    saveToLocalStorage(valueToStore as T);
  };

  return [storedValue, setValue];
}
