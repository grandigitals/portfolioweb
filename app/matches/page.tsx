'use client'

import Header from '@/components/Header'
import { Calendar, Clock, MapPin, Tv } from 'lucide-react'

export default function MatchesPage() {
  const matches = [
    {
      id: 1,
      league: 'Premier League',
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      homeScore: 2,
      awayScore: 1,
      status: 'FT',
      time: '90+4',
      date: '2024-01-15',
      venue: 'Old Trafford',
      attendance: '74,879',
    },
    {
      id: 2,
      league: 'La Liga',
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      homeScore: null,
      awayScore: null,
      status: 'Scheduled',
      time: '20:00',
      date: '2024-01-20',
      venue: 'Camp Nou',
      attendance: 'TBD',
    },
    {
      id: 3,
      league: 'Serie A',
      homeTeam: 'Inter Milan',
      awayTeam: 'AC Milan',
      homeScore: 1,
      awayScore: 1,
      status: 'LIVE',
      time: '67',
      date: '2024-01-15',
      venue: 'San Siro',
      attendance: '80,000',
    },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Matches</h1>
          <p className="text-gray-400">Live scores, fixtures, and results</p>
        </div>

        {/* Date Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['Yesterday', 'Today', 'Tomorrow', 'This Week', 'All'].map((filter) => (
            <button
              key={filter}
              className={`px-6 py-2 rounded-lg whitespace-nowrap transition-colors ${
                filter === 'Today'
                  ? 'bg-primary text-white'
                  : 'bg-dark-card border border-dark-border hover:border-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Matches List */}
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-primary transition-all cursor-pointer"
            >
              <div className="p-6">
                {/* League & Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">{match.league}</span>
                  <div className="flex items-center gap-2">
                    {match.status === 'LIVE' && (
                      <span className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-sm rounded-full animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        LIVE
                      </span>
                    )}
                    {match.status === 'FT' && (
                      <span className="px-3 py-1 bg-gray-600 text-white text-sm rounded-full">
                        Full Time
                      </span>
                    )}
                    {match.status === 'Scheduled' && (
                      <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>

                {/* Match Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  {/* Home Team */}
                  <div className="text-right md:text-right">
                    <h3 className="text-xl font-bold mb-1">{match.homeTeam}</h3>
                  </div>

                  {/* Score/Time */}
                  <div className="text-center">
                    {match.homeScore !== null ? (
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-4xl font-bold">{match.homeScore}</span>
                        <span className="text-2xl text-gray-500">-</span>
                        <span className="text-4xl font-bold">{match.awayScore}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-xl font-bold text-primary">
                        <Clock className="w-5 h-5" />
                        {match.time}
                      </div>
                    )}
                    {match.status === 'LIVE' && (
                      <p className="text-sm text-gray-400 mt-1">{match.time}&apos;</p>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="text-left md:text-left">
                    <h3 className="text-xl font-bold mb-1">{match.awayTeam}</h3>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t border-dark-border flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {match.venue}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {match.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tv className="w-4 h-4" />
                    Watch Live
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-dark-bg px-6 py-3 flex gap-3">
                <button className="flex-1 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors text-sm font-medium">
                  Match Stats
                </button>
                <button className="flex-1 py-2 bg-dark-card border border-dark-border hover:border-primary text-white rounded-lg transition-colors text-sm font-medium">
                  H2H
                </button>
                <button className="flex-1 py-2 bg-dark-card border border-dark-border hover:border-primary text-white rounded-lg transition-colors text-sm font-medium">
                  Lineups
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
