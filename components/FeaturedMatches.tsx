'use client'

import { Star, TrendingUp } from 'lucide-react'
import { useSportsData } from '@/hooks/useSportsData'

export default function FeaturedMatches() {
  const { featuredMatches, isLoading } = useSportsData()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-dark-card rounded-lg h-48" />
        ))}
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold flex items-center space-x-2 mb-4">
        <Star className="w-6 h-6 text-accent-yellow" />
        <span>Featured Matches</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredMatches.map((match, index) => (
          <div
            key={match.id}
            className="card hover:border-accent-yellow/50 cursor-pointer group relative overflow-hidden"
          >
            {/* Featured Badge */}
            <div className="absolute top-2 right-2 bg-accent-yellow text-dark-bg px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>Featured</span>
            </div>

            <div className="space-y-4">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                {match.league}
              </div>

              {/* Teams */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">{match.homeTeam}</span>
                  {match.status === 'live' && (
                    <span className="text-2xl font-bold text-accent-green">{match.homeScore}</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">{match.awayTeam}</span>
                  {match.status === 'live' && (
                    <span className="text-2xl font-bold text-accent-green">{match.awayScore}</span>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="pt-3 border-t border-dark-border flex items-center justify-between">
                {match.status === 'live' ? (
                  <span className="flex items-center space-x-2 text-accent-green font-bold">
                    <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                    <span>LIVE - {match.time}</span>
                  </span>
                ) : (
                  <span className="text-sm text-gray-400">{match.time}</span>
                )}
                <TrendingUp className="w-4 h-4 text-gray-600 group-hover:text-accent-yellow transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
