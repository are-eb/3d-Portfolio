import { useEffect, useRef, useState } from 'react';

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.1,
        ...options,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
};

export default useInView;
