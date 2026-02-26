"use client";

import { useEffect, useState } from "react";

/**
 * Returns a value that updates after `delay` ms of no changes.
 * Use for search inputs so the API is called after the user stops typing.
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
