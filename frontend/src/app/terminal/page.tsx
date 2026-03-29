'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import axios from 'axios'

const stepsPortfolio = [
  "Parsing your CAMS statement...",
  "Calculating your true XIRR...",
  "Detecting fund overlap...",
  "Scoring your financial health...",
  "Running 1000 Monte Carlo FIRE simulations...",
  "Generating your rebalancing action plan...",
  "Formulating your custom financial narrative..."
]

const stepsHealth = [
  "Processing your financial profile...",
  "Scoring your emergency fund & insurance...",
  "Running 1000 Monte Carlo FIRE simulations...",
  "Generating missing gap analysis...",
  "Formulating your custom financial narrative..."
]

function TerminalLogic() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const flow = searchParams.get('flow') || 'portfolio'
  
  const steps = flow === 'portfolio' ? stepsPortfolio : stepsHealth
  
  const pdfFile = useAppStore(state => state.pdfFile)
  const healthProfile = useAppStore(state => state.healthProfile)
  const setBackendResult = useAppStore(state => state.setBackendResult)
  
  const [currentStep, setCurrentStep] = useState(0)
  const [agentComplete, setAgentComplete] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  // Step Animation progress
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
        if (idx < steps.length - 1) {
            idx++;
            setCurrentStep(idx);
        } else {
            clearInterval(interval);
            setAnimationComplete(true);
        }
    }, 1500)
    return () => clearInterval(interval)
  }, [steps.length])

  // Actual Backend Trigger
  useEffect(() => {
      const runAgents = async () => {
          try {
             if (flow === 'portfolio' && pdfFile) {
                 const formData = new FormData()
                 formData.append('file', pdfFile)
                 formData.append('profile', JSON.stringify({}))
                 const res = await axios.post('http://localhost:8000/api/analyze-portfolio', formData)
                 setBackendResult(res.data)
                 setAgentComplete(true)
             } else if (flow === 'health' && healthProfile) {
                 const res = await axios.post('http://localhost:8000/api/health-score', healthProfile)
                 setBackendResult(res.data)
                 setAgentComplete(true)
             } else {
                 // Fallback if accessed via direct URL without PDF/Profile
                 setAgentComplete(true)
             }
          } catch(err) {
              console.error("Agent execution failed:", err)
              // Allow progression even if error
              setAgentComplete(true)
          }
      }
      runAgents()
  }, [flow, pdfFile, healthProfile, setBackendResult])
  
  // Dashboard routing logic
  useEffect(() => {
      if (agentComplete && animationComplete) {
          setTimeout(() => {
              router.push('/dashboard')
          }, 1000)
      }
  }, [agentComplete, animationComplete, router])

  return (
    <div className="w-full max-w-2xl bg-[#09090b] text-primary p-12 rounded-2xl font-mono border border-white/10 shadow-[0_0_80px_rgba(0,255,135,0.05)] relative overflow-hidden flex flex-col h-[500px]">
        <div className="absolute top-0 left-0 w-full h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        
        <div className="mt-6 mb-8 flex items-center gap-3">
            <span className="text-mutedText">System:</span>
            <span className="text-white">MoneyMitra is thinking</span>
            <motion.span 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2.5 h-6 bg-primary ml-1 block"
            />
        </div>
        
        <div className="flex flex-col gap-6 flex-1 justify-end pb-8">
            {steps.map((step, idx) => {
                if (idx > currentStep) return null;
                const isFinished = idx < currentStep;
                
                return (
                    <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 text-sm sm:text-base font-semibold"
                    >
                        {isFinished ? (
                            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        ) : (
                            <div className="w-5 h-5 border-[3px] border-primary border-t-transparent rounded-full animate-spin shrink-0" />
                        )}
                        <span className={isFinished ? 'text-primary/70' : 'text-primary'}>
                            <span className="text-mutedText/50 mr-3">{"[STEP_" + (idx+1) + "]"}</span>
                            {step}
                        </span>
                    </motion.div>
                )
            })}
        </div>
        
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-auto">
            <motion.div 
                className="h-full bg-primary shadow-[0_0_10px_rgba(0,255,135,1)]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
            />
        </div>
    </div>
  )
}

export default function TerminalPage() {
    return (
        <main className="min-h-screen bg-black flex items-center justify-center p-6">
            <Suspense fallback={<div className="font-mono text-primary animate-pulse">Initializing Terminal...</div>}>
                <TerminalLogic />
            </Suspense>
        </main>
    )
}
