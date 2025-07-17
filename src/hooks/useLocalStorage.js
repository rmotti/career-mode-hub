import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      } else {
        // só retorna o initialValue, mas NÃO salva ainda
        return initialValue;
      }
    } catch (error) {
      console.error(`Erro ao ler localStorage "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const current = localStorage.getItem(key);
      if (current === null) {
        localStorage.setItem(key, JSON.stringify(initialValue));
      }
    } catch (error) {
      console.error(`Erro ao inicializar localStorage "${key}":`, error);
    }
  }, [key, initialValue]);

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erro ao salvar localStorage "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
