import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (callback: () => void) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) callback();
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [callback]);

  return {
    ref,
  };
};
