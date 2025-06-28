import { useRef } from 'react';

export default function useDebouncedFunction<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const ref = useRef<number | null>(null);

  return (...args: Parameters<T>) => {
    if (ref.current) {
      clearTimeout(ref.current);
    }

    ref.current = window.setTimeout(() => {
      func(...args);
      ref.current = null;
    }, delay);
  };
}
