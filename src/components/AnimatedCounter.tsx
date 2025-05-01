
import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  startOnView?: boolean;
  suffix?: string;
  className?: string;
}

const AnimatedCounter = ({
  end,
  duration = 2000,
  startOnView = true,
  suffix = '',
  className = '',
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (startOnView) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            startCounting();
            setHasAnimated(true);
          }
        },
        { threshold: 0.1 }
      );

      if (countRef.current) {
        observer.observe(countRef.current);
      }

      return () => {
        if (countRef.current) {
          observer.unobserve(countRef.current);
        }
      };
    } else {
      startCounting();
    }
  }, [startOnView]);

  const startCounting = () => {
    const stepTime = Math.abs(Math.floor(duration / end));
    const startTime = new Date().getTime();

    const updateCounter = () => {
      const now = new Date().getTime();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  return (
    <div ref={countRef} className={className}>
      {count}
      {suffix}
    </div>
  );
};

export default AnimatedCounter;
