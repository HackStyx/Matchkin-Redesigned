'use client';

import { useTypewriter } from '@/lib/hooks';

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function TypewriterText({ text, className = '', speed = 50 }: TypewriterTextProps) {
  const { displayText } = useTypewriter(text, speed);
  
  return (
    <p className={`text-lg text-gray-300 ${className}`}>
      {displayText}
      <span className="animate-pulse">|</span>
    </p>
  );
} 