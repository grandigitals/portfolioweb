'use client'

import { useWallet } from '@/contexts/WalletContext'
import { X, Trash2, ChevronRight, AlertCircle, CheckCircle, Wallet, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export default function BetSlip({ mode = 'both' }: { mode?: 'sidebar' | 'mobile' | 'both' }) {
  const {
    balance, betSlip, placedBets,
    removeFromBetSlip, updateStake,
    clearBetSlip, placeBet,
    isBetSlipOpen, setIsBetSlipOpen
  } = useWallet()

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [activeTab, setActiveTab] = useState<'slip' | 'bets'>('slip')

  const totalStake = betSlip.reduce((sum, b) => sum + (b.stake || 0), 0)
  const potentialReturn = betSlip.reduce((sum, b) => sum + (b.stake || 0) * b.odds, 0)

  const handlePlaceBet = () => {
    const result = placeBet()
    setMessage({ type: result.success ? 'success' : 'error', text: result.message })
    setTimeout(() => setMessage(null), 4000)
  }

  // Mobile mode: render floating button + slide-over drawer
  if (mode === 'mobile') {
    return (
      <>
        {/* Floating toggle button */}
        <button
          onClick={() => setIsBetSlipOpen(!isBetSlipOpen)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-accent-green hover:bg-accent-green/90 text-dark-bg font-bold px-4 py-3 rounded-full shadow-2xl shadow-accent-green/30 transition-all duration-200 hover:scale-105"
        >
          <ShoppingCart className="w-5 h-5" />
          {betSlip.length > 0 && (
            <span className="bg-dark-bg text-accent-green text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {betSlip.length}
            </span>
          )}
        </button>

        {/* Backdrop */}
        {isBetSlipOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setIsBetSlipOpen(false)}
          />
        )}

        {/* Drawer */}
        <aside
          className={`fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-dark-surface border-l border-dark-border z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
            ${isBetSlipOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <BetSlipContent
            betSlip={betSlip}
            placedBets={placedBets}
            balance={balance}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            message={message}
            totalStake={totalStake}
            potentialReturn={potentialReturn}
            removeFromBetSlip={removeFromBetSlip}
            updateStake={updateStake}
            clearBetSlip={clearBetSlip}
            handlePlaceBet={handlePlaceBet}
            onClose={() => setIsBetSlipOpen(false)}
            showCloseButton
          />
        </aside>
      </>
    )
  }

  // Sidebar mode: static panel, no floating button
  return (
    <aside className="flex flex-col h-full w-full bg-dark-surface">
      <BetSlipContent
        betSlip={betSlip}
        placedBets={placedBets}
        balance={balance}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        message={message}
        totalStake={totalStake}
        potentialReturn={potentialReturn}
        removeFromBetSlip={removeFromBetSlip}
        updateStake={updateStake}
        clearBetSlip={clearBetSlip}
        handlePlaceBet={handlePlaceBet}
        onClose={() => setIsBetSlipOpen(false)}
        showCloseButton={false}
      />
    </aside>
  )
}

function BetSlipContent({
  betSlip, placedBets, balance, activeTab, setActiveTab,
  message, totalStake, potentialReturn,
  removeFromBetSlip, updateStake, clearBetSlip, handlePlaceBet,
  onClose, showCloseButton
}: {
  betSlip: any[]
  placedBets: any[]
  balance: number
  activeTab: 'slip' | 'bets'
  setActiveTab: (t: 'slip' | 'bets') => void
  message: { type: 'success' | 'error'; text: string } | null
  totalStake: number
  potentialReturn: number
  removeFromBetSlip: (id: string) => void
  updateStake: (id: string, stake: number) => void
  clearBetSlip: () => void
  handlePlaceBet: () => void
  onClose: () => void
  showCloseButton: boolean
}) {
  return (
    <>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-border bg-dark-card">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-accent-green" />
            <h2 className="font-bold text-lg">Bet Slip</h2>
            {betSlip.length > 0 && (
              <span className="bg-accent-green text-dark-bg text-xs font-bold rounded-full px-2 py-0.5">
                {betSlip.length}
              </span>
            )}
          </div>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-dark-surface rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Wallet Balance */}
        <div className="px-4 py-3 bg-gradient-to-r from-accent-green/10 to-accent-blue/10 border-b border-dark-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Wallet className="w-4 h-4 text-accent-green" />
              <span>Play Credits</span>
            </div>
            <span className="font-bold text-accent-green text-lg">${balance.toFixed(2)}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-dark-border">
          <button
            onClick={() => setActiveTab('slip')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${activeTab === 'slip' ? 'text-accent-green border-b-2 border-accent-green' : 'text-gray-400 hover:text-white'}`}
          >
            Slip {betSlip.length > 0 && `(${betSlip.length})`}
          </button>
          <button
            onClick={() => setActiveTab('bets')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${activeTab === 'bets' ? 'text-accent-green border-b-2 border-accent-green' : 'text-gray-400 hover:text-white'}`}
          >
            My Bets {placedBets.length > 0 && `(${placedBets.length})`}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'slip' ? (
            <>
              {betSlip.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500 px-4">
                  <ShoppingCart className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm text-center">Click any odds button to add a selection</p>
                </div>
              ) : (
                <div className="p-3 space-y-3">
                  {betSlip.map((bet) => (
                    <div key={bet.id} className="bg-dark-card border border-dark-border rounded-lg p-3">
                      {/* Match Info */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="text-xs text-gray-500 truncate">{bet.homeTeam} vs {bet.awayTeam}</p>
                          <p className="text-xs font-semibold text-accent-green mt-0.5">{bet.market}</p>
                          <p className="text-sm font-bold truncate mt-0.5">{bet.selection}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-accent-green font-bold text-lg">{bet.odds.toFixed(2)}</span>
                          <button
                            onClick={() => removeFromBetSlip(bet.id)}
                            className="p-1 hover:bg-dark-surface rounded transition-colors text-gray-500 hover:text-red-400"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Stake Input */}
                      <div className="mt-2">
                        <label className="text-xs text-gray-500 mb-1 block">Stake ($)</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max={balance}
                            step="1"
                            value={bet.stake}
                            onChange={(e) => updateStake(bet.id, parseFloat(e.target.value) || 0)}
                            className="flex-1 bg-dark-bg border border-dark-border rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-green focus:border-accent-green w-full"
                          />
                          <div className="flex gap-1">
                            {[5, 10, 25].map(amount => (
                              <button
                                key={amount}
                                onClick={() => updateStake(bet.id, amount)}
                                className="px-1.5 py-1 bg-dark-bg hover:bg-accent-green/20 border border-dark-border hover:border-accent-green/50 rounded text-xs transition-colors"
                              >
                                ${amount}
                              </button>
                            ))}
                          </div>
                        </div>
                        {bet.stake > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            Return: <span className="text-accent-green font-semibold">${(bet.stake * bet.odds).toFixed(2)}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="p-3 space-y-3">
              {placedBets.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500 px-4">
                  <CheckCircle className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm text-center">No bets placed yet</p>
                </div>
              ) : (
                placedBets.map((bet) => (
                  <div key={bet.id} className="bg-dark-card border border-dark-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        bet.status === 'pending' ? 'bg-accent-orange/20 text-accent-orange' :
                        bet.status === 'won' ? 'bg-accent-green/20 text-accent-green' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {bet.status.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(bet.placedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {bet.items.map((item, i) => (
                      <div key={i} className="text-xs text-gray-400 mb-1">
                        <span className="text-white font-medium">{item.selection}</span>
                        <span className="text-accent-green ml-1">@ {item.odds.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-dark-border/50">
                      <span className="text-xs text-gray-400">Stake: <span className="text-white">${bet.totalStake.toFixed(2)}</span></span>
                      <span className="text-xs text-gray-400">Return: <span className="text-accent-green font-semibold">${bet.potentialReturn.toFixed(2)}</span></span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer - Place Bet */}
        {activeTab === 'slip' && betSlip.length > 0 && (
          <div className="p-4 border-t border-dark-border bg-dark-card space-y-3">
            {/* Message */}
            {message && (
              <div className={`flex items-center gap-2 p-2.5 rounded-lg text-xs ${
                message.type === 'success'
                  ? 'bg-accent-green/10 border border-accent-green/30 text-accent-green'
                  : 'bg-red-500/10 border border-red-500/30 text-red-400'
              }`}>
                {message.type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                <span>{message.text}</span>
              </div>
            )}

            {/* Summary */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Total Stake</span>
                <span className="text-white font-medium">${totalStake.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Potential Return</span>
                <span className="text-accent-green font-bold">${potentialReturn.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={clearBetSlip}
                className="flex items-center gap-1 px-3 py-2.5 bg-dark-surface hover:bg-dark-bg border border-dark-border rounded-lg text-sm transition-colors text-gray-400 hover:text-white"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
              <button
                onClick={handlePlaceBet}
                disabled={totalStake <= 0 || totalStake > balance}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-accent-green hover:bg-accent-green/90 disabled:opacity-40 disabled:cursor-not-allowed text-dark-bg font-bold rounded-lg transition-all duration-200 text-sm"
              >
                Place Bet
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Responsible Gaming */}
            <p className="text-xs text-gray-600 text-center">
              ⚠️ Play Credits only · 18+ · Gamble Responsibly
            </p>
          </div>
        )}
    </>
  )
}
