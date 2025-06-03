'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import dynamic from 'next/dynamic';
import { memo, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

// Import the globe component with dynamic loading to prevent SSR issues
// Use memo to prevent unnecessary re-renders
const AIMatchingGlobe = memo(dynamic(() => import('@/components/ui/ai-matching-globe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 animate-pulse"></div>
    </div>
  )
}));

export function AIMatching() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After hydration, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if dark mode is active
  const isDarkMode = mounted ? resolvedTheme === 'dark' : false;

  return (
    <section 
      id="ai-matching"
      className={`py-20 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-b from-neopop-background to-neopop-surface' 
          : 'bg-gradient-to-b from-slate-50 to-slate-100'
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className={`absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${
          isDarkMode 
            ? 'from-blue-900/20 via-transparent to-transparent' 
            : 'from-blue-500/10 via-transparent to-transparent'
        }`}></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className={`text-4xl md:text-5xl font-bold font-serif mb-6 ${
            isDarkMode ? 'text-white' : 'text-slate-800'
          }`}>
            THE POWER OF <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
              isDarkMode ? 'from-blue-400 to-blue-600' : 'from-blue-500 to-blue-700'
            }`}>AI MATCHING</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto mb-4 ${
            isDarkMode ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Our intelligent engine analyzes project needs and consultant profiles to find the optimal connection.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isDarkMode ? 'bg-blue-500/20 text-blue-200' : 'bg-blue-100 text-blue-700'
            }`}>
              Global Network
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isDarkMode ? 'bg-blue-500/20 text-blue-200' : 'bg-blue-100 text-blue-700'
            }`}>
              Real-time Matching
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isDarkMode ? 'bg-blue-500/20 text-blue-200' : 'bg-blue-100 text-blue-700'
            }`}>
              AI-Powered
            </span>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 max-w-6xl mx-auto">
          {/* Left column - Projects */}
          <div className="space-y-4">
            <motion.div 
              className={`p-5 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-sm ${
                isDarkMode 
                  ? 'bg-white/5 border border-blue-500/10 hover:border-blue-500/30' 
                  : 'bg-white border border-slate-200 hover:border-blue-300'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
            >
              <div className="flex items-center mb-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>📋</span>
                <h3 className={`font-medium text-lg ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>AI Chatbot Dev</h3>
              </div>
              <p className={`text-sm mb-3 ${
                isDarkMode ? 'text-gray-400' : 'text-slate-600'
              }`}>Advanced conversational AI with natural language processing capabilities</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>NLP</span>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>Python</span>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>TensorFlow</span>
              </div>
            </motion.div>
            
            <motion.div 
              className={`p-5 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-sm ${
                isDarkMode 
                  ? 'bg-white/5 border border-blue-500/10 hover:border-blue-500/30' 
                  : 'bg-white border border-slate-200 hover:border-blue-300'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
            >
              <div className="flex items-center mb-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>📋</span>
                <h3 className={`font-medium text-lg ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>Cloud Migration Strategy</h3>
              </div>
              <p className={`text-sm mb-3 ${
                isDarkMode ? 'text-gray-400' : 'text-slate-600'
              }`}>Enterprise-scale migration from legacy systems to modern cloud architecture</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>AWS</span>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>Azure</span>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>DevOps</span>
              </div>
            </motion.div>
            
            <motion.div 
              className={`p-5 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-sm ${
                isDarkMode 
                  ? 'bg-white/5 border border-blue-500/10 hover:border-blue-500/30' 
                  : 'bg-white border border-slate-200 hover:border-blue-300'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
            >
              <div className="flex items-center mb-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>📋</span>
                <h3 className={`font-medium text-lg ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>Data Analytics Platform</h3>
              </div>
              <p className={`text-sm mb-3 ${
                isDarkMode ? 'text-gray-400' : 'text-slate-600'
              }`}>Real-time analytics solution for processing large-scale customer data</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>SQL</span>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>Tableau</span>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>BigQuery</span>
              </div>
            </motion.div>
          </div>
          
          {/* Center - AI Globe */}
          <div className="flex items-center justify-center py-6 lg:py-0 order-first lg:order-none">
            <div className="w-full h-[350px] relative">
              <AIMatchingGlobe />
            </div>
          </div>
          
          {/* Right column - Consultants */}
          <div className="space-y-4">
            <motion.div 
              className={`p-5 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-sm ${
                isDarkMode 
                  ? 'bg-white/5 border border-blue-500/10 hover:border-blue-500/30' 
                  : 'bg-white border border-slate-200 hover:border-blue-300'
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
            >
              <div className="flex items-center mb-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>👤</span>
                <h3 className={`font-medium text-lg ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>Alice Johnson</h3>
              </div>
              <p className={`text-sm mb-3 ${
                isDarkMode ? 'text-gray-400' : 'text-slate-600'
              }`}>AI Research Scientist with 8+ years experience in NLP and machine learning</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>Python</span>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>ML</span>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>NLP</span>
              </div>
            </motion.div>
            
            <motion.div 
              className={`p-5 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-sm ${
                isDarkMode 
                  ? 'bg-white/5 border border-blue-500/10 hover:border-blue-500/30' 
                  : 'bg-white border border-slate-200 hover:border-blue-300'
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
            >
              <div className="flex items-center mb-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>👤</span>
                <h3 className={`font-medium text-lg ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>Bob Williams</h3>
              </div>
              <p className={`text-sm mb-3 ${
                isDarkMode ? 'text-gray-400' : 'text-slate-600'
              }`}>Cloud Solutions Architect specializing in secure enterprise migrations</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>Azure</span>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>Security</span>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>Terraform</span>
              </div>
            </motion.div>
            
            <motion.div 
              className={`p-5 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-sm ${
                isDarkMode 
                  ? 'bg-white/5 border border-blue-500/10 hover:border-blue-500/30' 
                  : 'bg-white border border-slate-200 hover:border-blue-300'
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1)' }}
            >
              <div className="flex items-center mb-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>👤</span>
                <h3 className={`font-medium text-lg ${
                  isDarkMode ? 'text-white' : 'text-slate-800'
                }`}>Charlie Brown</h3>
              </div>
              <p className={`text-sm mb-3 ${
                isDarkMode ? 'text-gray-400' : 'text-slate-600'
              }`}>Data Engineer with expertise in building scalable analytics pipelines</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>SQL</span>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>Spark</span>
                <span className={`text-xs px-2 py-1 rounded-md ${
                  isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                }`}>Kafka</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Connection lines visualization */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
} 