import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEvent<T>(callback: (...args: any[]) => T) {
  const inner = useRef(callback);
  inner.current = callback;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const outer = useRef((...args: any[]): T => {
    return inner.current(...args);
  })

  return outer.current;
}
