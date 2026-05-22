"use client";

import React from "react";
import { motion } from "framer-motion";
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom spring-like ease
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={cn(
        "absolute rounded-2xl md:rounded-full shadow-2xl flex items-center px-6 py-4 transition-transform duration-300",
        colorClass,
        rotateClass,
        className
      )}
    >
      {children ? (
        children
      ) : (
        <div className="flex items-center gap-3 text-white">
          {icon && <div className="w-6 h-6 sm:w-8 sm:h-8">{icon}</div>}
          <span className="text-lg sm:text-2xl font-semibold tracking-wide">
            {label}
          </span>
        </div>
      )}
    </motion.div>
  );
}
