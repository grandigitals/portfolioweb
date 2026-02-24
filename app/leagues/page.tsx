'use client'

import { Trophy, Users, Calendar, TrendingUp, ChevronRight, Flame } from 'lucide-react'
import Link from 'next/link'

const SPORTS = [
  {
    sport: 'football',
    emoji: '⚽',
    label: 'Football',
    color: 'text-accent-green',
    border: 'hover:border-accent-green/50',
    glow: 'hover:shadow-accent-green/10',
    badge: 'bg-accent-green/10 text-accent-green border-accent-green/30',
    liveCount: 4,
    leagues: [
      { name: 'Premier League', country: 'England', flag: '🏴󐁧󐁢󐁥󐁮󐁧󐁿', teams: 20, topScorer: 'E. Haaland' },
      { name: 'La Liga', country: 'Spain', flag: '🇪🇸', teams: 20, topScorer: 'R. Lewandowski' },
      { name: 'Serie A', country: 'Italy', flag: '🇮🇹', teams: 20, topScorer: 'V. Osimhen' },
      { name: 'Bundesliga', country: 'Germany', flag: '🇩🇪', teams: 18, topScorer: 'H. Kane' },
    ],
  },
  {
    sport: 'basketball',
    emoji: '🏀',
    label: 'Basketball',
    color: 'text-accent-orange',
    border: 'hover:border-accent-orange/50',
    glow: 'hover:shadow-accent-orange/10',
    badge: 'bg-accent-orange/10 text-accent-orange border-accent-orange/30',
    liveCount: 1,
    leagues: [
      { name: 'NBA', country: 'USA', flag: '🇺🇸', teams: 30, topScorer: 'L. James' },
      { name: 'EuroLeague', country: 'Europe', flag: '🇪🇺', teams: 18, topScorer: 'N. Mirotic' },
    ],
  },
  {
    sport: 'tennis',
    emoji: '🎾',
    label: 'Tennis',
    color: 'text-accent-yellow',
    border: 'hover:border-accent-yellow/50',
    glow: 'hover:shadow-accent-yellow/10',
    badge: 'bg-accent-yellow/10 text-accent-yellow border-accent-yellow/30',
    liveCount: 1,
    leagues: [
      { name: 'Australian Open', country: 'Australia', flag: '🇦🇺', teams: 128, topScorer: 'N. Djokovic' },
      { name: 'Roland Garros', country: 'France', flag: '🇫🇷', teams: 128, topScorer: 'R. Nadal' },
    ],
  },
  {
    sport: 'baseball',
    emoji: '⚾',
    label: 'Baseball',
    color: 'text-accent-blue',
    border: 'hover:border-accent-blue/50',
    glow: 'hover:shadow-accent-blue/10',
    badge: 'bg-accent-blue/10 text-accent-blue border-accent-blue/30',
    liveCount: 0,
    leagues: [
      { name: 'MLB', country: 'USA', flag: '🇺🇸', teams: 30, topScorer: 'S. Ohtani' },
    ],
  },
]

export default function LeaguesPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-full px-4 sm:px-6 py-6">

        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-gradient">Sports</span> & Leagues
          </h1>
          <p className="text-gray-400">Browse all sports, explore leagues, and check live odds.</p>
        </div>

        {/* Sports Grid */}
        <div className="space-y-6">
          {SPORTS.map(({ sport, emoji, label, color, border, glow, badge, liveCount, leagues }) => (
            <div key={sport} className={`bg-dark-card border border-dark-border ${border} ${glow} rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-xl`}>
              {/* Sport Header */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-dark-border bg-dark-bg/50">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{emoji}</span>
                  <div>
                    <h2 className={`text-xl font-bold ${color}`}>{label}</h2>
                    <p className="text-xs text-gray-500">{leagues.length} competitions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {liveCount > 0 && (
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-xs font-bold ${badge}`}>
                      <Flame className="w-3 h-3" />
                      {liveCount} Live
                    </span>
                  )}
                  <Link
                    href={`/leagues/${sport}`}
                    className="flex items-center gap-1.5 px-4 py-2 bg-dark-card hover:bg-dark-surface border border-dark-border rounded-lg text-sm font-medium transition-colors group"
                  >
                    View Odds
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Leagues Grid */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {leagues.map((league, i) => (
                  <Link
                    key={i}
                    href={`/leagues/${sport}`}
                    className="flex items-center gap-3 bg-dark-bg hover:bg-dark-surface border border-dark-border hover:border-dark-border/70 rounded-xl p-3 transition-all group"
                  >
                    <span className="text-2xl">{league.flag}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm truncate">{league.name}</p>
                      <p className="text-xs text-gray-500">{league.country}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        {league.teams}
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-accent-green transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA Footer */}
              <div className="px-5 py-3 bg-dark-bg/30 border-t border-dark-border">
                <Link
                  href={`/leagues/${sport}`}
                  className={`text-sm font-medium ${color} hover:underline flex items-center gap-1`}
                >
                  <TrendingUp className="w-4 h-4" />
                  See all {label} odds &amp; markets
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Responsible Gaming Banner */}
        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <p className="text-sm text-yellow-500/90 text-center">
            ⚠️ <strong>Play Credits Only</strong> — SportsDash Pro uses virtual currency for demonstration purposes. No real money involved. 18+
          </p>
        </div>
      </div>
    </div>
  )
}
