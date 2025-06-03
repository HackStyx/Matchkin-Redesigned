'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only run on client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Define background color based on theme
  const bgColor = mounted && theme === 'dark' ? 'bg-black' : 'bg-white';

  return (
    <footer className={`${bgColor} py-8 pt-16 sm:pt-20 mt-10`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-8 md:space-y-0 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-gray-600 dark:text-gray-500 text-sm">
              © 2025 Matchkin. All rights reserved.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:space-x-8 text-center">
            <a href="https://github.com/HackStyx/Matchkin-Redesigned" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">About</a>
            <a href="https://github.com/HackStyx" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Contact</a>
            <a href="https://github.com/HackStyx" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Terms</a>
            <a href="https://github.com/HackStyx" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Privacy</a>
          </div>
          
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/_not.a.prince_" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <circle cx="12" cy="12" r="3"></circle>
                <circle cx="17.5" cy="6.5" r="1.5"></circle>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/princekumargupta/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://x.com/hackstyx" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 