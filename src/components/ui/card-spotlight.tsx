"use client";

import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent, useState, useEffect, useMemo } from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Always call useMotionTemplate regardless of mounted state
  const maskImage = useMotionTemplate`
    radial-gradient(
      ${radius}px circle at ${mouseX}px ${mouseY}px,
      white,
      transparent 80%
    )
  `;
  
  // Only enable client-side features after hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    if (!mounted) return;
    
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const handleMouseEnter = () => mounted && setIsHovering(true);
  const handleMouseLeave = () => mounted && setIsHovering(false);
  
  return (
    <div
      className={cn(
        "group/spotlight relative",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {mounted && (
        <motion.div
          className="pointer-events-none absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
          style={{
            backgroundColor: color,
            maskImage,
          }}
        >
          {isHovering && (
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent absolute inset-0 pointer-events-none"
              colors={[
                [59, 130, 246],
                [139, 92, 246],
              ]}
              dotSize={3}
            />
          )}
        </motion.div>
      )}
      {children}
    </div>
  );
}; 