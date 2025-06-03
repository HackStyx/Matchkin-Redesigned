'use client';

import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { useTheme } from 'next-themes';

// Icons
const ExpertiseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-500">
    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
  </svg>
);

const AIIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-500">
    <path d="M16.5 7.5h-9v9h9v-9z" />
    <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clipRule="evenodd" />
  </svg>
);

const SpeedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-500">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
  </svg>
);

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-amber-500 mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};

// Feature step component with light/dark mode support
const FeatureStep = ({ title }: { title: string }) => {
  // Use a consistent text color to avoid hydration mismatch
  return (
    <li className="flex gap-2 items-start mb-2">
      <CheckIcon />
      <p className="dark:text-white text-slate-700">{title}</p>
    </li>
  );
};

export function About() {
  // For server-side rendering, start with a default theme
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  
  // After hydration, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Default to dark theme for server-side rendering to prevent hydration mismatch
  const isDark = mounted ? theme === 'dark' : true;
  
  const bgClass = isDark 
    ? "bg-gradient-to-b from-black to-slate-950" 
    : "bg-white";
  
  const cardBgClass = isDark 
    ? "bg-slate-950/70 p-10 rounded-md border border-neutral-800" 
    : "bg-white/90 p-10 rounded-md border border-slate-200";
  
  const headingClass = isDark
    ? "text-white"
    : "text-slate-900";
  
  const textClass = isDark
    ? "text-neutral-300"
    : "text-slate-700";

  return (
    <section className={`py-20 ${bgClass} transition-colors duration-300`}>
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className={`text-4xl md:text-5xl font-bold font-serif section-heading mb-4 ${headingClass}`}>
            FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
              CLIENTS
            </span>
          </h2>
          <p className={`text-lg ${textClass} max-w-2xl mx-auto mb-10`}>
            Find Your Ideal Consultant, Faster. Leverage AI to connect with vetted experts perfectly matched to your project needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <CardSpotlight className={`h-full ${cardBgClass}`} color="#78350f">
              <div className="relative z-20">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-amber-500/10 mr-3">
                    <ExpertiseIcon />
                  </div>
                  <p className={`text-xl font-bold ${headingClass}`}>Access Top-Tier Expertise</p>
                </div>
                <div className={`${textClass} mt-4 relative z-20`}>
                  <p className="mb-4">Connect with a curated network of vetted experts:</p>
                  <ul className="list-none mt-2 space-y-2">
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Handpicked consultants with proven track records</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Domain specialists across various industries</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Verified credentials and expertise</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Full profile transparency</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardSpotlight>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CardSpotlight className={`h-full ${cardBgClass}`} color="#78350f">
              <div className="relative z-20">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-amber-500/10 mr-3">
                    <AIIcon />
                  </div>
                  <p className={`text-xl font-bold ${headingClass}`}>AI-Powered Matching</p>
                </div>
                <div className={`${textClass} mt-4 relative z-20`}>
                  <p className="mb-4">Our intelligent algorithms find your perfect match:</p>
                  <ul className="list-none mt-2 space-y-2">
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Precise skill and experience matching</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Contextual understanding of project needs</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Personality and work style compatibility</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Data-driven recommendations</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardSpotlight>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <CardSpotlight className={`h-full ${cardBgClass}`} color="#78350f">
              <div className="relative z-20">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-amber-500/10 mr-3">
                    <SpeedIcon />
                  </div>
                  <p className={`text-xl font-bold ${headingClass}`}>Accelerate Your Search</p>
                </div>
                <div className={`${textClass} mt-4 relative z-20`}>
                  <p className="mb-4">Save time and focus on what matters most:</p>
                  <ul className="list-none mt-2 space-y-2">
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Instant qualified consultant matches</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Streamlined proposal and selection process</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Quick project kickoff coordination</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Reduced time-to-hire by 70%</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardSpotlight>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 