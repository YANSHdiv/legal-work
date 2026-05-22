"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface FloatingCardProps {
  colorClass?: string;
  rotateClass?: string;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  delay?: number;
}

export function FloatingCard({
  colorClass = "bg-blue-600",
  rotateClass = "rotate-0",
  icon,
  label,
  className,
  children,
  delay = 0,
}: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, scale: 0.5, rotateX: 45 }}
      animate={{ 
        opacity: 1, 
        y: [0, -10, 0], // Breathing effect
        scale: 1,
        rotateX: 0
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
        opacity: { duration: 0.8, delay },
        scale: { duration: 0.8, delay, type: "spring", bounce: 0.4 },
        rotateX: { duration: 0.8, delay, type: "spring" }
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05, cursor: "grab", zIndex: 50 }}
      whileTap={{ scale: 0.95, cursor: "grabbing" }}
      drag
      dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}
      dragElastic={0.2}
      className={cn(
        "absolute rounded-2xl md:rounded-full shadow-2xl flex items-center px-6 py-4 border border-white/20 backdrop-blur-md",
        colorClass,
        rotateClass,
        className
      )}
    >
      {/* Glossy overlay for insane glassmorphism */}
      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-tr from-white/0 via-white/10 to-white/30 pointer-events-none" style={{ transform: "translateZ(10px)" }} />
      
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 w-full h-full flex items-center">
        {children ? (
          children
        ) : (
          <div className="flex items-center gap-3 text-white w-full">
            {icon && <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">{icon}</div>}
            <span className="text-lg sm:text-2xl font-semibold tracking-wide whitespace-nowrap">
              {label}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
