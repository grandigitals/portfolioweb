'use client'

import Header from '@/components/Header'
import { Trophy, Users, Calendar, TrendingUp } from 'lucide-react'

export default function LeaguesPage() {
  const leagues = [
    {
      name: 'Premier League',
      country: 'England',
      logo: '🏴󐁧󐁢󐁥󐁮󐁧󐁿',
      teams: 20,
      season: '2023/24',
      matches: 380,
      topScorer: 'E. Haaland',
    },
    {
      name: 'La Liga',
      country: 'Spain',
      logo: '🇪🇸',
      teams: 20,
      season: '2023/24',
      matches: 380,
      topScorer: 'R. Lewandowski',
    },
    {
      name: 'Serie A',
      country: 'Italy',
      logo: '🇮🇹',
      teams: 20,
      season: '2023/24',
      matches: 380,
      topScorer: 'V. Osimhen',
    },
    {
      name: 'Bundesliga',
      country: 'Germany',
      logo: '🇩🇪',
      teams: 18,
      season: '2023/24',
      matches: 306,
      topScorer: 'H. Kane',
    },
    {
      name: 'Ligue 1',
      country: 'France',
      logo: '🇫🇷',
      teams: 18,
      season: '2023/24',
      matches: 306,
      topScorer: 'K. Mbappé',
    },
    {
      name: 'Champions League',
      country: 'Europe',
      logo: '⭐',
      teams: 32,
      season: '2023/24',
      matches: 125,
      topScorer: 'K. Benzema',
    },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Football Leagues</h1>
          <p className="text-gray-400">Explore top football leagues from around the world</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['All', 'Europe', 'England', 'Spain', 'Italy', 'Germany', 'France'].map((filter) => (
            <button
              key={filter}
              className={`px-6 py-2 rounded-lg whitespace-nowrap transition-colors ${
                filter === 'All'
                  ? 'bg-primary text-white'
                  : 'bg-dark-card border border-dark-border hover:border-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Leagues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leagues.map((league, index) => (
            <div
              key={index}
              className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-primary transition-all hover:scale-105 cursor-pointer"
            >
              {/* League Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-4xl">{league.logo}</span>
                    <div>
                      <h3 className="text-xl font-bold">{league.name}</h3>
                      <p className="text-sm text-gray-400">{league.country}</p>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                  {league.season}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-dark-bg rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Teams</span>
                  </div>
                  <p className="text-lg font-bold">{league.teams}</p>
                </div>
                <div className="bg-dark-bg rounded-lg p-3">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">Matches</span>
                  </div>
                  <p className="text-lg font-bold">{league.matches}</p>
                </div>
              </div>

              {/* Top Scorer */}
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-gray-300">Top Scorer</span>
                </div>
                <span className="font-bold">{league.topScorer}</span>
              </div>

              {/* Action Button */}
              <button className="w-full mt-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors font-medium">
                View Standings
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
