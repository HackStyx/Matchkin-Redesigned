import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export function useScrollReveal(options = { once: true, amount: 0.3 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, options);
  
  return { ref, isInView };
}

export function useTypewriter(text: string, speed = 50) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);
  
  return { displayText, isComplete: currentIndex >= text.length };
} 