'use client'

import LiveScores from '@/components/LiveScores'
import MatchSchedule from '@/components/MatchSchedule'
import FeaturedMatches from '@/components/FeaturedMatches'
import StatsOverview from '@/components/StatsOverview'
import { TrendingUp, Zap, Trophy, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const SPORT_CARDS = [
  { sport: 'football', emoji: '⚽', label: 'Football', desc: 'Premier League, La Liga & more', color: 'from-accent-green/20 to-transparent', border: 'hover:border-accent-green/50' },
  { sport: 'basketball', emoji: '🏀', label: 'Basketball', desc: 'NBA, EuroLeague & more', color: 'from-accent-orange/20 to-transparent', border: 'hover:border-accent-orange/50' },
  { sport: 'tennis', emoji: '🎾', label: 'Tennis', desc: 'Grand Slams & ATP Tour', color: 'from-accent-yellow/20 to-transparent', border: 'hover:border-accent-yellow/50' },
  { sport: 'baseball', emoji: '⚾', label: 'Baseball', desc: 'MLB & world series', color: 'from-accent-blue/20 to-transparent', border: 'hover:border-accent-blue/50' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-full px-4 sm:px-6 py-6 space-y-8">

        {/* Hero */}
        <div className="animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-accent-green/10 border border-accent-green/30 text-accent-green text-xs font-bold rounded-full">
              <Zap className="w-3 h-3" /> LIVE
            </span>
            <span className="text-xs text-gray-500">Real-time updates every 10s</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="text-gradient">Live Sports</span> Dashboard
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl">
            Real-time scores, live odds, and match schedules. Click any odd to build your bet slip.
          </p>
        </div>

        {/* Quick Odds Links */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent-green" />
              Live Odds
            </h2>
            <Link href="/leagues" className="text-sm text-accent-green hover:text-accent-green/80 flex items-center gap-1 transition-colors">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SPORT_CARDS.map(({ sport, emoji, label, desc, color, border }) => (
              <Link
                key={sport}
                href={`/leagues/${sport}`}
                className={`bg-dark-card border border-dark-border ${border} rounded-xl p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg bg-gradient-to-br ${color} group`}
              >
                <span className="text-3xl block mb-2">{emoji}</span>
                <p className="font-bold text-sm">{label}</p>
                <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">{desc}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-accent-green opacity-0 group-hover:opacity-100 transition-opacity">
                  View odds <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="animate-slide-up">
          <StatsOverview />
        </section>

        {/* Featured Matches */}
        <section className="animate-slide-up">
          <FeaturedMatches />
        </section>

        {/* Live Scores */}
        <section className="animate-slide-up">
          <LiveScores />
        </section>

        {/* Match Schedule */}
        <section className="animate-slide-up pb-6">
          <MatchSchedule />
        </section>
      </div>
    </div>
  )
}
