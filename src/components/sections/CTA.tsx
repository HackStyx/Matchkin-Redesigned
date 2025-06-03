'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { fadeIn, slideUp } from '@/lib/animations';
import { BackgroundLines } from '@/components/ui/background-lines';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export function CTA() {
  const { theme } = useTheme();
  const [bgColor, setBgColor] = useState("bg-white dark:bg-black");
  
  useEffect(() => {
    setBgColor(theme === 'dark' ? 'bg-black' : 'bg-white');
  }, [theme]);

  return (
    <section className="relative mb-20 sm:mb-24">
      <BackgroundLines 
        className="pt-6 pb-4 h-[260px] flex items-center" 
        bgColor={bgColor}
      >
        <div className="container mx-auto px-6 pt-8 relative z-10">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-gray-900 dark:text-white">
              READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500">EXPERIENCE</span> SEAMLESS MATCHING?
            </h2>
            <p className="text-base text-gray-800 dark:text-amber-100/80 max-w-xl mx-auto mb-8">
              Whether finding talent or your next project, MatchKin simplifies the connection.
            </p>
            
            <motion.div className="flex flex-wrap justify-center gap-4" variants={slideUp}>
              <Link href="/onboarding/consultant">
                <Button variant="neopop" size="lg" className="px-6">
                  Find Your Consultant
                </Button>
              </Link>
              <Link href="/onboarding/client">
                <Button variant="neopop" size="lg" className="px-6">
                  Find Your Project
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </BackgroundLines>
    </section>
  );
} 