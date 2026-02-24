'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Menu, User, LogOut, Trophy, Calendar, TrendingUp } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  onAuthClick: () => void
}

export default function Header({ onAuthClick }: HeaderProps) {
  const { user, logout } = useAuth()
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-dark-surface/95 backdrop-blur-sm border-b border-dark-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-green to-accent-blue rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">SportsDash Pro</h1>
              <p className="text-xs text-gray-500">Live Sports Hub</p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#live" className="flex items-center space-x-2 text-gray-300 hover:text-accent-green transition-colors">
              <TrendingUp className="w-4 h-4" />
              <span>Live Scores</span>
            </a>
            <a href="#schedule" className="flex items-center space-x-2 text-gray-300 hover:text-accent-green transition-colors">
              <Calendar className="w-4 h-4" />
              <span>Schedule</span>
            </a>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center space-x-3 bg-dark-card hover:bg-dark-bg px-4 py-2 rounded-lg transition-all border border-dark-border"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 bg-accent-green rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <span className="hidden sm:block font-medium">{user.name}</span>
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-dark-card border border-dark-border rounded-lg shadow-xl py-2 animate-fade-in">
                    <div className="px-4 py-2 border-b border-dark-border">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setShowMenu(false)
                      }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-dark-surface flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="btn-primary flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 hover:bg-dark-card rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
