import { useEffect, useState } from "react";

/**
 * useLocalStorage Hook
 * A custom hook to manage state synced with localStorage.
 *
 * @param {string} key - The key in localStorage
 * @param {any} initialValue - The default value if none exists in localStorage
 * @returns {[any, Function, Function]} - [storedValue, setValue, removeValue]
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("useLocalStorage error:", error);
      return initialValue;
    }
  });

  // Save to localStorage whenever value changes
  useEffect(() => {
    try {
        if(storedValue){
            localStorage.setItem(key, JSON.stringify(storedValue));
        }
    } catch (error) {
      console.error("useLocalStorage write error:", error);
    }
  }, [key, storedValue]);

  // Remove from localStorage
  const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error("useLocalStorage remove error:", error);
    }
  };

  return [storedValue, setStoredValue, removeValue];
}
