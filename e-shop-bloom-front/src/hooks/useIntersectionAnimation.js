import { useEffect, useRef } from "react";

export function useIntersectionAnimation(animationClass = "animate-fade-slide", threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add(animationClass);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [animationClass, threshold]);

  return ref;
}
