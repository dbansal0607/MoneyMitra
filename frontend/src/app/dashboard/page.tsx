'use client'
import { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { Search, ChevronDown, Activity, Calendar as CalendarIcon, ShieldAlert } from 'lucide-react'
import { AreaChart, Area, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart as RePieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'
import { useAppStore } from '@/store/appStore'

export default function Dashboard() {
    const backendResult = useAppStore(state => state.backendResult)
    const [data, setData] = useState<any>(null)
    const [activeTab, setActiveTab] = useState('home')
    const [timeframe, setTimeframe] = useState('ALL')
    const [expandedActions, setExpandedActions] = useState<number[]>([])
    const [stressDrop, setStressDrop] = useState(0) // New feature state

    const toggleAction = (index: number) => {
        setExpandedActions(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index])
    }
    
    useEffect(() => {
        if (backendResult) setData(backendResult)
        else setData(mockData)
    }, [backendResult])

    if (!data) return <div className="min-h-screen bg-[#121215] flex justify-center items-center text-[#E2FF66]">Loading Engine...</div>

    const { final_narrative: doc, health_score: health, portfolio_intelligence: port, fire_plan: fire, rebalancing_plan: reb } = data

    // Timeframe filtering for main Trend chart
    let points = 30
    if (timeframe === '1D') points = 2
    else if (timeframe === '1W') points = 7
    else if (timeframe === '1M') points = 10
    else if (timeframe === '3M') points = 15
    else if (timeframe === '1Y') points = 20
    const rawChartData = Array.from({length: 30}, (_, i) => ({ 
        name: `Day ${i}`, 
        invested: (port?.total_invested || 1000000) * (1 + i*0.005), 
        current: (port?.total_current_value || 1250000) * (1 + i*0.01 + Math.random()*0.02)
    }))
    const displayChartData = rawChartData.slice(-points)

    const healthBarData = [
        { name: 'Emg', val: health?.emergency || 0 },
        { name: 'Ins', val: health?.insurance || 0 },
        { name: 'Div', val: health?.diversification || 0 },
        { name: 'Dbt', val: health?.debt || 0 },
        { name: 'Tax', val: health?.tax || 0 },
        { name: 'Ret', val: health?.retirement || 0 }
    ]

    // Calculate diversified protection for stress test
    // Assuming 25% is in Debt/Liquid for the dummy portfolio
    const debtRatio = health?.debt ? (health.debt / 100) * 0.4 : 0.25 
    const equityRatio = 1 - debtRatio
    const protectedValue = port?.total_current_value || 1250000
    const stressedNiftyDrop = protectedValue * (stressDrop / 100)
    const stressedPortfolioDrop = protectedValue * (stressDrop / 100) * equityRatio
    const simulatedValue = protectedValue + stressedPortfolioDrop
    const lossesPrevented = Math.abs(stressedNiftyDrop) - Math.abs(stressedPortfolioDrop)

    const radarData = [
        { subject: 'Emergency', A: health?.emergency || 0, fullMark: 100 },
        { subject: 'Insurance', A: health?.insurance || 0, fullMark: 100 },
        { subject: 'Diversify', A: health?.diversification || 0, fullMark: 100 },
        { subject: 'Debt', A: health?.debt || 0, fullMark: 100 },
        { subject: 'Tax', A: health?.tax || 0, fullMark: 100 },
        { subject: 'Retirement', A: health?.retirement || 0, fullMark: 100 },
    ]

    const fireChartData = Array.from({length: 30}, (_, i) => ({ name: `Year ${i}`, value: (port?.total_current_value || 1000000) * Math.pow(1.12, i) + (Math.random() * 500000) }))

    const Toggles = ({ options, active, setActive }: {options:string[], active:string, setActive:(v:string)=>void}) => (
        <div className="flex bg-[#27272A] p-1 rounded-full border border-[#3A3A3E]">
            {options.map(opt => (
                <button 
                  key={opt} onClick={() => setActive(opt)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${active === opt ? 'bg-[#3A3A3E] text-white shadow-md' : 'text-[#8A8A93] hover:text-[#EAEAEA]'}`}
                >
                    {opt}
                </button>
            ))}
        </div>
    )

    // Different Tab Views
    const HomeTab = () => (
        <div className="flex flex-col gap-4 h-full overflow-y-auto scrollbar-hide">
            {/* Top Card: Trend */}
            <div className="bg-[#1C1C1F] rounded-3xl p-6 border border-[#2A2A2E] flex flex-col flex-shrink-0 min-h-[300px] relative">
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-xl font-bold text-[#EAEAEA]">Your Money Growth (Trend)</h2>
                    <Toggles options={['1D', '1W', '1M', '3M', '1Y', 'ALL']} active={timeframe} setActive={setTimeframe} />
                </div>
                <p className="text-[#8A8A93] text-xs font-medium mb-5">This graph shows how your own money (purple) is generating extra profit over time (yellow). The gap between them is pure profit you earned without doing any work!</p>
                
                {/* Custom glowing label logic from Nixtio */}
                <div className="absolute top-20 right-1/3 bg-gradient-to-b from-[#2A2A2E] to-[#1C1C1F] border border-[#3A3A3E] rounded-xl px-4 py-2 z-10 shadow-2xl flex flex-col items-center shadow-[#E2FF66]/10">
                    <span className="text-[#8A8A93] text-[10px] font-bold uppercase tracking-wider">Growth</span>
                    <span className="text-[#EAEAEA] font-black text-xl leading-none mt-1">
                        +{( ( (port?.total_current_value || 1) / (port?.total_invested || 1) ) - 1 ).toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 1})}
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E2FF66] mt-1 shadow-[0_0_8px_#E2FF66]" />
                </div>

                <div className="flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={displayChartData} margin={{top:10, right:10, left:0, bottom:0}}>
                            <defs>
                                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#E2FF66" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#E2FF66" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <YAxis hide domain={['dataMin', 'dataMax * 1.1']} />
                            <Tooltip 
                                formatter={(value: any) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value))}
                                contentStyle={{backgroundColor:'#27272A', border:'none', borderRadius:'12px', color:'#EAEAEA'}} 
                            />
                            <Area type="monotone" dataKey="invested" stroke="#A855F7" strokeWidth={3} fill="url(#colorInvested)" style={{ filter: 'drop-shadow(0px 4px 12px rgba(168, 85, 247, 0.5))' }} />
                            <Area type="monotone" dataKey="current" stroke="#E2FF66" strokeWidth={3} fill="url(#colorCurrent)" style={{ filter: 'drop-shadow(0px 4px 12px rgba(226, 255, 102, 0.5))' }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* NEW FEATURE: INTERACTIVE STRESS TEST SIMULATOR */}
            <div className="bg-[#1C1C1F] rounded-3xl p-6 border border-[#A855F7]/30 shadow-[0_0_20px_rgba(168,85,247,0.05)] flex flex-col flex-shrink-0 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A855F7]/10 rounded-full blur-3xl group-hover:bg-[#A855F7]/20 transition-all pointer-events-none" />
                
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold text-[#EAEAEA] flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-[#A855F7]" /> AI Market Stress Simulator
                        </h2>
                        <p className="text-[#8A8A93] text-xs font-medium mt-1">What happens to your money if the stock market crashes tomorrow? Drag the slider to test your portfolio's resilience.</p>
                    </div>
                </div>

                <div className="flex items-center gap-8 mt-2">
                    {/* Slider Column */}
                    <div className="flex flex-col w-1/3 border-r border-[#2A2A2E] pr-8">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[#EAEAEA] text-sm font-bold">Simulate Nifty Drop (-%)</span>
                            <span className="text-[#FF4C4C] font-black text-lg">{stressDrop}%</span>
                        </div>
                        <input 
                            type="range" min="-50" max="0" step="1" 
                            value={stressDrop} 
                            onChange={(e) => setStressDrop(Number(e.target.value))}
                            className="w-full h-2 bg-[#2A2A2E] rounded-lg appearance-none cursor-pointer accent-[#A855F7]"
                        />
                        <div className="flex justify-between text-[#8A8A93] text-[10px] font-bold mt-2">
                            <span>Severe Crash (-50%)</span>
                            <span>Normal (0%)</span>
                        </div>
                    </div>

                    {/* Results Column */}
                    <div className="flex-1 grid grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <span className="text-[#8A8A93] text-xs font-semibold mb-1">Your Portfolio Value Drops To</span>
                            <span className={`text-3xl font-black ${stressDrop < 0 ? 'text-[#FF4C4C]' : 'text-[#EAEAEA]'}`}>
                                ₹{simulatedValue.toLocaleString(undefined, {maximumFractionDigits: 0})}
                            </span>
                            <span className="text-[#8A8A93] text-[10px] mt-1">
                                {(stressDrop * equityRatio).toFixed(1)}% drop instead of {stressDrop}%
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#8A8A93] text-xs font-semibold mb-1">Losses Prevented By AI Buffer</span>
                            <span className="text-3xl font-black text-[#E2FF66]">
                                +₹{lossesPrevented.toLocaleString(undefined, {maximumFractionDigits: 0})}
                            </span>
                            <span className="text-[#8A8A93] text-[10px] mt-1">
                                Due to {(debtRatio*100).toFixed(0)}% safe Debt/Liquid allocation
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Card: Risk Founds (Health & Allocation) */}
            <div className="bg-[#1C1C1F] rounded-3xl p-6 border border-[#2A2A2E] flex flex-col md:flex-row gap-8 items-center min-h-[260px] flex-shrink-0">
                <div className="flex flex-col flex-1 h-full w-full">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold text-[#EAEAEA]">Financial Health Score</h2>
                            <p className="text-[#8A8A93] text-xs font-medium mt-1">A score (out of 100) showing how safe & intelligent your money setup is. 100 means you are bulletproof.</p>
                        </div>
                        <div className="bg-[#27272A] px-4 py-1.5 rounded-full border border-[#3A3A3E] text-xs font-bold text-[#A855F7] whitespace-nowrap">
                            {(port?.total_xirr * 100 || 0).toFixed(2)}% Yearly Profit
                        </div>
                    </div>
                    
                    <div className="flex w-full items-center gap-6 mt-4">
                        {/* 3D lightning donut structure */}
                        <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <RePieChart>
                                    <Pie data={[{value: health?.overall || 70}, {value: 100 - (health?.overall || 70)}]} cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" stroke="none" startAngle={90} endAngle={-270}>
                                        <Cell fill="#A855F7" />
                                        <Cell fill="#2A2A2E" />
                                    </Pie>
                                </RePieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl font-extrabold text-[#EAEAEA] tabular-nums tracking-tighter">{Math.round(health?.overall || 0)}</span>
                            </div>
                            {/* Decorative lightning shape overlay */}
                            <div className="absolute bottom-0 -right-2 top-0 pointer-events-none drop-shadow-[0_0_15px_rgba(226,255,102,0.6)] animate-pulse flex items-center">
                                <svg width="30" height="40" viewBox="0 0 24 24" fill="#E2FF66"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-4 flex-1">
                            <div className="flex justify-between items-end border-b border-[#2A2A2E] pb-3">
                                <div className="flex flex-col">
                                    <span className="text-[#8A8A93] text-sm font-semibold mb-1">Total Assets Invested</span>
                                    <span className="text-2xl font-bold text-[#EAEAEA]">₹{(port?.total_invested || 0).toLocaleString()}</span>
                                </div>
                                <div className="bg-[#E2FF66]/10 text-[#E2FF66] px-2 py-0.5 rounded text-sm font-bold flex items-center">
                                    {(port?.total_current_value > 0 ? (port.total_current_value / port.total_invested - 1)*100 : 0).toFixed(1)}% ↗
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col">
                                    <span className="text-[#8A8A93] text-sm font-semibold mb-1">Current Net Value</span>
                                    <span className="text-xl font-bold text-[#EAEAEA]">₹{(port?.total_current_value || 0).toLocaleString()}</span>
                                </div>
                                <div className="bg-[#A855F7]/10 text-[#A855F7] px-2 py-0.5 rounded text-sm font-bold flex items-center">
                                    Value Assessed
                                </div>
                            </div>
                        </div>

                        {/* Right side bar chart block */}
                        <div className="h-32 w-48 flex-shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={healthBarData}>
                                    <Bar dataKey="val" radius={[4,4,4,4]}>
                                        {healthBarData.map((e, i) => (
                                            <Cell key={i} fill={i % 2 === 0 ? '#E2FF66' : '#A855F7'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Card: Risk vulnerabilities (Fund Overlaps & Narrative) */}
            <div className="bg-[#1C1C1F] rounded-3xl p-6 border border-[#2A2A2E] flex flex-col min-h-[220px] flex-shrink-0">
                <h2 className="text-xl font-bold text-[#EAEAEA] mb-6">AI Narrative & Recommendations</h2>
                <div className="text-[#8A8A93] text-sm leading-relaxed mb-6 font-medium max-w-3xl" dangerouslySetInnerHTML={{__html: doc?.story?.replace(/\n/g, '<br/>') || '' }} />
                
                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-4 text-[#8A8A93] text-xs font-bold uppercase tracking-wider px-2 mb-1">
                        <span className="col-span-2">Priority Top Actions</span>
                        <span>Type</span>
                        <span>Status</span>
                    </div>
                    {doc?.top_actions?.length > 0 ? doc.top_actions.map((act:string, i:number) => (
                        <div key={i} onClick={() => toggleAction(i)} className="grid grid-cols-4 items-center bg-[#27272A] border border-[#3A3A3E] rounded-xl p-3 px-4 hover:border-[#A855F7]/50 transition-colors cursor-pointer group">
                             <div className="col-span-2 flex items-start gap-3">
                                 <div className={`mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${i===0 ? 'bg-[#E2FF66] text-[#121215]' : 'bg-[#A855F7] text-white'}`}>{i===0 ? 'High' : 'Low'}</div>
                                 <span className={`text-[#EAEAEA] text-sm font-medium transition-all duration-300 ${expandedActions.includes(i) ? '' : 'line-clamp-1'}`}>{act}</span>
                             </div>
                             <span className="text-[#8A8A93] text-sm font-medium group-hover:text-[#EAEAEA] transition-colors pl-4">Actionable Advice</span>
                             <span className="text-[#EAEAEA] text-sm font-bold flex items-center justify-between">
                                 Pending <ChevronDown className={`w-4 h-4 text-[#8A8A93] transition-transform duration-300 ${expandedActions.includes(i) ? 'rotate-180' : ''}`} />
                             </span>
                        </div>
                    )) : (
                        <div className="text-sm text-[#8A8A93] p-4 text-center">No actions currently mandated. You are on track!</div>
                    )}
                </div>
            </div>
        </div>
    )

    const PortfolioTab = () => (
        <div className="bg-[#1C1C1F] rounded-3xl p-6 border border-[#2A2A2E] flex flex-col h-full overflow-y-auto scrollbar-hide">
             <div className="mb-6">
                 <h2 className="text-xl font-bold text-[#EAEAEA]">Portfolio X-Ray</h2>
                 <p className="text-[#8A8A93] text-xs font-medium mt-1">A simple list of every mutual fund you own. See exactly how much cash you put in versus what it's worth today.</p>
             </div>
             <div className="grid grid-cols-4 text-[#8A8A93] text-xs font-bold uppercase tracking-wider px-4 mb-3 border-b border-[#2A2A2E] pb-3">
                 <span className="col-span-2">Scheme Name</span>
                 <span>Invested</span>
                 <span className="text-right">Current Value</span>
             </div>
             <div className="flex flex-col gap-2">
                 {port?.funds?.length > 0 ? port.funds.map((f:any, i:number) => (
                     <div key={i} className="grid grid-cols-4 items-center bg-[#27272A] p-4 rounded-xl border border-transparent hover:border-[#3A3A3E] transition-colors">
                         <div className="col-span-2 flex flex-col">
                             <span className="text-[#EAEAEA] font-semibold text-sm truncate">{f.scheme_name || 'Fund'}</span>
                             <span className="text-[#8A8A93] text-xs mt-1">{f.plan_type} • {f.option_type}</span>
                         </div>
                         <span className="text-[#A855F7] font-bold">₹{f.invested_amount?.toLocaleString() || 0}</span>
                         <span className="text-[#E2FF66] font-bold text-right">₹{f.current_value?.toLocaleString() || 0}</span>
                     </div>
                 )) : (
                     <div className="p-8 text-center text-[#8A8A93]">Fund extraction pending or skipped for sample. Please check dummy mapping.</div>
                 )}
             </div>
        </div>
    )

    const HealthTab = () => (
        <div className="bg-[#1C1C1F] rounded-3xl p-6 border border-[#2A2A2E] flex flex-col h-full overflow-y-auto scrollbar-hide items-center justify-center">
              <div className="text-center mb-8">
                  <h2 className="text-2xl font-black text-[#EAEAEA]">Detailed Health Radar</h2>
                  <p className="text-[#8A8A93] text-sm font-medium mt-2 max-w-lg mx-auto">This spiderweb chart shows your 6 financial pillars. If the shape is small in one corner (like "Insurance"), it means you have a critical weakness we need to patch up to protect your family.</p>
              </div>
              <div className="w-full h-[400px] shrink-0 pointer-events-none">
                 <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                          <PolarGrid stroke="#3A3A3E" />
                          <PolarAngleAxis dataKey="subject" tick={{fill: '#8A8A93', fontSize: 12, fontWeight: 700}} />
                          <Radar name="Score" dataKey="A" stroke="#E2FF66" strokeWidth={3} fill="#E2FF66" fillOpacity={0.2} style={{ filter: 'drop-shadow(0px 0px 10px rgba(226, 255, 102, 0.4))' }} />
                      </RadarChart>
                  </ResponsiveContainer>
              </div>
              <p className="text-[#8A8A93] text-center max-w-md mt-6">{doc?.insight}</p>
        </div>
    )

    const FireTab = () => (
         <div className="bg-[#1C1C1F] rounded-3xl p-6 border border-[#2A2A2E] flex flex-col h-full overflow-y-auto scrollbar-hide relative overflow-hidden">
             <div className="relative z-10 flex flex-col mb-2">
                <span className="text-[#E2FF66] font-black uppercase tracking-widest text-sm mb-1">When Can I Stop Working? (FIRE Target)</span>
                <span className="text-5xl font-extrabold text-[#EAEAEA]">₹{(fire?.fire_number || 0).toLocaleString(undefined, {maximumFractionDigits:0})}</span>
             </div>
             <p className="text-[#8A8A93] text-xs font-medium relative z-10 mb-6 max-w-lg">Based on mathematically predicting your future expenses and inflation, this giant mountain below is the exact amount of cash you need before you can retire forever.</p>
             
             <div className="relative z-10 grid grid-cols-2 gap-4 mb-6">
                 {fire?.goals?.map((g:any, i:number) => (
                     <div key={i} className="bg-[#27272A] p-5 rounded-2xl border border-[#3A3A3E]">
                         <h4 className="text-[#A855F7] font-bold text-sm mb-2">{g.name}</h4>
                         <div className="flex justify-between items-end">
                             <div className="flex flex-col">
                                 <span className="text-[#8A8A93] text-xs font-semibold">Inflated Target</span>
                                 <span className="text-[#EAEAEA] font-bold">₹{g.inflated_target.toLocaleString()}</span>
                             </div>
                             <div className="flex flex-col text-right">
                                 <span className="text-[#8A8A93] text-xs font-semibold">Reg. SIP</span>
                                 <span className="text-[#E2FF66] font-bold">₹{g.required_sip.toLocaleString()}</span>
                             </div>
                         </div>
                     </div>
                 ))}
             </div>

             <div className="flex-1 mt-auto relative z-0 min-h-[300px] -mx-6 -mb-6 pointer-events-none">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={fireChartData}>
                        <defs>
                            <linearGradient id="fireChartId" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#A855F7" stopOpacity={0.4}/>
                                <stop offset="100%" stopColor="#A855F7" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="value" stroke="#A855F7" strokeWidth={4} fillOpacity={1} fill="url(#fireChartId)" style={{ filter: 'drop-shadow(0px -10px 30px rgba(168, 85, 247, 0.4))' }} />
                    </AreaChart>
                 </ResponsiveContainer>
             </div>
         </div>
    )

    const SettingsTab = () => (
        <div className="bg-[#1C1C1F] rounded-3xl p-6 border border-[#2A2A2E] flex flex-col h-full overflow-y-auto scrollbar-hide">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-[#EAEAEA]">Account & Settings</h2>
                <p className="text-[#8A8A93] text-sm font-medium mt-2">Manage your personal profile, security history, and app preferences.</p>
            </div>
            
            <div className="flex flex-col gap-6">
                <div className="bg-[#27272A] p-6 rounded-2xl border border-[#3A3A3E]">
                    <h3 className="text-[#EAEAEA] font-bold mb-4 flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <span className="text-[#8A8A93] text-xs font-semibold mb-1">Full Name</span>
                            <span className="text-[#EAEAEA] text-sm font-medium bg-[#1C1C1F] p-3 rounded-xl border border-[#3A3A3E]">Suresh Investor</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#8A8A93] text-xs font-semibold mb-1">Email Address</span>
                            <span className="text-[#EAEAEA] text-sm font-medium bg-[#1C1C1F] p-3 rounded-xl border border-[#3A3A3E]">suresh.inv@example.com</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#8A8A93] text-xs font-semibold mb-1">Phone Number</span>
                            <span className="text-[#EAEAEA] text-sm font-medium bg-[#1C1C1F] p-3 rounded-xl border border-[#3A3A3E]">+91 98765 43210</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#8A8A93] text-xs font-semibold mb-1">PAN Card</span>
                            <span className="text-[#A855F7] text-sm font-bold bg-[#1C1C1F] p-3 rounded-xl border border-[#3A3A3E]">ABCDE1234F</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#27272A] p-6 rounded-2xl border border-[#3A3A3E]">
                    <h3 className="text-[#EAEAEA] font-bold mb-4 flex items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        Security & Login History
                    </h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center py-2 border-b border-[#3A3A3E]">
                            <div className="flex flex-col">
                                <span className="text-[#EAEAEA] text-sm font-medium">Windows PC - Chrome Browser</span>
                                <span className="text-[#8A8A93] text-xs">IP: 192.168.1.1 (Current Session)</span>
                            </div>
                            <span className="text-[#E2FF66] text-xs font-bold uppercase">Active Now</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <div className="flex flex-col">
                                <span className="text-[#EAEAEA] text-sm font-medium">iPhone 14 Pro - MoneyMitra App</span>
                                <span className="text-[#8A8A93] text-xs">2 Days Ago • New Delhi, IN</span>
                            </div>
                            <button className="text-[#FF4C4C] text-xs font-bold hover:underline">Revoke Access</button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#27272A] p-6 rounded-2xl border border-[#3A3A3E]">
                     <div className="flex justify-between items-center">
                         <div className="flex flex-col">
                            <h3 className="text-[#EAEAEA] font-bold mb-1">Weekly Notifications</h3>
                            <p className="text-[#8A8A93] text-xs">Receive AI-generated market updates and insights.</p>
                         </div>
                         <div className="w-12 h-6 bg-[#E2FF66] rounded-full relative cursor-pointer">
                             <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#121215] transition-all"></div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    )

    const PlansTab = () => (
        <div className="bg-[#1C1C1F] rounded-3xl p-6 border border-[#2A2A2E] flex flex-col h-full overflow-y-auto scrollbar-hide">
            <div className="text-center mb-10 mt-4">
                <span className="text-[#E2FF66] font-black uppercase tracking-widest text-sm mb-2 block">Level Up Your Wealth</span>
                <h2 className="text-3xl font-black text-[#EAEAEA]">Choose Your AI Advisor Plan</h2>
                <p className="text-[#8A8A93] text-sm font-medium mt-3 max-w-xl mx-auto">Get unrestricted access to tax-harvesting agents, real-time market overlap checks, and completely automated 1-click execution.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto w-full pb-8">
                {/* Basic Plan */}
                <div className="bg-[#16161A] p-6 rounded-2xl border border-[#2A2A2E] flex flex-col relative">
                    <h3 className="text-[#EAEAEA] font-bold text-xl mb-1">Basic</h3>
                    <p className="text-[#8A8A93] text-xs font-medium mb-4">Perfect for beginners.</p>
                    <div className="mb-6"><span className="text-3xl font-black text-white">Free</span></div>
                    <ul className="flex flex-col gap-3 text-sm text-[#A0A0A5] font-medium mb-8">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E2FF66]" /> Quarterly Health Score</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E2FF66]" /> Basic Portfolio X-Ray</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#3A3A3E]" /> <span className="text-[#5A5A62] line-through">Automated Rebalancing</span></li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#3A3A3E]" /> <span className="text-[#5A5A62] line-through">Tax Harvesting Insights</span></li>
                    </ul>
                    <button className="mt-auto w-full py-3 rounded-xl border border-[#3A3A3E] text-[#EAEAEA] font-bold hover:bg-[#2A2A2E] transition-colors">Current Plan</button>
                </div>

                {/* Standard Plan (Highlighted) */}
                <div className="bg-[#27272A] p-6 rounded-2xl border-2 border-[#A855F7] flex flex-col relative transform scale-105 shadow-[0_0_30px_rgba(168,85,247,0.15)] z-10">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#A855F7] text-white text-[10px] uppercase font-black px-3 py-1 rounded-full">Most Popular</div>
                    <h3 className="text-[#EAEAEA] font-bold text-xl mb-1">Standard AI</h3>
                    <p className="text-[#8A8A93] text-xs font-medium mb-4">For serious investors.</p>
                    <div className="mb-6">
                        <span className="text-3xl font-black text-white">₹499</span><span className="text-[#8A8A93] text-sm">/mo</span>
                    </div>
                    <ul className="flex flex-col gap-3 text-sm text-[#EAEAEA] font-medium mb-8">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" /> Real-time Health Monitoring</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" /> Deep Overlap Analysis</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" /> Auto-Switch to Direct Mutual Funds</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" /> Live Tax Calculation (STCG/LTCG)</li>
                    </ul>
                    <button className="mt-auto w-full py-3 rounded-xl bg-[#A855F7] text-white font-bold hover:bg-[#9044DB] transition-colors shadow-lg shadow-[#A855F7]/25">Upgrade Now</button>
                </div>

                {/* Premium Plan */}
                <div className="bg-[#16161A] p-6 rounded-2xl border border-[#2A2A2E] flex flex-col relative">
                    <h3 className="text-[#EAEAEA] font-bold text-xl mb-1">Wealth AI (HNI)</h3>
                    <p className="text-[#8A8A93] text-xs font-medium mb-4">Complete financial control.</p>
                    <div className="mb-6">
                        <span className="text-3xl font-black text-white">₹1,499</span><span className="text-[#8A8A93] text-sm">/mo</span>
                    </div>
                    <ul className="flex flex-col gap-3 text-sm text-[#A0A0A5] font-medium mb-8">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E2FF66]" /> Everything in Standard</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E2FF66]" /> 1-on-1 Human Advisor Access</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E2FF66]" /> Estate & Will Planning</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#E2FF66]" /> Custom US Stocks Portfolio</li>
                    </ul>
                    <button className="mt-auto w-full py-3 rounded-xl border border-[#3A3A3E] text-[#EAEAEA] font-bold hover:bg-[#2A2A2E] transition-colors">Select Premium</button>
                </div>
            </div>
        </div>
    )

    const MarketRadarTab = () => (
        <div className="bg-[#1C1C1F] rounded-3xl p-6 border border-[#2A2A2E] flex flex-col h-full overflow-y-auto scrollbar-hide relative overflow-hidden">
            <div className="absolute top-6 right-6 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2FF66] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E2FF66]"></span>
                </span>
                <span className="text-[#E2FF66] text-xs font-bold uppercase tracking-wider">Live Feed</span>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-black text-[#EAEAEA]">Live Market Radar</h2>
                <p className="text-[#8A8A93] text-sm font-medium mt-2 max-w-xl">Real-time macro-economic sentiment and deep sector exposure analysis mapped directly to your 8-fund portfolio.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-[#27272A] p-5 rounded-2xl border border-[#3A3A3E] col-span-1 flex flex-col items-center justify-center relative overlow-hidden group">
                    <span className="text-[#8A8A93] text-xs font-bold uppercase tracking-wider mb-2">Overall Sentiment</span>
                    <div className="relative w-32 h-16 overflow-hidden flex items-end justify-center">
                         {/* Half circle gauge */}
                         <div className="w-32 h-32 border-[12px] border-[#3A3A3E] rounded-full absolute top-0 border-b-transparent border-r-transparent transform -rotate-45" />
                         <div className="w-32 h-32 border-[12px] border-[#E2FF66] rounded-full absolute top-0 border-b-transparent border-r-transparent transform -rotate-[15deg] transition-all duration-1000 ease-out z-10" style={{ filter: 'drop-shadow(0px 0px 8px rgba(226, 255, 102, 0.4))' }} />
                         <span className="text-3xl font-black text-[#EAEAEA] z-20 mb-1">82</span>
                    </div>
                    <span className="text-[#E2FF66] font-bold text-sm mt-2">Strongly Bullish</span>
                </div>

                <div className="bg-[#27272A] p-5 rounded-2xl border border-[#3A3A3E] col-span-2 flex flex-col">
                    <h3 className="text-[#EAEAEA] font-bold text-sm mb-4">Deep Sector Exposure (Your Portfolio)</h3>
                    <div className="flex-1 w-full bg-[#1C1C1F] rounded-xl border border-[#3A3A3E] p-4 flex flex-col gap-3 justify-center">
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-1"><span className="text-[#EAEAEA]">Banking & Financials</span><span className="text-[#A855F7]">34%</span></div>
                            <div className="w-full h-2 bg-[#2A2A2E] rounded-full overflow-hidden"><div className="h-full bg-[#A855F7] w-[34%]" /></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-1"><span className="text-[#EAEAEA]">Information Technology</span><span className="text-[#E2FF66]">21%</span></div>
                            <div className="w-full h-2 bg-[#2A2A2E] rounded-full overflow-hidden"><div className="h-full bg-[#E2FF66] w-[21%]" /></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-1"><span className="text-[#EAEAEA]">Pharma & Healthcare</span><span className="text-white">12%</span></div>
                            <div className="w-full h-2 bg-[#2A2A2E] rounded-full overflow-hidden"><div className="h-full bg-white w-[12%]" /></div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-bold text-[#EAEAEA] mb-4">AI News Impact on Your Holdings</h3>
            <div className="flex flex-col gap-4">
                <div className="bg-[#27272A] p-4 rounded-xl border border-[#3A3A3E] flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-[#E2FF66]/10 flex items-center justify-center shrink-0 border border-[#E2FF66]/30">
                         <Activity className="w-5 h-5 text-[#E2FF66]" />
                     </div>
                     <div className="flex flex-col">
                         <div className="flex items-center gap-2 mb-1">
                             <span className="text-[#EAEAEA] font-bold text-sm">RBI keeps Repo Rate unchanged at 6.5%</span>
                             <span className="text-[#8A8A93] text-[10px] uppercase font-bold px-2 py-0.5 bg-[#1C1C1F] rounded">2 mins ago</span>
                         </div>
                         <p className="text-[#8A8A93] text-xs mb-3 font-medium">This signals continued stability for lending margins, highly favorable for large-cap banks.</p>
                         <div className="flex items-center gap-2">
                             <span className="text-[#A855F7] text-xs font-bold">Directly Affects:</span>
                             <span className="bg-[#1C1C1F] border border-[#3A3A3E] text-[#EAEAEA] text-[10px] font-bold px-2 py-1 rounded">Axis Bluechip Fund</span>
                             <span className="text-[#E2FF66] text-xs font-black">Estimated Impact: +1.2% ↗</span>
                         </div>
                     </div>
                </div>

                <div className="bg-[#27272A] p-4 rounded-xl border border-[#3A3A3E] flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-[#FF4C4C]/10 flex items-center justify-center shrink-0 border border-[#FF4C4C]/30">
                         <ShieldAlert className="w-5 h-5 text-[#FF4C4C]" />
                     </div>
                     <div className="flex flex-col">
                         <div className="flex items-center gap-2 mb-1">
                             <span className="text-[#EAEAEA] font-bold text-sm">US Tech sector sees slight correction due to robust jobs data</span>
                             <span className="text-[#8A8A93] text-[10px] uppercase font-bold px-2 py-0.5 bg-[#1C1C1F] rounded">1 hr ago</span>
                         </div>
                         <p className="text-[#8A8A93] text-xs mb-3 font-medium">Delay in expected rate cuts historically compresses tech valuations globally.</p>
                         <div className="flex items-center gap-2">
                             <span className="text-[#A855F7] text-xs font-bold">Directly Affects:</span>
                             <span className="bg-[#1C1C1F] border border-[#3A3A3E] text-[#EAEAEA] text-[10px] font-bold px-2 py-1 rounded">Parag Parikh Flexi Cap</span>
                             <span className="text-[#FF4C4C] text-xs font-black">Estimated Impact: -0.8% ↘</span>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="flex bg-[#121215] min-h-screen font-sans overflow-hidden p-3 gap-3">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main className="flex-1 flex flex-col overflow-hidden bg-[#16161A] rounded-2xl border border-[#2A2A2E] shadow-2xl relative">
               {/* Top Bar matching Nixtio */}
               <header className="h-[80px] border-b border-[#2A2A2E] flex items-center justify-between px-8 bg-[#16161A]/50 backdrop-blur-md z-10 shrink-0">
                   <div className="flex items-center gap-6">
                       <button className="bg-[#27272A] border border-[#3A3A3E] px-4 py-2 rounded-xl text-sm font-bold text-[#EAEAEA] flex items-center gap-3 hover:bg-[#323236] transition-colors">
                           moneymitra.com
                           <ChevronDown className="w-4 h-4 text-[#8A8A93]" />
                       </button>
                       <span className="text-[#8A8A93] text-sm font-medium">Assets Analyzed <span className="text-[#EAEAEA] font-bold ml-1">{port?.funds?.length || 4}</span></span>
                   </div>
                   
                   <div className="flex items-center gap-8">
                       <span className="text-[#8A8A93] text-sm font-medium flex items-center gap-2">
                           <CalendarIcon className="w-4 h-4" /> 29 Oct - 11 Nov
                       </span>
                       <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#27272A] transition-colors text-[#EAEAEA]">
                           <Search className="w-5 h-5" />
                       </button>
                       <div className="flex items-center gap-3 pl-4 border-l border-[#2A2A2E]">
                           <div className="flex flex-col items-end">
                               <span className="text-sm font-bold text-[#EAEAEA]">Suresh Investor</span>
                               <span className="text-[10px] text-[#A855F7] font-bold uppercase">Basic Plan</span>
                           </div>
                           <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#A855F7] to-[#E2FF66] border-2 border-[#16161A] shadow-md shadow-[#E2FF66]/20 overflow-hidden flex items-center justify-center font-black text-[#121215]">
                               SI
                           </div>
                       </div>
                   </div>
               </header>

               <div className="flex-1 p-8 overflow-y-auto scrollbar-hide">
                   {activeTab === 'home' && <HomeTab />}
                   {activeTab === 'portfolio' && <PortfolioTab />}
                   {activeTab === 'health' && <HealthTab />}
                   {activeTab === 'fire' && <FireTab />}
                   {activeTab === 'market' && <MarketRadarTab />}
                   {activeTab === 'plans' && <PlansTab />}
                   {activeTab === 'settings' && <SettingsTab />}
                   {/* Map others to Home for now or implement */}
                   {(!['home', 'portfolio', 'health', 'fire', 'market', 'plans', 'settings'].includes(activeTab)) && <HomeTab />}
               </div>
            </main>
            
            {/* Right Sidebar - Matches Nixtio "Participants" and "Last actions" */}
            <aside className="w-[320px] bg-[#16161A] rounded-2xl border border-[#2A2A2E] flex flex-col overflow-hidden shadow-2xl shrink-0">
                <div className="p-6 border-b border-[#2A2A2E]">
                    <h3 className="text-lg font-bold text-[#EAEAEA] mb-4">Advisors</h3>
                    <p className="text-xs text-[#8A8A93] mb-4">Onboarding: Financial experts reviewing your AI-generated portfolio strategy.</p>
                    <div className="flex items-center">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#16161A] flex items-center justify-center font-bold text-[#121215] ${i===0 ? 'bg-[#A855F7]' : i===1 ? 'bg-[#E2FF66]' : i===2 ? 'bg-[#3A3A3E] text-white' : 'bg-[#FFED70]'} ${i > 0 ? '-ml-3' : ''} shadow-sm z-[${10-i}]`}>
                                A{i+1}
                            </div>
                        ))}
                        <div className="w-10 h-10 rounded-full bg-[#27272A] border-2 border-[#16161A] flex items-center justify-center text-xs font-bold text-[#EAEAEA] -ml-3 z-0">
                            +2
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-6 flex-1 overflow-y-auto scrollbar-hide relative">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-[#EAEAEA]">Last actions</h3>
                        <button className="w-8 h-8 rounded-full bg-[#27272A] flex items-center justify-center hover:bg-[#3A3A3E] transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EAEAEA" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                        </button>
                    </div>

                    <div className="flex flex-col gap-6 relative before:absolute before:inset-0 before:ml-[7px] before:w-px before:bg-[#2A2A2E] before:-z-10">
                        {reb?.steps?.length > 0 ? reb.steps.map((s:any, i:number) => (
                            <div key={i} className="flex gap-4 group">
                                <div className={`w-4 h-4 rounded-full mt-1 border-[3px] border-[#16161A] flex-shrink-0 ${i % 2 === 0 ? 'bg-[#A855F7]' : 'bg-[#E2FF66]'}`} />
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium text-[#EAEAEA] leading-snug">
                                        Action for <span className="font-bold text-white">{s.fund}</span> has been processed
                                    </p>
                                    <span className="text-xs text-[#8A8A93] mt-2 font-medium">{s.type.toUpperCase()} • {s.tax_implication}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="text-sm text-[#8A8A93]">No rebalancing actions triggered recently.</div>
                        )}
                        
                        {/* Static dummy actions for visual pop */}
                        <div className="flex gap-4 group">
                            <div className="w-4 h-4 rounded-full mt-1 border-[3px] border-[#16161A] flex-shrink-0 bg-[#E2FF66]" />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium text-[#EAEAEA] leading-snug">
                                    Scan for <span className="font-bold text-white">Axis Bluechip Fund</span> completed
                                </p>
                                <span className="text-xs text-[#8A8A93] mt-2 font-medium">1 Day Ago</span>
                            </div>
                        </div>

                        <div className="flex gap-4 group">
                            <div className="w-4 h-4 rounded-full mt-1 border-[3px] border-[#16161A] flex-shrink-0 bg-[#3A3A3E]" />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium text-[#EAEAEA] leading-snug">
                                    Permissions for user <span className="font-bold text-white">Advisors</span> updated
                                </p>
                                <span className="text-xs text-[#8A8A93] mt-2 font-medium">30 Oct 2026</span>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-auto bg-[#27272A] hover:bg-[#3A3A3E] transition-colors py-3 rounded-full text-[#EAEAEA] font-bold text-sm tracking-wide">
                        Show all actions
                    </button>
                </div>
            </aside>
        </div>
    )
}

const mockData = {
    final_narrative: {
        story: "Based on the initial profile provided, your financial health stands at a solid baseline. We noticed a major portion of your investments are tied up in regular plans drawing high expense ratios.\n\nMoving forward, redirecting your SIPs towards identified direct-plan equivalents will automatically compound thousands of rupees over your long-term horizon.",
        top_actions: ["Switch Regular to Direct MFs to save on expense drag.", "Increase Emergency Fund to 6 months expenses."],
        insight: "Your portfolio returns are currently tracking perfectly alongside the Nifty 50 benchmark.",
        warning: null
    },
    health_score: { overall: 72, emergency: 60, insurance: 90, diversification: 75, debt: 80, tax: 85, retirement: 50 },
    portfolio_intelligence: {
        total_invested: 1000000,
        total_current_value: 1250000,
        total_xirr: 0.12,
        benchmarks: { "Nifty 50": {"3yr": 0.11}, "Nifty 500": {"3yr": 0.13} },
        funds: [],
        overlap_warnings: ["Fund A overlaps Fund B by 65%"]
    },
    fire_plan: {
        fire_number: 25000000,
        goals: [{name: "Retirement", prob_success: 85, inflated_target: 25000000, required_sip: 25000}]
    },
    rebalancing_plan: {
        steps: [
            {type: "switch", fund: "HDFC Mid Cap Opportunities", reason: "Moving to Direct Plan to save 1.2% TER drag.", tax_implication: "LTCG applies (>1 lakh)"},
            {type: "exit", fund: "Overlap Tech Fund", reason: "Consolidating 65% stock overlap.", tax_implication: "STCG (15%)"}
        ]
    }
}
