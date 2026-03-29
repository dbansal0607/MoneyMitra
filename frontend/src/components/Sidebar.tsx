import Link from 'next/link'
import { Home, PieChart, BarChart2, Calendar, Settings, LogOut, Zap, Activity } from 'lucide-react'

interface SidebarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function Sidebar({ activeTab = 'home', setActiveTab = () => {} }: SidebarProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Overview' },
    { id: 'portfolio', icon: PieChart, label: 'Portfolio' },
    { id: 'health', icon: BarChart2, label: 'Health Score' },
    { id: 'fire', icon: Calendar, label: 'FIRE Plan' },
    { id: 'market', icon: Activity, label: 'Market Radar' },
    { id: 'plans', icon: Zap, label: 'Upgrade Plan' },
  ]

  return (
    <aside className="w-[80px] bg-[#16161A] border-r border-[#2C2C30] flex flex-col items-center h-screen text-[#A0A0A5] py-6 flex-shrink-0 z-50 rounded-l-2xl">
      <div className="mb-10 cursor-pointer">
        {/* Custom Logo Icon */}
        <div className="w-10 h-10 rounded-full flex overflow-hidden">
            <div className="w-1/2 h-full bg-[#E2FF66]"></div>
            <div className="w-1/2 h-full flex flex-col">
                <div className="w-full h-1/2 bg-[#A855F7]"></div>
                <div className="w-full h-1/2 bg-white"></div>
            </div>
        </div>
      </div>
      
      <nav className="flex flex-col gap-6 w-full items-center flex-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative p-3 rounded-xl transition-all group outline-none"
              title={tab.label}
            >
              {isActive && (
                <div className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#A855F7] rounded-r-full" />
              )}
              <tab.icon className={`w-6 h-6 transition-colors ${isActive ? 'text-white' : 'text-[#8A8A93] group-hover:text-white'}`} />
            </button>
          )
        })}
      </nav>
      
      <div className="mt-auto flex flex-col gap-3 items-center">
        <button 
          onClick={() => setActiveTab('settings')}
          title="Settings & Profile"
          className={`relative p-3 rounded-xl transition-all group outline-none ${activeTab === 'settings' ? 'text-white' : 'text-[#8A8A93] hover:text-white hover:bg-[#2A2A2E]'}`}
        >
          {activeTab === 'settings' && (
            <div className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#A855F7] rounded-r-full" />
          )}
          <Settings className="w-6 h-6" />
        </button>
        <Link href="/" title="Log Out / Return to Landing" className="p-3 rounded-xl text-[#FF4C4C]/60 hover:text-[#FF4C4C] hover:bg-[#FF4C4C]/10 transition-colors outline-none">
          <LogOut className="w-6 h-6" />
        </Link>
      </div>
    </aside>
  )
}
