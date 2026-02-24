'use client'

import { useState } from 'react'
import { useWallet } from '@/contexts/WalletContext'
import { Calendar, Clock, MapPin, TrendingUp, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const matches = [
  {
    id: 1,
    league: 'Premier League',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    homeScore: 2,
    awayScore: 1,
    status: 'FT' as const,
    time: '90+4',
    date: 'Today',
    venue: 'Old Trafford',
    odds: { home: 2.10, draw: 3.40, away: 3.20 },
  },
  {
    id: 2,
    league: 'La Liga',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    homeScore: 1,
    awayScore: 1,
    status: 'LIVE' as const,
    time: '67',
    date: 'Today',
    venue: 'Camp Nou',
    odds: { home: 2.50, draw: 3.20, away: 2.80 },
  },
  {
    id: 3,
    league: 'Serie A',
    homeTeam: 'Inter Milan',
    awayTeam: 'AC Milan',
    homeScore: null,
    awayScore: null,
    status: 'Upcoming' as const,
    time: '20:45',
    date: 'Today',
    venue: 'San Siro',
    odds: { home: 2.20, draw: 3.30, away: 3.10 },
  },
  {
    id: 4,
    league: 'Bundesliga',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    homeScore: null,
    awayScore: null,
    status: 'Upcoming' as const,
    time: '17:30',
    date: 'Tomorrow',
    venue: 'Allianz Arena',
    odds: { home: 1.75, draw: 3.80, away: 4.50 },
  },
  {
    id: 5,
    league: 'Premier League',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    homeScore: 3,
    awayScore: 2,
    status: 'FT' as const,
    time: 'FT',
    date: 'Yesterday',
    venue: 'Emirates Stadium',
    odds: { home: 2.30, draw: 3.25, away: 3.00 },
  },
  {
    id: 6,
    league: 'Champions League',
    homeTeam: 'PSG',
    awayTeam: 'Manchester City',
    homeScore: null,
    awayScore: null,
    status: 'Upcoming' as const,
    time: '21:00',
    date: 'This Week',
    venue: 'Parc des Princes',
    odds: { home: 2.40, draw: 3.10, away: 2.90 },
  },
]

const DATE_FILTERS = ['All', 'Yesterday', 'Today', 'Tomorrow', 'This Week']
const STATUS_FILTERS = ['All', 'LIVE', 'Upcoming', 'FT']

export default function MatchesPage() {
  const { addToBetSlip, betSlip } = useWallet()
  const [dateFilter, setDateFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = matches.filter(m => {
    const dateOk = dateFilter === 'All' || m.date === dateFilter
    const statusOk = statusFilter === 'All' || m.status === statusFilter
    return dateOk && statusOk
  })

  const isSelected = (matchId: number, selection: string, market: string) =>
    betSlip.some(b => b.matchId === matchId && b.selection === selection && b.market === market)

  const handleOddClick = (match: typeof matches[0], selection: string, odds: number) => {
    addToBetSlip({
      matchId: match.id,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      market: 'Match Result',
      selection,
      odds,
    })
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-full px-4 sm:px-6 py-6">

        {/* Page Header */}
        <div className="mb-6 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-gradient">All</span> Matches
          </h1>
          <p className="text-gray-400">Live scores, fixtures, results and odds.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {DATE_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setDateFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${dateFilter === f ? 'bg-accent-green text-dark-bg' : 'bg-dark-card border border-dark-border text-gray-400 hover:border-accent-green/50 hover:text-white'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {STATUS_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                  ${statusFilter === f
                    ? f === 'LIVE' ? 'bg-red-600 text-white' : 'bg-accent-blue/80 text-white'
                    : 'bg-dark-card border border-dark-border text-gray-400 hover:text-white'}`}
              >
                {f === 'LIVE' ? '🔴 Live' : f}
              </button>
            ))}
          </div>
        </div>

        {/* Matches */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No matches found for this filter.</p>
            </div>
          ) : filtered.map(match => (
            <div
              key={match.id}
              className="bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-accent-green/30 transition-all duration-200"
            >
              {/* Match Header */}
              <div className="px-4 py-3 bg-dark-bg flex items-center justify-between flex-wrap gap-2 border-b border-dark-border">
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{match.league}</span>
                <div className="flex items-center gap-2">
                  {match.status === 'LIVE' ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600/20 border border-red-600/40 text-red-400 text-xs font-bold rounded-full animate-pulse">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      LIVE {match.time}&apos;
                    </span>
                  ) : match.status === 'FT' ? (
                    <span className="px-2.5 py-1 bg-gray-600/20 border border-gray-600/40 text-gray-400 text-xs rounded-full">Full Time</span>
                  ) : (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-accent-blue/10 border border-accent-blue/30 text-accent-blue text-xs rounded-full">
                      <Clock className="w-3 h-3" /> {match.date} · {match.time}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4">
                {/* Score Row */}
                <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-center mb-4">
                  <div className="text-right">
                    <p className="font-bold text-base sm:text-lg leading-tight">{match.homeTeam}</p>
                  </div>
                  <div className="text-center bg-dark-bg rounded-lg px-3 sm:px-5 py-2 min-w-[80px]">
                    {match.homeScore !== null ? (
                      <div className="text-2xl sm:text-3xl font-bold">
                        <span className={match.homeScore > (match.awayScore ?? 0) ? 'text-accent-green' : ''}>{match.homeScore}</span>
                        <span className="text-gray-600 mx-1.5">-</span>
                        <span className={match.awayScore! > match.homeScore ? 'text-accent-green' : ''}>{match.awayScore}</span>
                      </div>
                    ) : (
                      <div className="text-accent-green font-bold text-sm">{match.time}</div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-base sm:text-lg leading-tight">{match.awayTeam}</p>
                  </div>
                </div>

                {/* Odds Row */}
                {match.status !== 'FT' && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-medium">Match Result</p>
                    <div className="flex gap-2">
                      {[
                        { label: match.homeTeam.split(' ').pop()!, value: match.odds.home, key: match.homeTeam },
                        { label: 'Draw', value: match.odds.draw, key: 'Draw' },
                        { label: match.awayTeam.split(' ').pop()!, value: match.odds.away, key: match.awayTeam },
                      ].map(({ label, value, key }) => {
                        const selected = isSelected(match.id, key, 'Match Result')
                        return (
                          <button
                            key={key}
                            onClick={() => handleOddClick(match, key, value)}
                            className={`flex-1 flex flex-col items-center py-2 rounded-lg border text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95
                              ${selected
                                ? 'bg-accent-green border-accent-green text-dark-bg shadow-lg shadow-accent-green/20'
                                : 'bg-dark-bg border-dark-border hover:border-accent-green/40 hover:bg-accent-green/5'
                              }`}
                          >
                            <span className={`text-[10px] mb-0.5 truncate max-w-full px-1 ${selected ? 'text-dark-bg/70' : 'text-gray-500'}`}>{label}</span>
                            <span className={`font-bold text-sm ${selected ? 'text-dark-bg' : 'text-accent-green'}`}>{value.toFixed(2)}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="mt-3 pt-3 border-t border-dark-border flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {match.venue}
                  </div>
                  <Link
                    href="/leagues/football"
                    className="ml-auto flex items-center gap-1 text-accent-green hover:text-accent-green/80 transition-colors font-medium"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    More Markets
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
