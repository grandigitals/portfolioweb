'use client'

import { Calendar, ChevronRight } from 'lucide-react'
import { useSportsData } from '@/hooks/useSportsData'
import { format } from 'date-fns'

export default function MatchSchedule() {
  const { upcomingMatches, isLoading } = useSportsData()

  if (isLoading) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold flex items-center space-x-2 mb-6">
          <Calendar className="w-6 h-6 text-accent-blue" />
          <span>Upcoming Matches</span>
        </h2>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse bg-dark-surface rounded-lg p-4 h-20" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold flex items-center space-x-2 mb-6">
        <Calendar className="w-6 h-6 text-accent-blue" />
        <span>Upcoming Matches</span>
      </h2>

      <div className="space-y-3">
        {upcomingMatches.map((match) => (
          <div
            key={match.id}
            className="bg-dark-surface rounded-lg p-4 border border-dark-border hover:border-accent-blue/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                    {match.league}
                  </span>
                  <span className="text-xs text-gray-600">•</span>
                  <span className="text-xs text-accent-blue">
                    {match.date}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold">{match.homeTeam}</span>
                  <span className="text-gray-600">vs</span>
                  <span className="font-semibold">{match.awayTeam}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">{match.time}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-accent-blue transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {upcomingMatches.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No upcoming matches scheduled</p>
        </div>
      )}
    </div>
  )
}
