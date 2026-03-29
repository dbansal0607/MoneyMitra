'use client'
import { motion } from 'framer-motion'

export default function DashboardMockup() {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: [0, -15, 0], opacity: 1 }}
      transition={{ 
        y: { repeat: Infinity, duration: 8, ease: "easeInOut" },
        opacity: { duration: 1 }
      }}
      className="relative z-10 w-full rounded-2xl border border-white/10 bg-surface/80 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden aspect-[16/9] flex items-center justify-center p-6 backdrop-blur-xl"
    >
      <div className="absolute top-0 left-0 w-full h-12 bg-surface/50 border-b border-white/10 flex items-center px-4 gap-3">
        <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF4C4C]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-[#00FF87]" />
        </div>
        <div className="ml-4 flex-1 max-w-sm h-6 bg-white/5 rounded-full border border-white/5" />
      </div>
      
      {/* Mock inner content */}
      <div className="w-full h-full mt-10 grid grid-cols-5 gap-6">
        {/* Sidebar Mock */}
        <div className="col-span-1 hidden md:flex flex-col gap-4 border-r border-white/5 pr-4 pt-4">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00FF87] to-green-600" />
                <div className="w-20 h-5 bg-white/10 rounded" />
            </div>
            <div className="w-full h-10 bg-white/10 rounded-lg border border-white/10" />
            <div className="w-3/4 h-8 bg-white/5 rounded-md" />
            <div className="w-5/6 h-8 bg-white/5 rounded-md" />
            <div className="w-4/5 h-8 bg-white/5 rounded-md" />
        </div>
        {/* Main Area Mock */}
        <div className="col-span-5 md:col-span-4 flex flex-col gap-6 pt-4">
           {/* Top Stats Row */}
           <div className="flex gap-4">
               <div className="w-1/3 h-28 bg-[#111827] rounded-2xl border border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-between p-4">
                    <div className="w-16 h-4 bg-white/20 rounded" />
                    <div className="w-24 h-8 bg-white text-white font-bold rounded" />
                    <svg className="absolute bottom-0 left-0 w-full h-1/2" preserveAspectRatio="none">
                        <path d="M 0 50 Q 50 10 100 40 T 200 20 L 200 100 L 0 100 Z" fill="url(#gradPurple)" opacity="0.2" />
                        <path d="M 0 50 Q 50 10 100 40 T 200 20" fill="none" stroke="#7C6BFF" strokeWidth="3" />
                    </svg>
               </div>
               <div className="w-1/3 h-28 bg-[#111827] rounded-2xl border border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-between p-4">
                    <div className="w-16 h-4 bg-white/20 rounded" />
                    <div className="w-24 h-8 bg-white text-white font-bold rounded" />
                    <svg className="absolute bottom-0 left-0 w-full h-1/2" preserveAspectRatio="none">
                        <path d="M 0 40 Q 50 50 100 20 T 200 30 L 200 100 L 0 100 Z" fill="url(#gradGreen)" opacity="0.2" />
                        <path d="M 0 40 Q 50 50 100 20 T 200 30" fill="none" stroke="#00FF87" strokeWidth="3" />
                    </svg>
               </div>
               <div className="w-1/3 h-28 bg-[#111827] rounded-2xl border border-white/10 shadow-lg flex flex-col justify-between p-4">
                    <div className="w-16 h-4 bg-white/20 rounded" />
                    <div className="flex justify-between items-end">
                       <div className="w-24 h-8 bg-white rounded" />
                       <div className="w-10 h-10 rounded-full border-[4px] border-[#7C6BFF] border-t-transparent" />
                    </div>
               </div>
           </div>
           {/* Big Chart Row */}
           <div className="w-full h-[55%] bg-[#111827] rounded-2xl border border-white/10 shadow-lg relative overflow-hidden p-6">
                <div className="w-32 h-5 bg-white/20 rounded mb-4" />
                <div className="absolute bottom-0 left-0 w-full h-[80%]">
                    <svg width="0" height="0">
                        <defs>
                            <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#00FF87" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#00FF87" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="gradPurple" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#7C6BFF" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#7C6BFF" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
                        {/* Grid lines */}
                        <line x1="0" y1="50" x2="1000" y2="50" stroke="white" strokeOpacity="0.05" />
                        <line x1="0" y1="150" x2="1000" y2="150" stroke="white" strokeOpacity="0.05" />
                        <line x1="0" y1="250" x2="1000" y2="250" stroke="white" strokeOpacity="0.05" />
                        
                        {/* Main line chart mimicking the Karla Trading UI (staircase style optionally, but smooth is preferred in modern finance) */}
                        <path d="M 0 250 L 100 240 L 200 260 L 300 180 L 400 190 L 500 120 L 600 140 L 700 80 L 800 280 L 850 150 L 950 100 L 1000 50 L 1000 300 L 0 300 Z" fill="url(#gradGreen)" />
                        <path d="M 0 250 L 100 240 L 200 260 L 300 180 L 400 190 L 500 120 L 600 140 L 700 80 L 800 280 L 850 150 L 950 100 L 1000 50" fill="none" stroke="#00FF87" strokeWidth="4" className="drop-shadow-[0_0_12px_rgba(0,255,135,0.6)]" />
                        
                        {/* Tooltip dot */}
                        <circle cx="700" cy="80" r="8" fill="#111827" stroke="#00FF87" strokeWidth="4" className="drop-shadow-[0_0_8px_rgba(0,255,135,1)]" />
                    </svg>
                </div>
           </div>
        </div>
      </div>
    </motion.div>
  )
}
