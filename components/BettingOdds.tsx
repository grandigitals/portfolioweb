'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface OddsData {
  bookmaker: string
  homeWin: number
  draw: number
  awayWin: number
}

export default function BettingOdds() {
  // Mock odds data - in production, this would come from a betting API
  const matches = [
    {
      id: 1,
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      time: '15:00',
      odds: [
        { bookmaker: 'Bet365', homeWin: 2.10, draw: 3.40, awayWin: 3.20 },
        { bookmaker: '1xBet', homeWin: 2.15, draw: 3.35, awayWin: 3.15 },
        { bookmaker: 'Betway', homeWin: 2.08, draw: 3.45, awayWin: 3.25 },
      ]
    },
    {
      id: 2,
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      time: '18:00',
      odds: [
        { bookmaker: 'Bet365', homeWin: 2.50, draw: 3.20, awayWin: 2.80 },
        { bookmaker: '1xBet', homeWin: 2.55, draw: 3.15, awayWin: 2.75 },
        { bookmaker: 'Betway', homeWin: 2.48, draw: 3.25, awayWin: 2.85 },
      ]
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Betting Odds</h2>
        <div className="flex gap-2 text-sm">
          <span className="px-3 py-1 bg-dark-card border border-dark-border rounded-full">Live</span>
          <span className="px-3 py-1 bg-primary/20 text-primary rounded-full">Best Odds</span>
        </div>
      </div>

      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
            {/* Match Header */}
            <div className="bg-dark-bg px-6 py-4 border-b border-dark-border">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold">{match.homeTeam}</span>
                    <span className="text-gray-400">vs</span>
                    <span className="text-lg font-bold">{match.awayTeam}</span>
                  </div>
                  <p className="text-sm text-gray-400">Kick-off: {match.time}</p>
                </div>
                <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors font-medium">
                  Place Bet
                </button>
              </div>
            </div>

            {/* Odds Table */}
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-sm text-gray-400 border-b border-dark-border">
                      <th className="text-left pb-3 font-medium">Bookmaker</th>
                      <th className="text-center pb-3 font-medium">Home Win</th>
                      <th className="text-center pb-3 font-medium">Draw</th>
                      <th className="text-center pb-3 font-medium">Away Win</th>
                      <th className="text-right pb-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.odds.map((odd, index) => {
                      const isBestHome = match.odds.every(o => odd.homeWin >= o.homeWin)
                      const isBestDraw = match.odds.every(o => odd.draw >= o.draw)
                      const isBestAway = match.odds.every(o => odd.awayWin >= o.awayWin)

                      return (
                        <tr key={index} className="border-b border-dark-border/50 hover:bg-dark-hover transition-colors">
                          <td className="py-4">
                            <span className="font-medium">{odd.bookmaker}</span>
                          </td>
                          <td className="py-4">
                            <OddButton value={odd.homeWin} isBest={isBestHome} />
                          </td>
                          <td className="py-4">
                            <OddButton value={odd.draw} isBest={isBestDraw} />
                          </td>
                          <td className="py-4">
                            <OddButton value={odd.awayWin} isBest={isBestAway} />
                          </td>
                          <td className="py-4 text-right">
                            <button className="text-primary hover:text-primary-hover text-sm font-medium">
                              View All
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Additional Markets */}
              <div className="mt-4 pt-4 border-t border-dark-border">
                <div className="flex gap-2 flex-wrap">
                  <button className="px-4 py-2 bg-dark-bg hover:bg-dark-hover rounded-lg text-sm transition-colors">
                    Over/Under
                  </button>
                  <button className="px-4 py-2 bg-dark-bg hover:bg-dark-hover rounded-lg text-sm transition-colors">
                    Both Teams to Score
                  </button>
                  <button className="px-4 py-2 bg-dark-bg hover:bg-dark-hover rounded-lg text-sm transition-colors">
                    Correct Score
                  </button>
                  <button className="px-4 py-2 bg-dark-bg hover:bg-dark-hover rounded-lg text-sm transition-colors">
                    First Goal Scorer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <p className="text-sm text-yellow-500">
          ⚠️ <strong>Responsible Gaming:</strong> Betting can be addictive. Please gamble responsibly. 
          18+ only. This is for demonstration purposes only.
        </p>
      </div>
    </div>
  )
}

function OddButton({ value, isBest }: { value: number; isBest: boolean }) {
  return (
    <div className="flex justify-center">
      <button 
        className={`px-6 py-2 rounded-lg font-bold transition-all hover:scale-105 ${
          isBest 
            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50' 
            : 'bg-dark-bg hover:bg-dark-hover border border-dark-border'
        }`}
      >
        {value.toFixed(2)}
        {isBest && <TrendingUp className="inline-block w-3 h-3 ml-1" />}
      </button>
    </div>
  )
}
