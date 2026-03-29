'use client'
import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { UploadCloud, CheckCircle2, ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useAppStore } from '@/store/appStore'

function PortfolioFlow() {
  const [file, setFile] = useState<File | null>(null)
  const setPdfFile = useAppStore(state => state.setPdfFile)
  const router = useRouter()

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setPdfFile(e.target.files[0])
      setTimeout(() => {
          router.push('/terminal?flow=portfolio')
      }, 1500)
    }
  }

  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="w-full max-w-2xl bg-[#120524]/60 backdrop-blur-xl p-10 rounded-[32px] border border-[#9B51E0]/20 shadow-[0_0_60px_rgba(60,19,127,0.3)] flex flex-col items-center relative z-10">
      
      {/* Visual Graphic Ring */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#9B51E0]/20 blur-[40px] rounded-full pointer-events-none" />

      <h2 className="text-3xl font-medium text-white mb-4 tracking-tight">Analyze Your Portfolio</h2>
      <p className="text-[#a294b4] mb-8 text-center text-[15px] font-medium leading-relaxed">Upload your CAMS or KFintech Consolidated Account Statement (CAS) in PDF format.</p>
      
      <label className="w-full relative cursor-pointer group">
        <input type="file" accept="application/pdf" className="hidden" onChange={handleUpload} />
        <div className={`w-full aspect-[2/1] border-2 border-dashed ${file ? 'border-[#9B51E0] bg-[#3C137F]/20' : 'border-white/10 bg-[#0A0515]/50 hover:border-[#9B51E0]/50 hover:bg-[#3C137F]/10'} rounded-2xl flex flex-col items-center justify-center transition-all`}>
           {file ? (
             <motion.div initial={{scale:0}} animate={{scale:1}} className="flex flex-col items-center gap-3">
               <div className="w-16 h-16 rounded-full bg-[#3C137F]/40 flex items-center justify-center border border-[#9B51E0]/50 shadow-[0_0_20px_rgba(155,81,224,0.4)]">
                 <CheckCircle2 className="w-8 h-8 text-[#9B51E0]" />
               </div>
               <span className="text-white font-medium text-lg mt-2">{file.name}</span>
               <span className="text-[#9B51E0] text-[11px] uppercase tracking-[0.2em] font-bold animate-pulse">ENCRYPTING & UPLOADING...</span>
             </motion.div>
           ) : (
             <div className="flex flex-col items-center gap-4 text-[#a294b4] group-hover:text-white transition-colors">
               <UploadCloud className="w-14 h-14 mb-2 text-white/30 group-hover:text-[#9B51E0] transition-colors" />
               <span className="font-semibold text-lg text-white">Click or drag and drop your PDF here</span>
               <span className="text-sm font-medium">We do not store your data permanently.</span>
             </div>
           )}
        </div>
      </label>
    </motion.div>
  )
}

function HealthFlow() {
    const questions = [
        { key: 'monthly_income', text: 'What is your monthly take-home income?', type: 'number', prefix: '₹' },
        { key: 'monthly_expenses', text: 'What are your monthly essential expenses?', type: 'number', prefix: '₹' },
        { key: 'liquid_savings', text: 'Total liquid savings (Savings A/c, FDs, Liquid MFs)?', type: 'number', prefix: '₹' },
        { key: 'monthly_emis', text: 'Total monthly EMIs on outstanding loans?', type: 'number', prefix: '₹' },
        { key: 'age', text: 'What is your current age?', type: 'number' },
    ]
    
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<Record<string, number>>({})
    const setHealthProfile = useAppStore(state => state.setHealthProfile)
    const router = useRouter()
    
    const nextStep = (e: React.FormEvent) => {
        e.preventDefault()
        if (step < questions.length - 1) {
            setStep(s => s + 1)
        } else {
            setHealthProfile(answers)
            router.push('/terminal?flow=health')
        }
    }
    
    const currentQ = questions[step]
    
    return (
        <div className="w-full max-w-xl flex flex-col items-center relative z-10">
            {/* Visual Graphic Ring */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#9B51E0]/20 blur-[40px] rounded-full pointer-events-none" />

            <div className="w-full flex justify-between text-[#a294b4] text-[11px] font-bold uppercase tracking-widest mb-6 px-2">
                <span className="text-[#9B51E0]">Health Score Assessment</span>
                <span>Step {step + 1} of {questions.length}</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full mb-12 overflow-hidden">
                <motion.div 
                    className="h-full bg-gradient-to-r from-[#3C137F] to-[#9B51E0] rounded-full shadow-[0_0_10px_rgba(155,81,224,0.8)]" 
                    initial={{ width: 0 }} 
                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }} 
                />
            </div>
            
            <AnimatePresence mode="wait">
                <motion.form 
                    key={step} 
                    initial={{x:50, opacity:0}} 
                    animate={{x:0, opacity:1}} 
                    exit={{x:-50, opacity:0}}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onSubmit={nextStep}
                    className="w-full bg-[#120524]/60 backdrop-blur-xl p-8 sm:p-12 rounded-[32px] border border-[#9B51E0]/20 shadow-[0_0_60px_rgba(60,19,127,0.4)] flex flex-col"
                >
                    <h2 className="text-2xl sm:text-[28px] font-medium text-white mb-8 leading-tight tracking-tight">{currentQ.text}</h2>
                    <div className="relative mb-10 group">
                        {currentQ.prefix && <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 text-2xl font-semibold group-focus-within:text-[#9B51E0] transition-colors">{currentQ.prefix}</span>}
                        <input 
                            type={currentQ.type} 
                            autoFocus
                            required
                            className={`w-full bg-[#0A0515]/50 border border-white/10 focus:border-[#9B51E0] rounded-2xl px-6 py-5 text-3xl text-white font-medium outline-none focus:ring-1 focus:ring-[#9B51E0] transition-all ${currentQ.prefix ? 'pl-16' : ''}`}
                            value={answers[currentQ.key] || ''}
                            onChange={e => setAnswers({...answers, [currentQ.key]: Number(e.target.value)})}
                        />
                    </div>
                    <button type="submit" className="w-full bg-[#3C137F]/60 backdrop-blur-md hover:bg-[#3C137F] border border-[#9B51E0]/50 text-white font-bold py-5 rounded-2xl transition-all shadow-[0_0_20px_rgba(155,81,224,0.3)] text-[15px] disabled:opacity-50">
                        {step === questions.length - 1 ? 'Analyze My Health' : 'Continue'}
                    </button>
                </motion.form>
            </AnimatePresence>
        </div>
    )
}

function OnboardingContent() {
  const searchParams = useSearchParams()
  const flow = searchParams.get('flow') || 'portfolio'
  
  if (flow === 'portfolio') return <PortfolioFlow />
  if (flow === 'health') return <HealthFlow />
  return <PortfolioFlow />
}

export default function Onboarding() {
  return (
    <main className="min-h-screen bg-[#0A0515] font-sans selection:bg-[#9B51E0] selection:text-white flex flex-col items-center pt-32 pb-16 px-6 relative overflow-hidden">
      
      {/* Background Aureon Theme elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_80%_0%,_#3C137F_0%,_transparent_60%)] pointer-events-none z-0 mix-blend-screen opacity-70" />
      <div className="absolute inset-0 bg-[#0A0515]/80 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0 opacity-30" />

      {/* Unified Aureon Navbar */}
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

      <div className="flex-1 w-full flex flex-col items-center justify-center z-10">
        <Suspense fallback={<div className="text-white">Loading...</div>}>
           <OnboardingContent />
        </Suspense>
      </div>

    </main>
  )
}
