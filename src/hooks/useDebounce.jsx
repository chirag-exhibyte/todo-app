import { useEffect, useState } from "react";

/**
 * useDebounce hook
 * Delays updating the value until after a specified delay.
 *
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay time in ms (default: 500)
 * @returns {any} - Debounced value
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler); // cleanup timeout on value change
  }, [value, delay]);

  return debouncedValue;
}
