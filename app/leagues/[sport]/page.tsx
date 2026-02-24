'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useWallet } from '@/contexts/WalletContext'
import { Activity, Clock, TrendingUp, ArrowLeft, Flame } from 'lucide-react'
import Link from 'next/link'

interface Market {
  home?: number | null
  draw?: number | null
  away?: number | null
  yes?: number
  no?: number
  over25?: number
  under25?: number
  over215?: number
  under215?: number
  over220?: number
  under220?: number
  over85?: number
  under85?: number
  over35?: number
  under35?: number
  [key: string]: number | null | undefined
}

interface Match {
  id: number
  homeTeam: string
  awayTeam: string
  league: string
  time: string
  date: string
  status: 'upcoming' | 'live' | 'finished'
  liveMinute?: string
  homeScore?: number | string
  awayScore?: number | string
  markets: {
    matchResult?: Market
    bothTeamsScore?: Market
    overUnder?: Market
    pointSpread?: Market
    sets?: Market
    [key: string]: Market | undefined
  }
}

const SPORT_CONFIG: Record<string, { label: string; emoji: string; color: string }> = {
  football: { label: 'Football', emoji: '⚽', color: 'text-accent-green' },
  basketball: { label: 'Basketball', emoji: '🏀', color: 'text-accent-orange' },
  tennis: { label: 'Tennis', emoji: '🎾', color: 'text-accent-yellow' },
  baseball: { label: 'Baseball', emoji: '⚾', color: 'text-accent-blue' },
}

function OddsButton({
  label,
  value,
  matchId,
  homeTeam,
  awayTeam,
  market,
}: {
  label: string
  value: number | null | undefined
  matchId: number
  homeTeam: string
  awayTeam: string
  market: string
}) {
  const { addToBetSlip, betSlip } = useWallet()

  if (!value) return null

  const isSelected = betSlip.some(
    b => b.matchId === matchId && b.market === market && b.selection === label
  )

  const handleClick = () => {
    addToBetSlip({
      matchId,
      homeTeam,
      awayTeam,
      market,
      selection: label,
      odds: value,
    })
  }

  return (
    <button
      onClick={handleClick}
      className={`flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 px-2 py-2.5 rounded-lg border transition-all duration-200 hover:scale-105 active:scale-95 text-xs font-medium
        ${isSelected
          ? 'bg-accent-green border-accent-green text-dark-bg shadow-lg shadow-accent-green/30'
          : 'bg-dark-bg border-dark-border hover:border-accent-green/50 hover:bg-accent-green/10'
        }`}
    >
      <span className={`truncate w-full text-center ${isSelected ? 'text-dark-bg' : 'text-gray-400'}`}>{label}</span>
      <span className={`font-bold text-sm ${isSelected ? 'text-dark-bg' : 'text-accent-green'}`}>{value.toFixed(2)}</span>
    </button>
  )
}

function MatchCard({ match, sport }: { match: Match; sport: string }) {
  const marketLabels: Record<string, Record<string, string>> = {
    matchResult: { home: match.homeTeam, draw: 'Draw', away: match.awayTeam },
    bothTeamsScore: { yes: 'Yes', no: 'No' },
    overUnder: {
      over25: 'Over 2.5', under25: 'Under 2.5',
      over215: 'Over 21.5', under215: 'Under 21.5',
      over220: 'Over 22.0', under220: 'Under 22.0',
      over85: 'Over 8.5', under85: 'Under 8.5',
      over35: 'Over 3.5', under35: 'Under 3.5',
    },
    pointSpread: { home: `${match.homeTeam} -3.5`, away: `${match.awayTeam} +3.5` },
    sets: { over35: 'Over 3.5', under35: 'Under 3.5' },
  }

  const marketDisplayNames: Record<string, string> = {
    matchResult: sport === 'basketball' || sport === 'baseball' ? 'Money Line' : 'Match Result',
    bothTeamsScore: 'Both Teams to Score',
    overUnder: 'Over / Under',
    pointSpread: 'Point Spread',
    sets: 'Total Sets',
  }

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-accent-green/30 transition-all duration-200">
      {/* Match Header */}
      <div className="px-4 py-3 bg-dark-bg border-b border-dark-border flex items-center justify-between flex-wrap gap-2">
        <div>
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{match.league}</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold">{match.homeTeam}</span>
            {match.status === 'live' && (match.homeScore !== undefined) && (
              <span className="text-accent-green font-bold">{match.homeScore} - {match.awayScore}</span>
            )}
            <span className="text-gray-500 text-sm">vs</span>
            <span className="text-sm font-semibold">{match.awayTeam}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {match.status === 'live' ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600/20 border border-red-600/40 text-red-400 text-xs rounded-full font-bold">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
              LIVE {match.liveMinute && `· ${match.liveMinute}`}
            </span>
          ) : (
            <span className="flex items-center gap-1 px-2.5 py-1 bg-dark-surface border border-dark-border text-gray-400 text-xs rounded-full">
              <Clock className="w-3 h-3" />
              {match.date} · {match.time}
            </span>
          )}
        </div>
      </div>

      {/* Markets */}
      <div className="p-4 space-y-3">
        {Object.entries(match.markets).map(([marketKey, marketData]) => {
          if (!marketData) return null
          const labels = marketLabels[marketKey] || {}
          const validEntries = Object.entries(marketData).filter(([, v]) => v !== null && v !== undefined)
          if (validEntries.length === 0) return null

          return (
            <div key={marketKey}>
              <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wide">
                {marketDisplayNames[marketKey] || marketKey}
              </p>
              <div className="flex gap-2">
                {validEntries.map(([key, value]) => (
                  <OddsButton
                    key={key}
                    label={labels[key] || key}
                    value={value}
                    matchId={match.id}
                    homeTeam={match.homeTeam}
                    awayTeam={match.awayTeam}
                    market={marketDisplayNames[marketKey] || marketKey}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function SportOddsPage() {
  const params = useParams()
  const sport = (params?.sport as string) || 'football'
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming'>('all')

  const config = SPORT_CONFIG[sport] || { label: sport, emoji: '🏆', color: 'text-accent-green' }

  useEffect(() => {
    const fetchOdds = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/odds?sport=${sport}`)
        if (!res.ok) throw new Error('Failed to fetch odds')
        const data = await res.json()
        setMatches(data.matches || [])
      } catch (e) {
        setError('Unable to load odds. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchOdds()

    // Refresh every 30 seconds for live odds
    const interval = setInterval(fetchOdds, 30000)
    return () => clearInterval(interval)
  }, [sport])

  const filteredMatches = matches.filter(m => {
    if (filter === 'live') return m.status === 'live'
    if (filter === 'upcoming') return m.status === 'upcoming'
    return true
  })

  const liveCount = matches.filter(m => m.status === 'live').length

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-dark-card border-b border-dark-border px-4 py-4 sm:py-6">
        <div className="max-w-full">
          <Link
            href="/leagues"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-accent-green transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            All Sports
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-3xl sm:text-4xl">{config.emoji}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{config.label} <span className="text-gradient">Odds</span></h1>
              <p className="text-gray-400 text-sm mt-0.5">Live odds · Click to add to bet slip</p>
            </div>
            {liveCount > 0 && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600/20 border border-red-600/40 text-red-400 text-sm rounded-full font-bold ml-auto">
                <Flame className="w-4 h-4" />
                {liveCount} Live
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 border-b border-dark-border flex gap-2 overflow-x-auto scrollbar-hide">
        {(['all', 'live', 'upcoming'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors capitalize
              ${filter === f
                ? 'bg-accent-green text-dark-bg'
                : 'bg-dark-card border border-dark-border text-gray-400 hover:border-accent-green/50 hover:text-white'
              }`}
          >
            {f === 'live' ? '🔴 Live' : f === 'upcoming' ? '🕒 Upcoming' : 'All Matches'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-dark-card border border-dark-border rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-dark-surface rounded w-1/3 mb-3" />
              <div className="h-6 bg-dark-surface rounded w-2/3 mb-4" />
              <div className="flex gap-2">
                {[1, 2, 3].map(j => <div key={j} className="flex-1 h-14 bg-dark-surface rounded-lg" />)}
              </div>
            </div>
          ))
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Activity className="w-12 h-12 mb-3 opacity-30" />
            <p>{error}</p>
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <TrendingUp className="w-12 h-12 mb-3 opacity-30" />
            <p>No {filter !== 'all' ? filter : ''} matches available</p>
          </div>
        ) : (
          filteredMatches.map(match => (
            <MatchCard key={match.id} match={match} sport={sport} />
          ))
        )}
      </div>

      {/* Disclaimer */}
      <div className="mx-4 mb-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
        <p className="text-xs text-yellow-500/80">
          ⚠️ <strong>Play Credits Only</strong> — This is a demo with virtual currency. No real money involved. Gamble responsibly. 18+
        </p>
      </div>
    </div>
  )
}
