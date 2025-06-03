"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isChanging, setIsChanging] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setIsChanging(true);
    setTheme(isDarkMode ? "light" : "dark");
    setTimeout(() => setIsChanging(false), 500);
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={handleToggle}
      className="relative h-8 w-12 rounded-full bg-surface p-1 shadow-md focus:outline-none overflow-hidden border border-border"
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br"
        initial={false}
        animate={{
          background: isDarkMode 
            ? "linear-gradient(to bottom right, #0f172a, #1e293b)"
            : "linear-gradient(to bottom right, #dbeafe, #f8fafc)",
        }}
      />
      
      {/* Stars (visible in dark mode) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          opacity: isDarkMode ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full bg-white"
            initial={false}
            animate={{
              opacity: isDarkMode ? [0.2, 0.8, 0.2] : 0,
              scale: isDarkMode ? [0.8, 1.2, 0.8] : 0,
              x: `${Math.random() * 100 - 50}%`,
              y: `${Math.random() * 100 - 50}%`,
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 3 + 2,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
      
      {/* Sun/Moon */}
      <motion.div
        className="relative z-10 h-6 w-6 rounded-full shadow-md"
        initial={false}
        animate={{
          x: isDarkMode ? "0%" : "100%",
          background: isDarkMode ? "#f59e0b" : "#f59e0b",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Sun rays / Moon craters */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{
            opacity: 1,
            rotate: isDarkMode ? 0 : 180,
          }}
        >
          {isDarkMode ? (
            // Moon craters
            <>
              <motion.div
                className="absolute h-1.5 w-1.5 rounded-full bg-amber-800/30"
                style={{ top: '25%', left: '30%' }}
              />
              <motion.div
                className="absolute h-1 w-1 rounded-full bg-amber-800/30"
                style={{ top: '50%', left: '60%' }}
              />
              <motion.div
                className="absolute h-0.5 w-0.5 rounded-full bg-amber-800/30"
                style={{ top: '60%', left: '30%' }}
              />
            </>
          ) : (
            // Sun rays
            [...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-0.5 w-2 bg-amber-300"
                style={{
                  transformOrigin: "center",
                  rotate: `${i * 45}deg`,
                  left: "calc(50% - 1px)",
                }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  delay: i * 0.2,
                }}
              />
            ))
          )}
        </motion.div>
      </motion.div>
      
      {/* Particle burst effect on change */}
      <AnimatePresence>
        {isChanging && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className={`absolute w-0.5 h-0.5 rounded-full ${isDarkMode ? 'bg-amber-300' : 'bg-amber-500'}`}
                initial={{ 
                  scale: 0,
                  x: "50%", 
                  y: "50%",
                  opacity: 1
                }}
                animate={{ 
                  scale: [0, 1],
                  x: [
                    "50%", 
                    `${50 + (Math.random() * 100 - 50)}%`
                  ],
                  y: [
                    "50%", 
                    `${50 + (Math.random() * 100 - 50)}%`
                  ],
                  opacity: [1, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeOut" 
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
}