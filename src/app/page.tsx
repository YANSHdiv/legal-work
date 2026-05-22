"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FloatingCard } from "@/components/FloatingCard";
import { Receipt, Gavel, CheckSquare, FileText } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TITLE_TEXT = "A single platform to manage every part of your legal work";
const SUBTITLE_TEXT = "Track matters, coordinate schedules, manage clients, centralize documents, and handle communication - all in one system.";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1 for parallax
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  // Smooth springs for the parallax
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Parallax transforms for background elements (move opposite to mouse)
  const bgTranslateX = useTransform(springX, [-1, 1], [30, -30]);
  const bgTranslateY = useTransform(springY, [-1, 1], [30, -30]);
  const bgPillTranslateX = useTransform(springX, [-1, 1], [50, -50]);
  const bgPillTranslateY = useTransform(springY, [-1, 1], [50, -50]);

  // Mouse spotlight
  const spotlightX = useTransform(mouseX, [-1, 1], ["0%", "100%"]);
  const spotlightY = useTransform(mouseY, [-1, 1], ["0%", "100%"]);

  const titleWords = TITLE_TEXT.split(" ");
  const subtitleWords = SUBTITLE_TEXT.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring" as const, stiffness: 150, damping: 10 },
    },
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFBFF] dark:bg-[#080B14] font-sans perspective-1000">
      {/* Interactive Cursor Spotlight */}
      {isClient && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20"
          style={{
            background: `radial-gradient(circle 600px at ${spotlightX} ${spotlightY}, rgba(108, 125, 245, 0.15), transparent 80%)`,
          }}
        />
      )}

      {/* Dynamic Background Pills (The "blank boxes" with Parallax) */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{ x: bgPillTranslateX, y: bgPillTranslateY }}
      >
        {/* Left side pills */}
        <div className="absolute top-[10%] -left-[10%] w-[300px] h-[70px] bg-gradient-to-r from-[#EEF2FC]/80 to-[#EAF0F9]/40 dark:from-slate-800/60 dark:to-slate-800/10 rounded-full rotate-[-5deg] backdrop-blur-3xl border border-white/40 dark:border-white/5 shadow-inner transition-transform hover:scale-105 duration-700" />
        <div className="absolute top-[35%] -left-[5%] w-[400px] h-[80px] bg-gradient-to-r from-[#EEF2FC]/80 to-[#EAF0F9]/40 dark:from-slate-800/60 dark:to-slate-800/10 rounded-full rotate-[3deg] backdrop-blur-3xl border border-white/40 dark:border-white/5 shadow-inner" />
        <div className="absolute top-[65%] -left-[15%] w-[250px] h-[60px] bg-gradient-to-r from-[#EEF2FC]/80 to-[#EAF0F9]/40 dark:from-slate-800/60 dark:to-slate-800/10 rounded-full rotate-[-2deg] backdrop-blur-3xl border border-white/40 dark:border-white/5 shadow-inner" />
        <div className="absolute bottom-[10%] -left-[5%] w-[450px] h-[90px] bg-gradient-to-r from-[#EEF2FC]/80 to-[#EAF0F9]/40 dark:from-slate-800/60 dark:to-slate-800/10 rounded-full rotate-[1deg] backdrop-blur-3xl border border-white/40 dark:border-white/5 shadow-inner" />

        {/* Right side pills */}
        <div className="absolute top-[5%] -right-[5%] w-[350px] h-[75px] bg-gradient-to-l from-[#EEF2FC]/80 to-[#EAF0F9]/40 dark:from-slate-800/60 dark:to-slate-800/10 rounded-full rotate-[5deg] backdrop-blur-3xl border border-white/40 dark:border-white/5 shadow-inner" />
        <div className="absolute top-[25%] right-[5%] w-[400px] h-[85px] bg-gradient-to-l from-[#EEF2FC]/80 to-[#EAF0F9]/40 dark:from-slate-800/60 dark:to-slate-800/10 rounded-full rotate-[-4deg] backdrop-blur-3xl border border-white/40 dark:border-white/5 shadow-inner" />
        <div className="absolute top-[45%] -right-[10%] w-[500px] h-[100px] bg-gradient-to-l from-[#EEF2FC]/80 to-[#EAF0F9]/40 dark:from-slate-800/60 dark:to-slate-800/10 rounded-full rotate-[2deg] backdrop-blur-3xl border border-white/40 dark:border-white/5 shadow-inner" />
      </motion.div>

      {/* Decorative blurred blobs with Parallax */}
      <motion.div 
        className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none"
        style={{ x: bgTranslateX, y: bgTranslateY }}
      >
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-[100px] animate-pulse delay-700" />
      </motion.div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 min-h-[600px]">
          {/* Left Content with Staggered Word Reveal */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center max-w-xl">
            <motion.h1 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl lg:text-7xl font-medium tracking-tight text-[#6B728E] dark:text-slate-300 leading-[1.1] mb-6 flex flex-wrap gap-x-3 gap-y-1"
            >
              {titleWords.map((word, i) => (
                <motion.span 
                  key={i} 
                  variants={wordVariants}
                  className={cn(
                    "inline-block pb-2",
                    word.toLowerCase() === "manage" && "font-bold text-[#444C6A] dark:text-white",
                    word.toLowerCase().includes("legal") && "font-bold text-[#6C7DF5] dark:text-indigo-400 bg-clip-text text-transparent bg-gradient-to-r from-[#6C7DF5] to-[#A5B4FC]",
                    word.toLowerCase().includes("work") && "font-bold text-[#6C7DF5] dark:text-indigo-400 bg-clip-text text-transparent bg-gradient-to-r from-[#6C7DF5] to-[#A5B4FC]",
                  )}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-lg text-[#5A6EE0]/90 dark:text-blue-300/80 leading-relaxed max-w-md font-medium flex flex-wrap gap-x-1.5"
            >
              {subtitleWords.map((word, i) => (
                <motion.span key={`sub-${i}`} variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-10"
            >
              <button className="group relative px-8 py-4 bg-gradient-to-r from-[#4F62DA] to-[#6C7DF5] text-white rounded-full font-semibold tracking-wide shadow-[0_10px_30px_-10px_rgba(79,98,218,0.5)] hover:shadow-[0_10px_40px_-10px_rgba(79,98,218,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            </motion.div>
          </div>

          {/* Right Content - Interactive 3D Floating Elements */}
          <div className="w-full lg:w-1/2 relative h-[600px] hidden md:block perspective-1000">
            <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
              {/* Billing Card */}
              <FloatingCard
                colorClass="bg-gradient-to-br from-[#3B5BDB] to-[#2C4DF0]"
                rotateClass="rotate-[12deg]"
                icon={<Receipt className="w-7 h-7 drop-shadow-md" />}
                label="Billing"
                className="top-[15%] right-[15%]"
                delay={0.2}
              />

              {/* Matters Card */}
              <FloatingCard
                colorClass="bg-gradient-to-br from-[#F39C12] to-[#E67B27]"
                rotateClass="-rotate-[12deg]"
                icon={<Gavel className="w-7 h-7 drop-shadow-md" />}
                label="Matters"
                className="top-[45%] left-[0%]"
                delay={0.4}
              />

              {/* Profile/Notification Card (John Doe) */}
              <FloatingCard
                colorClass="bg-gradient-to-br from-[#A4B3F9]/90 to-[#8C9DF0]/90 dark:from-[#4338CA]/90 dark:to-[#3730A3]/90"
                rotateClass="-rotate-[4deg]"
                className="top-[55%] right-[10%] p-0 overflow-hidden !rounded-2xl ring-1 ring-white/40 shadow-2xl"
                delay={0.6}
              >
                <div className="flex bg-transparent pr-6 pl-0 py-3 rounded-2xl items-center gap-4 max-w-xs relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
                  <div className="w-1.5 h-16 bg-[#E67B27] rounded-r-md shadow-[0_0_10px_rgba(230,123,39,0.5)] z-10"></div>
                  <div className="w-12 h-12 bg-white/50 dark:bg-white/20 backdrop-blur-md rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center shadow-inner z-10 border border-white/50">
                    <span className="text-2xl drop-shadow-sm">👨🏽‍🦱</span>
                  </div>
                  <div className="flex flex-col text-[#1E2333] dark:text-slate-100 z-10">
                    <span className="text-[13px] font-bold tracking-tight">
                      John Doe - Portal
                    </span>
                    <span className="text-[11px] opacity-80 mt-0.5 leading-tight font-medium">
                      Hey! Could you please review a document for me?
                    </span>
                    <span className="text-[9px] opacity-60 mt-1 uppercase tracking-wider font-bold">
                      MAT-2233 - 2 h ago
                    </span>
                  </div>
                </div>
              </FloatingCard>

              {/* Tasks Card */}
              <FloatingCard
                colorClass="bg-gradient-to-br from-[#35344A] to-[#282736]"
                rotateClass="rotate-[4deg]"
                className="bottom-[10%] left-[20%]"
                delay={0.8}
              >
                <div className="flex items-center gap-3 text-[#E67B27]">
                  <CheckSquare className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-[0_0_8px_rgba(230,123,39,0.4)]" />
                  <span className="text-lg sm:text-2xl font-semibold tracking-wide text-white">
                    Tasks
                  </span>
                </div>
              </FloatingCard>

              {/* Documents Card */}
              <FloatingCard
                colorClass="bg-gradient-to-br from-[#35344A] to-[#282736]"
                rotateClass="-rotate-[6deg]"
                className="bottom-[5%] right-[10%]"
                delay={1.0}
              >
                <div className="flex items-center gap-3 text-[#E67B27]">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-[0_0_8px_rgba(230,123,39,0.4)]" />
                  <span className="text-lg sm:text-2xl font-semibold tracking-wide text-white">
                    Documents
                  </span>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
