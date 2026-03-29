import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' })

export const metadata: Metadata = {
  title: 'MoneyMitra — AI-Powered Financial Life OS',
  description: 'Your Financial Truth. In 5 Minutes. Free, instant, and brutally honest AI financial advisor.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased selection:bg-primary/30 min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  )
}
