export default function Footer() {
  return (
    <footer className="w-full py-10 border-t border-white/5 flex flex-col items-center text-mutedText text-sm mt-auto z-10 bg-background">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-primary/50 rounded-full" />
        <span className="font-semibold text-neutralText">MoneyMitra</span>
      </div>
      <p className="mb-6">Built for ET GenAI Hackathon 2026</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-primary transition-colors">Twitter</a>
      </div>
    </footer>
  )
}
