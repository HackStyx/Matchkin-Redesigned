"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function AIMatchingGlobe() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const globeInstanceRef = useRef(null);
  
  // After hydration, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Prevent theme-based re-renders from affecting the globe instance
  const isDark = mounted ? resolvedTheme === 'dark' : false;
  
  // Custom colors for the globe based on the theme - blue Earth-like colors
  const globeColor = isDark ? "#0c2d6b" : "#1a4789";
  const ambientLight = isDark ? "#38bdf8" : "#60a5fa";
  const arcColors = ["#38bdf8", "#3b82f6", "#2563eb"];
  
  // Memoize the arc data to prevent regeneration on theme change
  const matchingArcs = useRef([
    // Project to consultant connections
    {
      order: 1,
      startLat: 37.7749, // San Francisco
      startLng: -122.4194,
      endLat: 40.7128, // New York
      endLng: -74.0060,
      arcAlt: 0.2,
      color: "#3b82f6",
    },
    {
      order: 1,
      startLat: 51.5074, // London
      startLng: -0.1278,
      endLat: 48.8566, // Paris
      endLng: 2.3522,
      arcAlt: 0.1,
      color: "#38bdf8",
    },
    {
      order: 2,
      startLat: 35.6762, // Tokyo
      startLng: 139.6503,
      endLat: 22.3193, // Hong Kong
      endLng: 114.1694,
      arcAlt: 0.15,
      color: "#2563eb",
    },
    {
      order: 2,
      startLat: -33.8688, // Sydney
      startLng: 151.2093,
      endLat: 1.3521, // Singapore
      endLng: 103.8198,
      arcAlt: 0.25,
      color: "#3b82f6",
    },
    {
      order: 3,
      startLat: 19.4326, // Mexico City
      startLng: -99.1332,
      endLat: -34.6037, // Buenos Aires
      endLng: -58.3816,
      arcAlt: 0.2,
      color: "#38bdf8",
    },
    {
      order: 3,
      startLat: 28.6139, // New Delhi
      startLng: 77.2090,
      endLat: 55.7558, // Moscow
      endLng: 37.6173,
      arcAlt: 0.3,
      color: "#2563eb",
    },
    {
      order: 4,
      startLat: 30.0444, // Cairo
      startLng: 31.2357,
      endLat: 52.5200, // Berlin
      endLng: 13.4050,
      arcAlt: 0.2,
      color: "#3b82f6",
    },
    {
      order: 4,
      startLat: -23.5505, // São Paulo
      startLng: -46.6333,
      endLat: 40.4168, // Madrid
      endLng: -3.7038,
      arcAlt: 0.35,
      color: "#38bdf8",
    },
    {
      order: 5,
      startLat: 41.9028, // Rome
      startLng: 12.4964,
      endLat: 25.2048, // Dubai
      endLng: 55.2708,
      arcAlt: 0.2,
      color: "#2563eb",
    },
    {
      order: 5,
      startLat: -26.2041, // Johannesburg
      startLng: 28.0473,
      endLat: 59.3293, // Stockholm
      endLng: 18.0686,
      arcAlt: 0.3,
      color: "#3b82f6",
    },
    // Additional connections for more visual impact
    {
      order: 6,
      startLat: 34.0522, // Los Angeles
      startLng: -118.2437,
      endLat: 31.2304, // Shanghai
      endLng: 121.4737,
      arcAlt: 0.4,
      color: "#38bdf8",
    },
    {
      order: 6,
      startLat: -33.4489, // Cape Town
      startLng: 18.6721,
      endLat: 40.7128, // New York
      endLng: -74.0060,
      arcAlt: 0.45,
      color: "#2563eb",
    },
    {
      order: 7,
      startLat: 55.7558, // Moscow
      startLng: 37.6173,
      endLat: 35.6762, // Tokyo
      endLng: 139.6503,
      arcAlt: 0.3,
      color: "#3b82f6",
    },
    {
      order: 7,
      startLat: 1.3521, // Singapore
      startLng: 103.8198,
      endLat: 51.5074, // London
      endLng: -0.1278,
      arcAlt: 0.5,
      color: "#38bdf8",
    }
  ]).current;
  
  // Create a stable reference for the globe config to prevent recreating the globe on theme changes
  const globeConfig = {
    key: isDark ? 'dark' : 'light', // Add a key to force update only when theme changes
    pointSize: 3,
    globeColor: globeColor,
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.2,
    emissive: isDark ? "#0c2d6b" : "#1a4789",
    emissiveIntensity: 0.2,
    shininess: 0.9,
    polygonColor: isDark ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.5)",
    ambientLight: ambientLight,
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#60a5fa",
    arcTime: 1200,
    arcLength: 0.9,
    rings: 2,
    maxRings: 3,
    autoRotate: true,
    autoRotateSpeed: 0.3,
  };

  // If not mounted yet, show a loading placeholder with the same dimensions
  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/4 w-2/3 h-2/3 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-2/3 h-2/3 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Globe */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full h-full z-10 relative"
        ref={globeInstanceRef}
      >
        <World data={matchingArcs} globeConfig={globeConfig} />
      </motion.div>
      
      {/* Animated pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-1/2 h-1/2">
          <div className="absolute inset-0 rounded-full animate-ping-slow bg-blue-500/10"></div>
          <div className="absolute inset-0 rounded-full animate-ping-slower bg-blue-500/5 delay-300"></div>
        </div>
      </div>
    </div>
  );
} 