import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { WalletProvider } from '@/contexts/WalletContext'
import Header from '@/components/Header'
import BetSlip from '@/components/BetSlip'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SportsDash Pro - Live Sports Scores & Betting',
  description: 'Get real-time sports scores, match schedules, live odds, and place bets with play credits.',
  keywords: 'sports, live scores, football, basketball, match schedules, betting odds, real-time updates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-bg text-white antialiased`}>
        <AuthProvider>
          <WalletProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex flex-1 relative">
                <main className="flex-1 min-w-0 overflow-x-hidden">
                  {children}
                </main>
                {/* Desktop sidebar BetSlip */}
                <div className="hidden md:block w-80 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] border-l border-dark-border bg-dark-surface overflow-hidden">
                  <BetSlip mode="sidebar" />
                </div>
              </div>
            </div>
            {/* Mobile-only floating BetSlip (overlay drawer) */}
            <div className="md:hidden">
              <BetSlip mode="mobile" />
            </div>
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
