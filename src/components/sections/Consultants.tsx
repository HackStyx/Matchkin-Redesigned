'use client';

import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { useTheme } from 'next-themes';

// Animated Card Wrapper with glow effect
const GlowingCard = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="group relative rounded-xl overflow-hidden">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl opacity-75 blur group-hover:opacity-100 transition duration-500"></div>
        <div className="absolute inset-0 rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
        </div>
        <div className="relative">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// Icons with modern style
const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-orange-500">
    <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-orange-500">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM15.375 12a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" clipRule="evenodd" />
  </svg>
);

const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-orange-500">
    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
  </svg>
);

const ChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-orange-500">
    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
  </svg>
);

// Feature bullet item component
const FeatureItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center mb-3">
      <div className="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-amber-500"
        >
          <path
            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <p className={isDark ? "text-white/90" : "text-slate-700 text-[15px] font-light"}>{text}</p>
    </div>
  );
};

export function Consultants() {
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
    ? "bg-gradient-to-b from-slate-950 to-black" 
    : "bg-white";
  
  const cardBgClass = isDark 
    ? "bg-slate-900/90 backdrop-blur-sm border-slate-800/50" 
    : "bg-white/90 backdrop-blur-sm border border-slate-200";
  
  const headingClass = isDark
    ? "text-white"
    : "text-slate-900";
  
  const subHeadingClass = isDark
    ? "text-white/70"
    : "text-slate-700";

  return (
    <section className={`relative py-24 ${bgClass} transition-colors duration-300`}>
      {/* Add animation keyframes for shimmer effect */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
      
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-orange-500/5 blur-3xl"></div>
        <div className="absolute top-1/4 -left-20 w-60 h-60 rounded-full bg-orange-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-orange-500/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className={`text-5xl md:text-6xl font-serif font-normal tracking-tight mb-4 ${headingClass}`}>
            FOR <span className="gradient-text">CONSULTANTS</span>
          </h2>
          <p className={`text-xl ${subHeadingClass} max-w-3xl mx-auto mb-10`}>
            Connect with Your Next Opportunity. Showcase your expertise and let our AI match 
            you with high-value projects.
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            {/* Card 1 */}
            <GlowingCard delay={0.1}>
              <CardSpotlight className={`h-full p-8 ${cardBgClass} rounded-lg`} color="#78350f">
                <div className="relative z-20">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-lg p-3 mr-4 shadow-lg shadow-orange-900/10">
                      <BriefcaseIcon />
                    </div>
                    <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">Access High-Quality Projects</h3>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-amber-500"
                        >
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p className={isDark ? "text-white/90" : "text-slate-700 text-[15px] font-light"}>Work with pre-vetted serious clients</p>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-amber-500"
                        >
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p className={isDark ? "text-white/90" : "text-slate-700 text-[15px] font-light"}>Access exclusive high-budget projects</p>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-amber-500"
                        >
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p className={isDark ? "text-white/90" : "text-slate-700 text-[15px] font-light"}>Find opportunities matching your exact skills</p>
                    </div>
                  </div>
                </div>
              </CardSpotlight>
            </GlowingCard>

            {/* Card 2 */}
            <GlowingCard delay={0.2}>
              <CardSpotlight className={`h-full p-8 ${cardBgClass} rounded-lg`} color="#78350f">
                <div className="relative z-20">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-lg p-3 mr-4 shadow-lg shadow-orange-900/10">
                      <TargetIcon />
                    </div>
                    <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">AI-Powered Matching</h3>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-amber-500"
                        >
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p className={isDark ? "text-white/90" : "text-slate-700 text-[15px] font-light"}>Intelligent skill-to-project matching algorithm</p>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-amber-500"
                        >
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p className={isDark ? "text-white/90" : "text-slate-700 text-[15px] font-light"}>Receive curated opportunities in your inbox</p>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-amber-500"
                        >
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p className={isDark ? "text-white/90" : "text-slate-700 text-[15px] font-light"}>Higher match rate means higher success rate</p>
                    </div>
                  </div>
                </div>
              </CardSpotlight>
            </GlowingCard>

            {/* Card 3 */}
            <GlowingCard delay={0.3}>
              <CardSpotlight className={`h-full p-8 ${cardBgClass} rounded-lg`} color="#78350f">
                <div className="relative z-20">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-lg p-3 mr-4 shadow-lg shadow-orange-900/10">
                      <BoltIcon />
                    </div>
                    <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">Streamlined Workflow</h3>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-amber-500"
                        >
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p className={isDark ? "text-white/90" : "text-slate-700 text-[15px] font-light"}>End-to-end project management tools</p>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-amber-500"
                        >
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p className={isDark ? "text-white/90" : "text-slate-700 text-[15px] font-light"}>Secure contracts and payment processing</p>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-amber-500"
                        >
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p className={isDark ? "text-white/90" : "text-slate-700 text-[15px] font-light"}>Integrated communication channels</p>
                    </div>
                  </div>
                </div>
              </CardSpotlight>
            </GlowingCard>

            {/* Card 4 */}
            <GlowingCard delay={0.4}>
              <CardSpotlight className={`h-full p-8 ${cardBgClass} rounded-lg`} color="#78350f">
                <div className="relative z-20">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-lg p-3 mr-4 shadow-lg shadow-orange-900/10">
                      <ChartIcon />
                    </div>
                    <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">Build Your Reputation</h3>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-amber-500"
                        >
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p className={isDark ? "text-white/90" : "text-slate-700 text-[15px] font-light"}>Create a stunning digital portfolio</p>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-amber-500"
                        >
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p className={isDark ? "text-white/90" : "text-slate-700 text-[15px] font-light"}>Collect verified client testimonials</p>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-amber-500"
                        >
                          <path
                            d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <p className={isDark ? "text-white/90" : "text-slate-700 text-[15px] font-light"}>Increase visibility with expertise badges</p>
                    </div>
                  </div>
                </div>
              </CardSpotlight>
            </GlowingCard>
          </div>
        </div>
      </div>
    </section>
  );
} 