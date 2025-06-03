'use client';

import { motion } from 'framer-motion';
import { staggerContainer, slideUp, scaleIn } from '@/lib/animations';
import { AuroraBackground } from '@/components/ui/aurora-background';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative">
      <AuroraBackground className="h-screen flex items-center justify-center">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-5xl mx-auto text-center flex flex-col justify-center"
          >
            <motion.div
              variants={slideUp}
              className="relative pt-2"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="relative font-serif font-normal tracking-tighter leading-[0.9] mb-5 pt-6"
              >
                <span className="block text-[3.5rem] md:text-[5rem] lg:text-[6rem] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80">
                  crafted for
                </span>
                <span className="block text-[3.5rem] md:text-[5rem] lg:text-[6rem] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 pb-6">
                  professionalism
                </span>
                
                {/* Subtle shadow for depth */}
                <div className="absolute inset-0 blur-sm opacity-30 -z-10 font-serif font-normal tracking-tighter leading-[0.9]">
                  <span className="block text-[3.5rem] md:text-[5rem] lg:text-[6rem] text-white/20">
                    crafted for
                  </span>
                  <span className="block text-[3.5rem] md:text-[5rem] lg:text-[6rem] text-white/20 pb-6">
                    professionalism
                  </span>
                </div>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-3 mb-6 relative"
              >
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/80 font-extralight tracking-wide mx-auto px-2">
                  AI-powered matching for seamless collaboration. Find the perfect fit for your consulting needs.
                </p>
              </motion.div>
            </motion.div>
            
            {/* CTA buttons */}
            <motion.div
              variants={scaleIn}
              className="mt-4 flex flex-wrap gap-5 justify-center"
            >
              {/* Client Button with amber/orange gradient */}
              <Link href="/onboarding/client" className="p-[3px] relative transition-transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg" />
                <div className="px-7 py-1.5 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent font-semibold text-sm md:text-base">
                  Join as a Client
                </div>
              </Link>
              
              {/* Consultant Button with indigo/purple gradient */}
              <Link href="/onboarding/consultant" className="p-[3px] relative transition-transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                <div className="px-7 py-1.5 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent font-semibold text-sm md:text-base">
                  Join as a Consultant
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </AuroraBackground>
    </section>
  );
}