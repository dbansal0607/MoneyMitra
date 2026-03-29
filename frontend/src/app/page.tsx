import Link from 'next/link'
import { Sparkles, Bell, User, Search, Home as HomeIcon, PieChart, Lock, Settings } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex min-h-[120vh] flex-col items-center overflow-x-hidden bg-[#0A0515] font-sans selection:bg-[#9B51E0] selection:text-white">
      
      {/* Massive Top Right Violet Glow Area */}
      <div className="fixed top-[-20%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_80%_0%,_#3C137F_0%,_transparent_60%)] pointer-events-none z-0 mix-blend-screen opacity-70" />
      <div className="fixed top-0 right-1/4 w-[1px] h-[30vh] bg-gradient-to-b from-[#FFF] to-transparent pointer-events-none rotate-[25deg] opacity-40 mix-blend-overlay shadow-[0_0_20px_#FFF]" />

      {/* Grid Background Overlay */}
      <div className="fixed inset-0 bg-[#0A0515]/80 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0 opacity-30" />

      {/* Navbar integrated for Aureon aesthetic */}
      <nav className="w-full absolute top-0 left-0 flex items-center justify-between px-10 py-8 z-50 max-w-7xl mx-auto left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect x="2" y="2" width="8" height="8" rx="2" fill="#EAEAEA"/>
                 <rect x="14" y="2" width="8" height="8" rx="2" fill="#EAEAEA"/>
                 <rect x="2" y="14" width="8" height="8" rx="2" fill="#EAEAEA"/>
                 <rect x="14" y="14" width="8" height="8" rx="2" fill="#EAEAEA" fillOpacity="0.3"/>
                 <circle cx="18" cy="18" r="4" fill="#9B51E0" />
              </svg>
              <span className="text-[#EAEAEA] text-[17px] font-bold tracking-tight ml-1">MoneyMitra</span>
          </div>
          
          <div className="hidden md:flex flex-1 justify-center gap-8 text-[#EAEAEA] text-[13px] font-semibold tracking-wide">
              <a href="#" className="hover:text-[#9B51E0] transition-colors">Home</a>
              <a href="#features" className="text-white/60 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-white/60 hover:text-white transition-colors">Pricing</a>
              <a href="#blog" className="text-white/60 hover:text-white transition-colors">Blog</a>
              <a href="#contact" className="text-white/60 hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-6">
              <Link href="/onboarding" className="text-[#EAEAEA] text-[13px] font-bold tracking-wide border border-white/20 px-6 py-2.5 rounded-full hover:bg-white/10 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)] bg-[#1A0A2E]/50 backdrop-blur-md">
                Try for free
              </Link>
          </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center pt-32 sm:pt-44 overflow-visible z-10 px-4">
        <h1 className="text-[44px] sm:text-[64px] lg:text-[76px] xl:text-[86px] font-medium text-[#c4b5d6] leading-[1.1] tracking-tight mb-6 sm:mb-8 max-w-4xl text-center">
            Smarter Mutual Fund<br/> 
            Investing <span className="text-white">Starts With Powerful AI</span>
        </h1>
        
        <p className="text-[#a294b4] text-[15px] sm:text-[17px] md:text-[19px] font-medium max-w-2xl text-center leading-[1.6] mb-10 sm:mb-12">
            Where Artificial Intelligence Meets Financial Precision. Let MoneyMitra's LangGraph Agents parse, analyze, and rebalance your CAMS Statements instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16 sm:mb-20 relative z-20">
            <Link href="/onboarding" className="w-full sm:w-auto text-center text-[#EAEAEA] text-[14px] font-bold tracking-wide border border-[#9B51E0]/50 px-8 py-3.5 rounded-full bg-[#3C137F]/40 backdrop-blur-md hover:bg-[#3C137F]/70 hover:border-[#9B51E0] transition-all focus:outline-none shadow-[0_0_30px_rgba(155,81,224,0.3)] hover:shadow-[0_0_40px_rgba(155,81,224,0.5)]">
               Try for free
            </Link>
            <a href="#features" className="w-full sm:w-auto text-center text-[#EAEAEA] text-[14px] font-semibold tracking-wide border border-white/10 px-8 py-3.5 rounded-full bg-white/[0.02] backdrop-blur-md hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
               Explore Products <span className="text-lg leading-none pt-0.5">›</span>
            </a>
        </div>
        
        {/* Floating Sparkles in the air */}
        <div className="absolute top-[480px] left-1/3 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_#FFF] animate-pulse" />
        <div className="absolute top-[520px] left-1/4 w-1 h-1 bg-[#9B51E0] rounded-full shadow-[0_0_8px_#9B51E0]" />
        <div className="absolute top-[500px] right-1/3 w-1.5 h-1.5 bg-[#FEA332] rounded-full shadow-[0_0_10px_#FEA332] animate-pulse" />
        <div className="absolute top-[460px] right-1/4 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_#white]" />        {/* Diagonal Glowing Light Beams */}
        <div className="absolute top-[400px] left-[-20%] w-[150%] h-[500px] bg-gradient-to-r from-transparent via-[#E8488E]/10 to-transparent -rotate-12 blur-[80px] pointer-events-none z-0" />
        <div className="absolute top-[500px] left-[-10%] w-[120%] h-[600px] bg-gradient-to-r from-[#FEA332]/5 via-[#E8488E]/10 to-transparent rotate-[25deg] blur-[100px] pointer-events-none z-0" />
        
        {/* The Massive 3D Predictive Chart (Moved from Explore) */}
        <div className="relative w-full max-w-[1200px] mt-16 h-[500px] md:h-[650px] perspective-[2000px] z-20 mb-20 mx-auto">
            <div className="w-full h-full bg-[#05020A]/90 backdrop-blur-2xl border border-white/5 rounded-[32px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative group transform-gpu transition-transform duration-1000 rotate-x-[15deg] rotate-y-[-10deg] hover:!transform-none">
                
                {/* Subtle Grid Background inside Panel */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
                
                {/* Sidebar Mockup inside the Chart */}
                <div className="absolute left-0 top-0 w-24 h-full border-r border-[#9B51E0]/20 bg-[#0A0515]/80 flex flex-col items-center py-8 gap-8 z-30">
                    <div className="w-10 h-10 rounded-xl bg-[#9B51E0]/20 border border-[#9B51E0]/50 flex items-center justify-center text-[#9B51E0] shadow-[0_0_15px_rgba(155,81,224,0.5)]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    </div>
                    <div className="w-6 h-6 rounded border border-white/20 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"></div>
                    <div className="w-6 h-6 rounded border border-white/20 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"></div>
                    <div className="mt-auto w-6 h-6 rounded border border-white/20 opacity-40 hover:opacity-100 transition-opacity cursor-pointer"></div>
                </div>

                {/* Header Mockup inside the Chart */}
                <div className="absolute top-0 left-24 right-0 h-20 border-b border-[#9B51E0]/20 bg-[#120524]/80 flex items-center justify-between px-8 z-20">
                    <div className="flex gap-4 items-center">
                        <div className="px-4 py-1.5 rounded-full bg-white/5 text-[#a294b4] text-xs font-bold border border-[#9B51E0]/30 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#E8488E] animate-pulse" /> Live Feed
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-50"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></div>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-50"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>
                    </div>
                </div>

                {/* SVG Chart Area */}
                <div className="absolute inset-x-24 inset-y-20 p-0 h-full overflow-hidden">
                    <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="none" className="overflow-visible">
                        <defs>
                            <linearGradient id="glowPink" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#E8488E" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="#0A0515" stopOpacity="0"/>
                            </linearGradient>
                            <linearGradient id="glowBlue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#4F8BFF" stopOpacity="0.2"/>
                                <stop offset="100%" stopColor="#0A0515" stopOpacity="0"/>
                            </linearGradient>
                            <linearGradient id="glowOrange" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FEA332" stopOpacity="0.4"/>
                                <stop offset="100%" stopColor="#0A0515" stopOpacity="0"/>
                            </linearGradient>
                        </defs>

                        {/* Pink Path (Bottom) */}
                        <g className="animate-[slideRight_6s_linear_infinite]">
                            <path d="M-200,350 Q0,350 100,280 T400,350 T650,220 T1000,100 L1000,400 L-200,400 Z" fill="url(#glowPink)" />
                            <path d="M-200,350 Q0,350 100,280 T400,350 T650,220 T1000,100" fill="none" stroke="#E8488E" strokeWidth="2" strokeLinecap="round" style={{ filter: 'drop-shadow(0px 0px 8px rgba(232,72,142,0.8))' }} />
                            
                            {/* Glowing Node Pink */}
                            <circle cx="650" cy="220" r="4" fill="#E8488E" stroke="#fff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px #E8488E)' }}>
                                <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
                            </circle>
                            {/* Price Tag Pink */}
                            <g transform="translate(670, 205)">
                                <rect width="80" height="24" rx="12" fill="#0A0515" stroke="#E8488E" strokeWidth="1" />
                                <text x="12" y="16" fill="#fff" fontSize="12" fontWeight="bold" fontFamily="monospace">$3.43K</text>
                                <circle cx="70" cy="12" r="3" fill="#E8488E" />
                            </g>
                            
                            <line x1="650" y1="220" x2="650" y2="400" stroke="#E8488E" strokeDasharray="4 4" opacity="0.4" />
                        </g>

                        {/* Blue Path (Middle) */}
                        <g className="animate-[slideRight_8s_linear_infinite]" opacity="0.8">
                            <path d="M-200,300 Q100,200 300,280 T700,150 T900,200 T1200,50 L1200,400 L-200,400 Z" fill="url(#glowBlue)" />
                            <path d="M-200,300 Q100,200 300,280 T700,150 T900,200 T1200,50" fill="none" stroke="#4F8BFF" strokeWidth="2" strokeLinecap="round" style={{ filter: 'drop-shadow(0px 0px 8px rgba(79,139,255,0.8))' }} />
                            
                            <circle cx="700" cy="150" r="4" fill="#4F8BFF" stroke="#fff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px #4F8BFF)' }} />
                            <g transform="translate(720, 135)">
                                <rect width="80" height="24" rx="12" fill="#0A0515" stroke="#4F8BFF" strokeWidth="1" />
                                <text x="12" y="16" fill="#fff" fontSize="12" fontWeight="bold" fontFamily="monospace">$6.98K</text>
                                <circle cx="70" cy="12" r="3" fill="#4F8BFF" />
                            </g>
                            <line x1="700" y1="150" x2="700" y2="400" stroke="#4F8BFF" strokeDasharray="4 4" opacity="0.4" />
                        </g>

                        {/* Orange Path (Top) */}
                        <g className="animate-[slideRight_12s_linear_infinite]" opacity="0.9">
                            <path d="M-200,250 Q150,300 450,150 T800,80 T1100,20 T1300,-50 L1300,400 L-200,400 Z" fill="url(#glowOrange)" />
                            <path d="M-200,250 Q150,300 450,150 T800,80 T1100,20 T1300,-50" fill="none" stroke="#FEA332" strokeWidth="3" strokeLinecap="round" style={{ filter: 'drop-shadow(0px 0px 12px rgba(254,163,50,1))' }} />
                            
                            <circle cx="800" cy="80" r="5" fill="#FEA332" stroke="#fff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 15px #FEA332)' }}>
                                <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                            <g transform="translate(660, 65)">
                                <rect width="100" height="30" rx="15" fill="#120524" stroke="#FEA332" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 10px rgba(254,163,50,0.3))' }} />
                                <text x="16" y="20" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="monospace">$14.22K</text>
                                <circle cx="84" cy="15" r="4" fill="#FEA332" ><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite" /></circle>
                            </g>
                            <line x1="800" y1="80" x2="800" y2="400" stroke="#FEA332" strokeDasharray="4 4" opacity="0.6" />
                            
                            <circle cx="450" cy="150" r="4" fill="#FEA332" stroke="#fff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px #FEA332)' }} />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
      </section>

      {/* CSS Animations for Marquee and Floating */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes slideRight {
            from { transform: translateX(0); }
            to { transform: translateX(-300px); }
        }
        @keyframes float3D {
            0%, 100% { transform: translateY(0px) rotateX(15deg) rotateY(-10deg); }
            50% { transform: translateY(-20px) rotateX(20deg) rotateY(-5deg); }
        }
      `}} />

      {/* National Level Architecture & Features Bento */}
      <section id="features" className="w-full relative py-32 flex flex-col items-center px-4 overflow-hidden">
         {/* Background Glows */}
         <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-[#9B51E0]/5 blur-[120px] rounded-full pointer-events-none" />
         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#E8488E]/5 blur-[100px] rounded-full pointer-events-none" />
         
         <div className="text-center mb-20 relative z-10">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3C137F]/20 border border-[#9B51E0]/30 text-[#c4b5d6] text-[11px] font-bold uppercase tracking-[0.2em] mb-6 shadow-[0_0_20px_rgba(155,81,224,0.3)]">
                 <span className="w-2 h-2 rounded-full bg-[#9B51E0] animate-ping" />
                 National-Grade Infrastructure
             </div>
             <h2 className="text-[44px] md:text-[64px] font-medium text-white tracking-tight mb-6 leading-tight">
                 LangGraph <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B51E0] to-[#E8488E]">Architecture</span>
             </h2>
             <p className="text-[#a294b4] text-xl max-w-2xl mx-auto font-medium">
                 We don't just calculate your net worth. 6 autonomous AI agents orchestrate a complete teardown of your financial life. Every feature built for scale.
             </p>
         </div>

         {/* 3D Bento Box Grid */}
         <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 max-w-7xl w-full relative z-10" style={{ perspective: '1200px' }}>
            
            {/* Box 1 (Large - 2x2 on Desktop / Top Left) - Live XIRR Tracking vs Benchmarks */}
            <div className="md:col-span-2 md:row-span-2 group relative bg-[#120524]/80 backdrop-blur-2xl border border-white/5 rounded-[40px] p-8 hover:border-[#9B51E0]/50 transition-all duration-700 overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_rgba(155,81,224,0.15)] hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Real-Time XIRR</h3>
                <p className="text-[#a294b4] font-medium mb-12 max-w-sm">Watch your internal rate of return continuously benchmarked against Nifty 50 and 500 in real-time.</p>
                
                {/* Simulated Chart Animation */}
                <div className="w-full h-48 relative border-b border-l border-white/10 flex items-end opacity-80 group-hover:opacity-100 transition-opacity duration-1000">
                    <svg className="absolute bottom-0 w-full h-[150%] overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="glowLine" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#00FF87" stopOpacity="0.4"/>
                                <stop offset="100%" stopColor="#00FF87" stopOpacity="0"/>
                            </linearGradient>
                        </defs>
                        <path d="M0,45 C20,40 30,20 50,25 C70,30 80,5 100,10 L100,50 L0,50 Z" fill="url(#glowLine)" />
                        <path d="M0,45 C20,40 30,20 50,25 C70,30 80,5 100,10" fill="none" stroke="#00FF87" strokeWidth="1" strokeLinecap="round" strokeDasharray="200" strokeDashoffset="200" className="group-hover:animate-[drawChart_2s_ease-out_forwards]" style={{ filter: 'drop-shadow(0px -2px 10px rgba(0, 255, 135, 0.8))' }} />
                        <path d="M0,50 C20,50 30,40 50,45 C70,50 80,25 100,30" fill="none" stroke="#a294b4" strokeWidth="0.5" strokeDasharray="4 4" />
                    </svg>
                    <div className="absolute right-0 top-10 bg-[#00FF87]/20 text-[#00FF87] px-3 py-1 rounded-full text-xs font-bold border border-[#00FF87]/50 shadow-[0_0_15px_rgba(0,255,135,0.4)] transform translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 delay-700">
                        +22.4% Alpha
                    </div>
                </div>
            </div>

            {/* Box 2 (1x1 Height / Top Center) - Health Score Ring */}
            <div className="md:col-span-1 md:row-span-1 group relative bg-[#120524]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-[#E8488E]/40 transition-all duration-500 overflow-hidden shadow-xl hover:-translate-y-1">
                <h3 className="text-lg font-bold text-white mb-1">Health Index</h3>
                <p className="text-[#a294b4] text-xs font-medium mb-4">6-axis portfolio diagnostic.</p>
                <div className="flex justify-center items-center w-full h-32 relative">
                    <svg viewBox="0 0 100 100" className="w-28 h-28 transform -rotate-90">
                        <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
                        <circle cx="50" cy="50" r="40" stroke="#E8488E" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray="251.2" strokeDashoffset="251.2" className="group-hover:animate-[fillRing_1.5s_ease-out_forwards]" style={{ filter: 'drop-shadow(0 0 8px rgba(232, 72, 142, 0.6))' }} />
                    </svg>
                    <span className="absolute text-3xl font-black text-white group-hover:text-[#E8488E] transition-colors duration-1000 delay-500">92</span>
                </div>
            </div>

            {/* Box 3 (1x1 Height / Top Right) - Overlap Intelligence */}
            <div className="md:col-span-1 md:row-span-1 group relative bg-[#0A0515] border border-[#4F8BFF]/20 rounded-3xl p-6 hover:bg-[#120524] transition-all duration-500 overflow-hidden shadow-xl">
                <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[#4F8BFF]/20 blur-[40px] rounded-full" />
                <h3 className="text-lg font-bold text-white mb-1 relative z-10">Overlap Defense</h3>
                <p className="text-[#4F8BFF] text-xs font-bold uppercase tracking-widest mb-6 relative z-10">Zero Redundancy</p>
                <div className="flex justify-center items-center h-24 relative z-10 group-hover:scale-110 transition-transform duration-500">
                    <div className="w-16 h-16 rounded-full border-2 border-[#4F8BFF] absolute transform -translate-x-4 mix-blend-screen bg-[#4F8BFF]/10 shadow-[0_0_20px_rgba(79,139,255,0.4)]" />
                    <div className="w-16 h-16 rounded-full border-2 border-[#E8488E] absolute transform translate-x-4 mix-blend-screen bg-[#E8488E]/10" />
                    <svg className="w-6 h-6 absolute text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </div>
            </div>

            {/* Box 4 (2x1 Width / Bottom Center+Right) - The Agentic PDF Scanner */}
            <div className="md:col-span-2 md:row-span-1 group relative bg-[#1A0A2E]/80 backdrop-blur-md border border-[#9B51E0]/20 rounded-3xl p-8 hover:border-[#9B51E0]/60 transition-all duration-700 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">CAMS PDF Vision</h3>
                    <p className="text-[#a294b4] text-sm font-medium">No manual entry. Upload decades of CAMS/KFintech statements in a second. Our vision agent extracts, categorizes, and injects your entire financial history instantly.</p>
                </div>
                <div className="w-32 h-32 bg-[#0A0515] rounded-2xl border border-white/10 relative overflow-hidden shrink-0 flex items-center justify-center shadow-inner">
                    <svg className="w-12 h-12 text-[#9B51E0] opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h6v6h6v10H6z"/></svg>
                    {/* Laser Scanner Line */}
                    <div className="absolute top-0 w-full h-1 bg-[#00FF87] shadow-[0_0_15px_#00FF87] group-hover:animate-[scan_2s_ease-in-out_infinite]" />
                </div>
            </div>

         </div>

         {/* Extra global CSS for the new SVG animations */}
         <style dangerouslySetInnerHTML={{__html: `
            @keyframes drawChart {
                to { stroke-dashoffset: 0; }
            }
            @keyframes fillRing {
                to { stroke-dashoffset: 20.096; /* 251.2 * (1 - 0.92) */ }
            }
            @keyframes scan {
                0% { top: 0%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 100%; opacity: 0; }
            }
         `}} />
      </section>

      {/* The Explore glowing chart section has been moved to the hero area above! */}

      {/* Blogs / Testimonials Marques 3D Effect */}
      <section id="blog" className="w-full py-32 overflow-hidden relative">
          <div className="text-center mb-16 relative z-10 px-4">
              <h2 className="text-[40px] md:text-[56px] font-medium text-white tracking-tight mb-4">
                  Trusted By <span className="text-[#9B51E0]">Visionaries</span>
              </h2>
              <p className="text-[#a294b4] text-lg max-w-xl mx-auto">
                  See what the top 1% of quantitative investors are saying about our LangGraph architecture.
              </p>
          </div>

          <div className="w-[200%] flex gap-6 px-6 animate-marquee" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
              {/* Duplicate the array twice for seamless marquee loop */}
              {[1, 2].map((loopIndex) => (
                  <div key={loopIndex} className="flex gap-6 shrink-0">
                      {[
                          { n: "David Chen", role: "Hedge Fund Manager", text: "The Aureon agentic parser cut down our statement processing from 4 days to exactly 12 seconds. Unbelievable.", img: "32" },
                          { n: "Sarah Jenkins", role: "Retail Investor", text: "I finally know what my exact XIRR is across 4 different broker platforms. The overlapping warning saved me from a massive tech crash.", img: "44" },
                          { n: "Marcus Thorne", role: "Quant Analyst", text: "The Monte Carlo simulation utilizing the Scipy library is more accurate than our expensive enterprise tooling.", img: "12" },
                          { n: "Elena Rostova", role: "FIRE Enthusiast", text: "Visualizing my trajectory to 2.5CR has never been clearer. The dark purple interface is absolutely stunning.", img: "28" },
                      ].map((t, i) => (
                          <div 
                              key={i} 
                              className="w-[380px] flex-shrink-0 bg-[#0A0515]/90 border border-white/5 rounded-3xl p-8 hover:bg-[#120524] transition-all duration-300 hover:-translate-y-2 hover:border-[#9B51E0]/30 shadow-xl group"
                          >
                              <div className="flex items-center gap-4 mb-6">
                                  <div className="w-12 h-12 rounded-full bg-[#1A0A2E] overflow-hidden border border-[#9B51E0]/40">
                                      <img src={`https://i.pravatar.cc/150?img=${t.img}`} alt={t.n} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-500" />
                                  </div>
                                  <div>
                                      <h4 className="text-white text-[15px] font-bold tracking-wide">{t.n}</h4>
                                      <p className="text-[#9B51E0] text-[11px] font-bold tracking-[0.1em] uppercase">{t.role}</p>
                                  </div>
                              </div>
                              <p className="text-[#a294b4] text-[15px] leading-[1.7] font-medium">"{t.text}"</p>
                          </div>
                      ))}
                  </div>
              ))}
          </div>
          
          {/* Overlay fades for marquee */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0A0515] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0A0515] to-transparent z-10 pointer-events-none" />
      </section>

      {/* Footer / Contact Section */}
      <footer id="contact" className="w-full bg-[#05020A] border-t border-white/5 pt-20 pb-10 px-6 sm:px-12 relative overflow-hidden z-20">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#3C137F]/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 mb-16 relative z-10">
              <div className="flex flex-col max-w-sm">
                  <div className="flex items-center gap-2 mb-6">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <rect x="2" y="2" width="8" height="8" rx="2" fill="#EAEAEA"/>
                         <rect x="14" y="2" width="8" height="8" rx="2" fill="#EAEAEA"/>
                         <rect x="2" y="14" width="8" height="8" rx="2" fill="#EAEAEA"/>
                         <rect x="14" y="14" width="8" height="8" rx="2" fill="#EAEAEA" fillOpacity="0.3"/>
                         <circle cx="18" cy="18" r="4" fill="#9B51E0" />
                      </svg>
                      <span className="text-white text-[22px] font-bold tracking-tight ml-1">MoneyMitra</span>
                  </div>
                  <p className="text-[#a294b4] text-sm leading-relaxed mb-8 font-medium">
                      The next generation Financial Life OS powered by LangGraph. Building smarter, faster, and more robust portfolios entirely through AI.
                  </p>
                  <div className="flex items-center gap-4">
                      {/* Fake Social Icons */}
                      <a href="#" className="w-10 h-10 rounded-full bg-[#120524] border border-white/10 flex items-center justify-center hover:bg-[#3C137F] hover:border-[#9B51E0] transition-all group">
                          <svg className="w-4 h-4 text-[#a294b4] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#120524] border border-white/10 flex items-center justify-center hover:bg-[#3C137F] hover:border-[#9B51E0] transition-all group">
                          <svg className="w-4 h-4 text-[#a294b4] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-[#120524] border border-white/10 flex items-center justify-center hover:bg-[#3C137F] hover:border-[#9B51E0] transition-all group">
                          <svg className="w-4 h-4 text-[#a294b4] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      </a>
                  </div>
              </div>

              <div className="flex gap-16">
                  <div className="flex flex-col gap-4">
                      <h4 className="text-white font-bold tracking-wide mb-2">Platform</h4>
                      <a href="#" className="text-[#a294b4] text-sm hover:text-[#9B51E0] transition-colors font-medium">Features</a>
                      <a href="#" className="text-[#a294b4] text-sm hover:text-[#9B51E0] transition-colors font-medium">Pricing</a>
                      <a href="#" className="text-[#a294b4] text-sm hover:text-[#9B51E0] transition-colors font-medium">Security</a>
                  </div>
                  <div className="flex flex-col gap-4">
                      <h4 className="text-white font-bold tracking-wide mb-2">Company</h4>
                      <a href="#" className="text-[#a294b4] text-sm hover:text-[#9B51E0] transition-colors font-medium">About Us</a>
                      <a href="#" className="text-[#a294b4] text-sm hover:text-[#9B51E0] transition-colors font-medium">Careers</a>
                      <a href="#" className="text-[#a294b4] text-sm hover:text-[#9B51E0] transition-colors font-medium">Blog</a>
                  </div>
                  <div className="flex flex-col gap-4">
                      <h4 className="text-white font-bold tracking-wide mb-2">Support</h4>
                      <a href="#" className="text-[#a294b4] text-sm hover:text-[#9B51E0] transition-colors font-medium">Help Center</a>
                      <a href="#" className="text-[#a294b4] text-sm hover:text-[#9B51E0] transition-colors font-medium">Contact Us</a>
                      <a href="#" className="text-[#a294b4] text-sm hover:text-[#9B51E0] transition-colors font-medium">contact@moneymitra.com</a>
                  </div>
              </div>
          </div>
          
          <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
              <p className="text-[#a294b4]/60 text-xs font-semibold">
                  © 2026 MoneyMitra Technologies. All rights reserved.
              </p>
              <div className="flex gap-6 text-[11px] text-[#a294b4]/60 font-semibold uppercase tracking-widest">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
          </div>
      </footer>

    </main>
  )
}
function ChevronLeft(props: any) {
    return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
    )
}
