
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  animation?: 'slide-up' | 'slide-down' | 'fade-in' | 'zoom-in' | 'bounce';
}

const AnimatedText = ({ 
  text, 
  className, 
  delay = 0, 
  animation = 'slide-up' 
}: AnimatedTextProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'slide-up':
        return 'transform translate-y-20 opacity-0 transition-all duration-700 ease-out';
      case 'slide-down':
        return 'transform -translate-y-20 opacity-0 transition-all duration-700 ease-out';
      case 'fade-in':
        return 'opacity-0 transition-all duration-700 ease-out';
      case 'zoom-in':
        return 'transform scale-75 opacity-0 transition-all duration-700 ease-out';
      case 'bounce':
        return 'transform translate-y-10 opacity-0 transition-all duration-700 ease-out animate-bounce';
      default:
        return 'transform translate-y-20 opacity-0 transition-all duration-700 ease-out';
    }
  };
  
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          getAnimationClass(),
          isVisible && 'transform-none opacity-100'
        )}
        style={{ transitionDelay: `${delay}s` }}
      >
        {text}
      </div>
    </div>
  );
};

export default AnimatedText;
