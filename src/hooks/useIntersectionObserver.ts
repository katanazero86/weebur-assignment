import { useEffect, useRef } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useIntersectionObserver = <T extends Element>(
  callback: () => void,
  options: IntersectionObserverOptions = {},
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) callback();
      });
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return {
    ref,
  } as const;
};
