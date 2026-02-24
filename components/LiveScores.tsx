'use client'

import { useEffect, useState } from 'react'
import { Activity, Clock } from 'lucide-react'
import { useSportsData } from '@/hooks/useSportsData'

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  status: 'live' | 'finished' | 'upcoming'
  time: string
  league: string
}

export default function LiveScores() {
  const { liveMatches, isLoading } = useSportsData()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <Activity className="w-6 h-6 text-accent-green animate-pulse" />
            <span>Live Scores</span>
          </h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-dark-surface rounded-lg p-4 h-24" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center space-x-2">
          <Activity className="w-6 h-6 text-accent-green" />
          <span>Live Scores</span>
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="space-y-4">
        {liveMatches.map((match) => (
          <div
            key={match.id}
            className={`bg-dark-surface rounded-lg p-4 border transition-all hover:border-accent-green/50 ${
              match.status === 'live' ? 'match-live border-accent-green/30' : 'border-dark-border'
            }`}
          >
            {/* League Name */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                {match.league}
              </span>
              {match.status === 'live' && (
                <span className="flex items-center space-x-1 text-xs text-accent-green font-bold">
                  <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                  <span>LIVE</span>
                </span>
              )}
              {match.status === 'finished' && (
                <span className="text-xs text-gray-500 font-medium">FT</span>
              )}
            </div>

            {/* Match Info */}
            <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
              {/* Home Team */}
              <div className="text-right">
                <p className="font-semibold text-lg">{match.homeTeam}</p>
              </div>

              {/* Score */}
              <div className="bg-dark-card rounded-lg px-6 py-3 min-w-[120px] text-center">
                <div className="text-3xl font-bold">
                  <span className={match.homeScore > match.awayScore && match.status === 'finished' ? 'text-accent-green' : ''}>
                    {match.homeScore}
                  </span>
                  <span className="text-gray-600 mx-2">-</span>
                  <span className={match.awayScore > match.homeScore && match.status === 'finished' ? 'text-accent-green' : ''}>
                    {match.awayScore}
                  </span>
                </div>
                {match.status === 'live' && (
                  <p className="text-xs text-accent-green mt-1 font-medium">{match.time}</p>
                )}
              </div>

              {/* Away Team */}
              <div className="text-left">
                <p className="font-semibold text-lg">{match.awayTeam}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {liveMatches.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No live matches at the moment</p>
          <p className="text-sm mt-1">Check back soon for live updates</p>
        </div>
      )}
    </div>
  )
}
