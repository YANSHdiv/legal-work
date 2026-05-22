import { FloatingCard } from "@/components/FloatingCard";
import { Receipt, Gavel, CheckSquare, FileText } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950">
      {/* Background Blurred Shapes */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-10 right-[-10%] w-[60%] h-[200px] bg-slate-100 dark:bg-slate-800 rounded-[100px] blur-3xl opacity-60 rotate-[-10deg]" />
        <div className="absolute top-[30%] right-[-5%] w-[50%] h-[180px] bg-indigo-50 dark:bg-indigo-900/20 rounded-[100px] blur-3xl opacity-60 rotate-[5deg]" />
        <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[150px] bg-slate-100 dark:bg-slate-800 rounded-[100px] blur-3xl opacity-60 rotate-[-15deg]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 min-h-[600px]">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center max-w-xl z-10">
            <h1 className="text-5xl lg:text-7xl font-medium tracking-tight text-slate-800 dark:text-slate-100 leading-[1.1] mb-6">
              A single platform to <br />
              <span className="font-semibold text-slate-900 dark:text-white">manage</span> every part of <br />
              your <span className="font-semibold text-indigo-500 dark:text-indigo-400">legal work</span>
            </h1>
            <p className="text-lg text-blue-600/80 dark:text-blue-400/80 leading-relaxed max-w-md">
              Track matters, coordinate schedules, manage clients, centralize
              documents, and handle communication - all in one system.
            </p>
          </div>

          {/* Right Content - Floating Elements Visualization */}
          <div className="w-full lg:w-1/2 relative h-[500px] hidden md:block">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Billing Card */}
              <FloatingCard
                colorClass="bg-[#3B5BDB]" // Specific blue from design
                rotateClass="rotate-[12deg]"
                icon={<Receipt className="w-7 h-7" />}
                label="Billing"
                className="top-[10%] right-[15%] z-20"
                delay={0.1}
              />

              {/* Matters Card */}
              <FloatingCard
                colorClass="bg-[#E67E22]" // Specific orange
                rotateClass="-rotate-[12deg]"
                icon={<Gavel className="w-7 h-7" />}
                label="Matters"
                className="top-[45%] left-[0%] z-20"
                delay={0.2}
              />

              {/* Tasks Card */}
              <FloatingCard
                colorClass="bg-[#2C2B3C]" // Dark slate
                rotateClass="rotate-[4deg]"
                icon={<CheckSquare className="w-7 h-7 text-[#E67E22]" />}
                label="Tasks"
                className="bottom-[10%] left-[20%] z-30"
                delay={0.3}
              >
                <div className="flex items-center gap-3 text-white">
                  <CheckSquare className="w-6 h-6 sm:w-8 sm:h-8 text-[#E67E22]" />
                  <span className="text-lg sm:text-2xl font-semibold tracking-wide text-[#E67E22]">
                    Tasks
                  </span>
                </div>
              </FloatingCard>

              {/* Documents Card */}
              <FloatingCard
                colorClass="bg-[#2C2B3C]" // Dark slate
                rotateClass="-rotate-[8deg]"
                className="bottom-[5%] right-[5%] z-20"
                delay={0.4}
              >
                <div className="flex items-center gap-3 text-white">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-[#E67E22]" />
                  <span className="text-lg sm:text-2xl font-semibold tracking-wide text-[#E67E22]">
                    Documents
                  </span>
                </div>
              </FloatingCard>

              {/* Profile/Notification Card (John Doe) */}
              <FloatingCard
                colorClass="bg-[#A5B4FC] dark:bg-[#4338CA]" // Light purple
                rotateClass="-rotate-[4deg]"
                className="top-[55%] right-[25%] z-40 p-0 overflow-hidden !rounded-2xl"
                delay={0.5}
              >
                <div className="flex bg-[#A5B4FC] dark:bg-[#3730A3] pr-6 pl-0 py-3 rounded-2xl items-center gap-4 max-w-xs shadow-lg border border-white/20">
                   <div className="w-1.5 h-16 bg-orange-500 rounded-r-md"></div>
                  <div className="w-12 h-12 bg-white/30 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center">
                     <span className="text-2xl">👨🏽‍🦱</span>
                  </div>
                  <div className="flex flex-col text-slate-800 dark:text-slate-100">
                    <span className="text-sm font-semibold">
                      John Doe - Portal
                    </span>
                    <span className="text-xs opacity-75 mt-0.5 leading-tight">
                      Hey! Could you please review a document for me?
                    </span>
                    <span className="text-[10px] opacity-60 mt-1 uppercase tracking-wide">
                      MAT-2233 - 2 h ago
                    </span>
                  </div>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
