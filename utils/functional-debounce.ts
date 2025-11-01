import { useCallback, useRef } from "react";

const FunctionDebounce = (callback: (...args: any[]) => void, delay = 300) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

export default FunctionDebounce;
