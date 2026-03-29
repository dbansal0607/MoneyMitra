'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Lock, Mail, ShieldCheck, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            router.push('/dashboard')
        }, 1500)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#0A0515] font-sans selection:bg-[#9B51E0] selection:text-white relative overflow-hidden px-4">
            {/* Same Background from Landing Page */}
            <div className="absolute top-[-20%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_80%_0%,_#3C137F_0%,_transparent_60%)] pointer-events-none z-0 mix-blend-screen opacity-70" />
            <div className="absolute inset-0 bg-[#0A0515]/80 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0 opacity-30" />
            
            {/* Header / Nav */}
            <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-6 sm:px-10 py-8 z-50">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                        <ChevronLeft className="w-4 h-4 text-white/70" />
                    </div>
                    <span className="text-[#a294b4] text-sm font-semibold tracking-wide group-hover:text-white transition-colors">Back to Home</span>
                </Link>
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
            </nav>

            <motion.div initial={{opacity:0, y:20, scale:0.95}} animate={{opacity:1, y:0, scale:1}} transition={{duration: 0.5}} className="w-full max-w-[440px] z-10 relative">
                
                {/* Visual Graphic Ring */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#9B51E0]/20 blur-[40px] rounded-full pointer-events-none" />

                <div className="bg-[#120524]/60 backdrop-blur-xl border border-[#9B51E0]/20 rounded-[32px] p-8 sm:p-10 shadow-[0_0_60px_rgba(60,19,127,0.4)]">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-medium text-white tracking-tight mb-3">
                            Welcome Back
                        </h1>
                        <p className="text-[#a294b4] text-[14px] font-medium leading-relaxed">Sign in to access your AI-powered portfolio analytics dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-4">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-white/30 group-focus-within:text-[#9B51E0] transition-colors" />
                                </div>
                                <input 
                                    type="email" 
                                    required
                                    className="block w-full pl-12 pr-4 py-4 bg-[#0A0515]/50 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#9B51E0] focus:border-[#9B51E0] transition-all font-medium text-[15px]" 
                                    placeholder="name@company.com" 
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-white/30 group-focus-within:text-[#9B51E0] transition-colors" />
                                </div>
                                <input 
                                    type="password" 
                                    required
                                    className="block w-full pl-12 pr-4 py-4 bg-[#0A0515]/50 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#9B51E0] focus:border-[#9B51E0] transition-all font-medium text-[15px]" 
                                    placeholder="••••••••" 
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-[13px] font-semibold">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded bg-[#0A0515] border-white/20 text-[#9B51E0] focus:ring-[#9B51E0]/50" />
                                <span className="text-[#a294b4] group-hover:text-white transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-[#9B51E0] hover:text-[#c4b5d6] transition-colors">Reset Password</a>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full flex items-center justify-center py-4 px-4 mt-8 border border-[#9B51E0]/50 rounded-2xl text-white bg-[#3C137F]/60 backdrop-blur-md hover:bg-[#3C137F] hover:border-[#9B51E0] focus:outline-none shadow-[0_0_20px_rgba(155,81,224,0.3)] font-bold text-[15px] transition-all disabled:opacity-70 group"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 border-[2px] border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Decrypting Keys...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span>Access Dashboard</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 flex justify-center items-center gap-2 text-[#a294b4]/60 text-[11px] font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Encryption
                </div>
            </motion.div>
        </main>
    )
}
