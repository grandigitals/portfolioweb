'use client'

import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import LiveScores from '@/components/LiveScores'
import MatchSchedule from '@/components/MatchSchedule'
import FeaturedMatches from '@/components/FeaturedMatches'
import StatsOverview from '@/components/StatsOverview'
import AuthModal from '@/components/AuthModal'
import { useState } from 'react'

export default function Home() {
  const { user } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <main className="min-h-screen">
      <Header onAuthClick={() => setShowAuthModal(true)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">Live Sports</span> Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time scores, updates, and schedules for all your favorite sports
          </p>
        </div>

        {/* Featured Matches */}
        <section className="mb-8 animate-slide-up">
          <FeaturedMatches />
        </section>

        {/* Live Scores */}
        <section className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <LiveScores />
        </section>

        {/* Stats Overview */}
        {user && (
          <section className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <StatsOverview />
          </section>
        )}

        {/* Match Schedule */}
        <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <MatchSchedule />
        </section>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </main>
  )
}
