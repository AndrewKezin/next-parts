export const getDebounceFunc = <T extends (...args: any[]) => any>(func: T, delay: number) => {
  let timeOut: number | null = null;

  return (...args: Parameters<T>) => {
    if (timeOut) {
      clearTimeout(timeOut);
    }

    timeOut = window.setTimeout(() => {
      func(...args);
      timeOut = null;
    }, delay);
  };
};
