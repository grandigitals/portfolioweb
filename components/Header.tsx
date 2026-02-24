'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useWallet } from '@/contexts/WalletContext'
import {
  Menu, X, User, LogOut, Trophy, Calendar, TrendingUp,
  Activity, Home, Wallet, ShoppingCart, ChevronDown
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AuthModal from '@/components/AuthModal'

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/matches', label: 'Matches', icon: Activity },
  { href: '/leagues', label: 'Leagues', icon: Trophy },
]

const SPORT_LINKS = [
  { href: '/leagues/football', label: '⚽ Football' },
  { href: '/leagues/basketball', label: '🏀 Basketball' },
  { href: '/leagues/tennis', label: '🎾 Tennis' },
  { href: '/leagues/baseball', label: '⚾ Baseball' },
]

export default function Header() {
  const { user, logout } = useAuth()
  const { balance, betSlip, setIsBetSlipOpen, isBetSlipOpen } = useWallet()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showSportsMenu, setShowSportsMenu] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const pathname = usePathname()
  const userMenuRef = useRef<HTMLDivElement>(null)
  const sportsMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
      if (sportsMenuRef.current && !sportsMenuRef.current.contains(e.target as Node)) {
        setShowSportsMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-dark-surface/95 backdrop-blur-sm border-b border-dark-border shadow-lg">
        <div className="max-w-full px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-accent-green to-accent-blue rounded-lg flex items-center justify-center shadow-lg shadow-accent-green/20">
                <Trophy className="w-5 h-5 text-dark-bg" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gradient leading-tight">SportsDash Pro</h1>
                <p className="text-[10px] text-gray-500 leading-tight">Live Sports Hub</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive(href) && !(href === '/leagues' && pathname.includes('/leagues/'))
                      ? 'bg-accent-green/10 text-accent-green'
                      : 'text-gray-400 hover:text-white hover:bg-dark-card'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}

              {/* Odds Dropdown */}
              <div ref={sportsMenuRef} className="relative">
                <button
                  onClick={() => setShowSportsMenu(!showSportsMenu)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${pathname.includes('/leagues/') ? 'bg-accent-green/10 text-accent-green' : 'text-gray-400 hover:text-white hover:bg-dark-card'}`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Live Odds
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSportsMenu ? 'rotate-180' : ''}`} />
                </button>
                {showSportsMenu && (
                  <div className="absolute top-full left-0 mt-1 w-44 bg-dark-card border border-dark-border rounded-xl shadow-2xl py-1.5 animate-fade-in z-50">
                    {SPORT_LINKS.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setShowSportsMenu(false)}
                        className={`block px-4 py-2 text-sm transition-colors hover:bg-dark-surface hover:text-accent-green
                          ${pathname === href ? 'text-accent-green bg-accent-green/10' : 'text-gray-300'}`}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Wallet Balance */}
              <div className="hidden sm:flex items-center gap-1.5 bg-dark-card border border-dark-border px-3 py-1.5 rounded-lg text-sm">
                <Wallet className="w-4 h-4 text-accent-green" />
                <span className="font-bold text-accent-green">${balance.toFixed(2)}</span>
              </div>

              {/* Bet Slip Toggle (desktop) */}
              <button
                onClick={() => setIsBetSlipOpen(!isBetSlipOpen)}
                className="hidden md:flex items-center gap-1.5 bg-dark-card hover:bg-dark-bg border border-dark-border px-3 py-1.5 rounded-lg text-sm transition-colors relative"
              >
                <ShoppingCart className="w-4 h-4 text-accent-green" />
                <span className="text-gray-300">Bet Slip</span>
                {betSlip.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-accent-green text-dark-bg text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {betSlip.length}
                  </span>
                )}
              </button>

              {/* User section */}
              {user ? (
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 bg-dark-card hover:bg-dark-bg border border-dark-border px-2.5 py-1.5 rounded-lg transition-colors"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full" />
                    ) : (
                      <div className="w-7 h-7 bg-accent-green rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-dark-bg" />
                      </div>
                    )}
                    <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-1 w-52 bg-dark-card border border-dark-border rounded-xl shadow-2xl py-1.5 animate-fade-in z-50">
                      <div className="px-4 py-2.5 border-b border-dark-border">
                        <p className="text-sm font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Wallet className="w-3.5 h-3.5 text-accent-green" />
                          <span className="text-xs text-accent-green font-bold">${balance.toFixed(2)} credits</span>
                        </div>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-300 hover:bg-dark-surface hover:text-white transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <button
                        onClick={() => { logout(); setShowUserMenu(false) }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:bg-dark-surface hover:text-red-300 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-1.5 bg-accent-green hover:bg-accent-green/90 text-dark-bg font-semibold px-3 py-1.5 rounded-lg text-sm transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-dark-card rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-dark-border bg-dark-surface animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {/* Wallet on mobile */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-dark-card rounded-lg mb-3">
                <Wallet className="w-4 h-4 text-accent-green" />
                <span className="text-sm text-gray-400">Play Credits:</span>
                <span className="font-bold text-accent-green ml-auto">${balance.toFixed(2)}</span>
              </div>

              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                    ${isActive(href) ? 'bg-accent-green/10 text-accent-green' : 'text-gray-300 hover:bg-dark-card hover:text-white'}`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}

              <div className="pt-1 pb-0.5">
                <p className="px-3 text-xs text-gray-600 uppercase tracking-wider mb-1">Live Odds</p>
                {SPORT_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                      ${pathname === href ? 'bg-accent-green/10 text-accent-green' : 'text-gray-300 hover:bg-dark-card hover:text-white'}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {!user && (
                <button
                  onClick={() => { setShowAuthModal(true); setMobileMenuOpen(false) }}
                  className="w-full flex items-center justify-center gap-2 mt-2 py-2.5 bg-accent-green hover:bg-accent-green/90 text-dark-bg font-bold rounded-lg text-sm transition-colors"
                >
                  <User className="w-4 h-4" />
                  Sign In / Register
                </button>
              )}

              {user && (
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false) }}
                  className="w-full flex items-center justify-center gap-2 mt-2 py-2.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  )
}
