import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-6 absolute top-0 left-0 z-50">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(0,255,135,0.8)]"></div>
        <span className="text-white font-extrabold text-2xl tracking-tight">MoneyMitra</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/login" className="text-neutralText hover:text-white font-semibold transition-colors hidden sm:block">
          Sign In
        </Link>
        <Link href="/onboarding?flow=portfolio" className="bg-white/10 text-white hover:bg-white/20 px-6 py-2.5 rounded-full font-semibold transition-all border border-white/10 hover:border-white/30 text-sm">
          Get Started
        </Link>
      </div>
    </header>
  )
}
