'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

// Custom icons for expertise categories
const AIIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16.5 7.5h-9v9h9v-9z" />
    <path fillRule="evenodd" d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z" clipRule="evenodd" />
  </svg>
);

const DataIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
  </svg>
);

const CloudIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.23-10.004 6.072 6.072 0 01-.02-.496z" clipRule="evenodd" />
  </svg>
);

const SoftwareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z" clipRule="evenodd" />
  </svg>
);

const SecurityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
  </svg>
);

const ConsultingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
  </svg>
);

const MarketingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
  </svg>
);

const FinanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clipRule="evenodd" />
  </svg>
);

const DesignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 00-3.471 2.987 10.04 10.04 0 014.815 4.815 18.748 18.748 0 002.987-3.472l3.386-5.079A1.902 1.902 0 0020.599 1.5zm-8.3 14.025a18.76 18.76 0 001.896-1.207 8.026 8.026 0 00-4.513-4.513A18.75 18.75 0 008.475 11.7l-.278.5a5.26 5.26 0 013.601 3.602l.502-.278zM6.75 13.5A3.75 3.75 0 003 17.25a1.5 1.5 0 01-1.601 1.497.75.75 0 00-.7 1.123 5.25 5.25 0 009.8-2.62 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
  </svg>
);

const ProjectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z" clipRule="evenodd" />
  </svg>
);

// Card component with pill shape
const ExpertiseCard = ({ 
  icon, 
  name, 
  isDark, 
  index,
  size = 'medium'
}: { 
  icon: React.ReactNode, 
  name: string, 
  isDark: boolean,
  index: number,
  size?: 'small' | 'medium' | 'large'
}) => {
  // Determine width class based on size
  const widthClass = {
    small: 'w-auto',
    medium: 'w-auto',
    large: 'w-auto'
  }[size];
  
  return (
    <motion.div
      className={`inline-block ${widthClass}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={`
        group cursor-pointer rounded-full px-5 py-3
        ${isDark ? 'bg-amber-800/90' : 'bg-amber-600'} 
        border border-amber-500/30
        flex items-center gap-3 overflow-hidden
        transition-all duration-300
        hover:shadow-lg ${isDark ? 'hover:shadow-amber-700/30' : 'hover:shadow-amber-500/30'}
      `}>
        {/* Icon */}
        <div className={`
          flex-shrink-0 rounded-full
          ${isDark ? 'text-amber-300' : 'text-amber-100'}
        `}>
          {icon}
        </div>
        
        {/* Text content */}
        <span className={`
          font-medium whitespace-nowrap
          ${isDark ? 'text-amber-100' : 'text-amber-50'}
        `}>
          {name}
        </span>
      </div>
    </motion.div>
  );
};

export function Expertise() {
  // For theme detection
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  
  // After hydration, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Default to dark theme for server-side rendering
  const isDark = mounted ? theme === 'dark' : true;
  
  const expertiseCategories = [
    { name: 'AI & Machine Learning', icon: <AIIcon />, size: 'medium' },
    { name: 'Data Science & Analytics', icon: <DataIcon />, size: 'medium' },
    { name: 'Cloud Architecture (AWS, Azure, GCP)', icon: <CloudIcon />, size: 'large' },
    { name: 'Software Development', icon: <SoftwareIcon />, size: 'medium' },
    { name: 'Cybersecurity Strategy', icon: <SecurityIcon />, size: 'medium' },
    { name: 'Management Consulting', icon: <ConsultingIcon />, size: 'medium' },
    { name: 'Digital Marketing & SEO', icon: <MarketingIcon />, size: 'medium' },
    { name: 'Financial Advisory', icon: <FinanceIcon />, size: 'small' },
    { name: 'UX/UI Design', icon: <DesignIcon />, size: 'small' },
    { name: 'Project Management', icon: <ProjectIcon />, size: 'medium' }
  ];
  
  const sectionBg = isDark 
    ? 'bg-black' 
    : 'bg-gradient-to-b from-gray-50 to-white';
  
  const headingClass = isDark
    ? 'text-white'
    : 'text-slate-900';
  
  const subheadingClass = isDark
    ? 'text-amber-100/80'
    : 'text-amber-700';
  
  return (
    <section className={`relative py-28 ${sectionBg} transition-colors duration-300`}>
      {/* Background overlay for dark mode only */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black to-black/90 z-10"></div>
      )}
      
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl"></div>
        <div className="absolute top-1/4 -left-20 w-60 h-60 rounded-full bg-amber-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-amber-500/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-20">
          <motion.div 
          className="text-center"
            initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
            variants={fadeIn}
          >
          <h2 className={`text-5xl md:text-6xl font-serif font-normal tracking-tight mb-6 ${headingClass}`}>
            SHOWCASE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">EXPERTISE</span>
            </h2>
          
          {/* Animated underline */}
          <div className="relative w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto mb-8">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/50 to-orange-600/50 blur-sm"></div>
          </div>
          
          <p className={`text-xl ${subheadingClass} max-w-3xl mx-auto mb-16`}>
              We connect clients with consultants across diverse, high-demand specializations.
            </p>
          
          {/* Staggered layout for expertise cards */}
          <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
            {/* Row 1 */}
            <div className="flex flex-wrap justify-center gap-4 w-full">
              <ExpertiseCard
                key={0}
                icon={expertiseCategories[0].icon}
                name={expertiseCategories[0].name}
                isDark={isDark}
                index={0}
              />
              <ExpertiseCard
                key={1}
                icon={expertiseCategories[1].icon}
                name={expertiseCategories[1].name}
                isDark={isDark}
                index={1}
              />
              <ExpertiseCard
                key={2}
                icon={expertiseCategories[2].icon}
                name={expertiseCategories[2].name}
                isDark={isDark}
                index={2}
                size="large"
              />
            </div>
            
            {/* Row 2 */}
            <div className="flex flex-wrap justify-center gap-4 w-full mt-4">
              <ExpertiseCard
                key={3}
                icon={expertiseCategories[3].icon}
                name={expertiseCategories[3].name}
                isDark={isDark}
                index={3}
              />
              <ExpertiseCard
                key={4}
                icon={expertiseCategories[4].icon}
                name={expertiseCategories[4].name}
                isDark={isDark}
                index={4}
              />
              <ExpertiseCard
                key={5}
                icon={expertiseCategories[5].icon}
                name={expertiseCategories[5].name}
                isDark={isDark}
                index={5}
              />
              <ExpertiseCard
                key={6}
                icon={expertiseCategories[6].icon}
                name={expertiseCategories[6].name}
                isDark={isDark}
                index={6}
              />
            </div>
            
            {/* Row 3 */}
            <div className="flex flex-wrap justify-center gap-4 w-full mt-4">
              <ExpertiseCard
                key={7}
                icon={expertiseCategories[7].icon}
                name={expertiseCategories[7].name}
                isDark={isDark}
                index={7}
                size="small"
              />
              <ExpertiseCard
                key={8}
                icon={expertiseCategories[8].icon}
                name={expertiseCategories[8].name}
                isDark={isDark}
                index={8}
                size="small"
              />
              <ExpertiseCard
                key={9}
                icon={expertiseCategories[9].icon}
                name={expertiseCategories[9].name}
                isDark={isDark}
                index={9}
              />
            </div>
            </div>
          </motion.div>
        </div>
      
      {/* Decorative elements */}
      <div className={`absolute bottom-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-amber-500/20 to-transparent' : 'bg-gradient-to-r from-transparent via-amber-500/10 to-transparent'}`}></div>
    </section>
  );
} 