'use client';

import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { fadeIn } from '@/lib/animations';
import { useTheme } from 'next-themes';

// Icons
const ProjectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500">
    <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);

const AIIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-500">
    <path d="M16.5 7.5h-9v9h9v-9z" />
    <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clipRule="evenodd" />
  </svg>
);

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
    <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
  </svg>
);

const SecurityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-amber-500">
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
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
      className="h-4 w-4 text-blue-500 mt-1 shrink-0"
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

const FeatureStep = ({ title }: { title: string }) => {
  // Use a consistent text color to avoid hydration mismatch
  return (
    <li className="flex gap-2 items-start mb-2">
      <CheckIcon />
      <p className="dark:text-white text-slate-700">{title}</p>
    </li>
  );
};

export function Features() {
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
    ? "bg-gradient-to-b from-slate-950 to-slate-900" 
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
            PLATFORM <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              FEATURES
            </span> FOR CLIENTS
          </h2>
          <p className={`text-lg ${textClass} max-w-2xl mx-auto`}>
            Our premium platform provides everything you need to connect with top consultants efficiently and effectively.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <CardSpotlight className={`h-full ${cardBgClass}`}>
              <div className="relative z-20">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 mr-3">
                    <ProjectIcon />
                  </div>
                  <p className={`text-xl font-bold ${headingClass}`}>Effortless Project Posting</p>
                </div>
                <div className={`${textClass} mt-4 relative z-20`}>
                  <p className="mb-4">Clearly define your project requirements with our intuitive interface:</p>
                  <ul className="list-none mt-2 space-y-2">
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Define scope, skills, budget with ease</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Structured templates for various project types</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Immediate visibility to matched consultants</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Seamless revision and refinement options</p>
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
            <CardSpotlight className={`h-full ${cardBgClass}`} color="#1e1b4b">
              <div className="relative z-20">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 mr-3">
                    <AIIcon />
                  </div>
                  <p className={`text-xl font-bold ${headingClass}`}>Intelligent Recommendations</p>
                </div>
                <div className={`${textClass} mt-4 relative z-20`}>
                  <p className="mb-4">Our AI algorithms match you with the perfect consultants:</p>
                  <ul className="list-none mt-2 space-y-2">
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>AI-driven expertise matching algorithms</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Recommendations based on success patterns</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Continuously improving match quality</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Transparent skill and experience ratings</p>
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
            <CardSpotlight className={`h-full ${cardBgClass}`} color="#042f2e">
              <div className="relative z-20">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-green-500/10 mr-3">
                    <ChatIcon />
                  </div>
                  <p className={`text-xl font-bold ${headingClass}`}>Seamless Communication</p>
                </div>
                <div className={`${textClass} mt-4 relative z-20`}>
                  <p className="mb-4">Collaborate directly with consultants through our platform:</p>
                  <ul className="list-none mt-2 space-y-2">
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Integrated messaging with file sharing</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Real-time video conferencing</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Scheduled notifications and reminders</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Searchable conversation history</p>
                    </li>
                  </ul>
                </div>
              </div>
            </CardSpotlight>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <CardSpotlight className={`h-full ${cardBgClass}`} color="#422006">
              <div className="relative z-20">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-amber-500/10 mr-3">
                    <SecurityIcon />
                  </div>
                  <p className={`text-xl font-bold ${headingClass}`}>Secure Collaboration Space</p>
                </div>
                <div className={`${textClass} mt-4 relative z-20`}>
                  <p className="mb-4">Manage all aspects of your project in one secure environment:</p>
                  <ul className="list-none mt-2 space-y-2">
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Encrypted document storage and sharing</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Milestone and payment tracking</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Contract management with e-signatures</p>
                    </li>
                    <li className="flex gap-2 items-start mb-2">
                      <CheckIcon />
                      <p className={isDark ? "text-white" : "text-slate-700"}>Detailed analytics and reporting</p>
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