
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedText = ({ text, className, delay = 0 }: AnimatedTextProps) => {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div 
        className="transform animate-slide-up"
        style={{ animationDelay: `${delay}s` }}
      >
        {text}
      </div>
    </div>
  );
};

export default AnimatedText;
