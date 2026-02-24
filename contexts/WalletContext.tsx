'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface BetSlipItem {
  id: string
  matchId: number
  homeTeam: string
  awayTeam: string
  market: string
  selection: string
  odds: number
  stake: number
}

export interface PlacedBet {
  id: string
  items: BetSlipItem[]
  totalStake: number
  potentialReturn: number
  placedAt: Date
  status: 'pending' | 'won' | 'lost'
}

interface WalletContextType {
  balance: number
  betSlip: BetSlipItem[]
  placedBets: PlacedBet[]
  addToBetSlip: (item: Omit<BetSlipItem, 'id' | 'stake'>) => void
  removeFromBetSlip: (id: string) => void
  updateStake: (id: string, stake: number) => void
  clearBetSlip: () => void
  placeBet: () => { success: boolean; message: string }
  isBetSlipOpen: boolean
  setIsBetSlipOpen: (open: boolean) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const INITIAL_BALANCE = 1000

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(INITIAL_BALANCE)
  const [betSlip, setBetSlip] = useState<BetSlipItem[]>([])
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>([])
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedBalance = localStorage.getItem('sportsdash_balance')
      const savedBets = localStorage.getItem('sportsdash_placed_bets')
      if (savedBalance) setBalance(parseFloat(savedBalance))
      if (savedBets) setPlacedBets(JSON.parse(savedBets))
    } catch (e) {
      console.error('Failed to load wallet data:', e)
    }
  }, [])

  // Persist balance and placed bets
  useEffect(() => {
    localStorage.setItem('sportsdash_balance', balance.toString())
  }, [balance])

  useEffect(() => {
    localStorage.setItem('sportsdash_placed_bets', JSON.stringify(placedBets))
  }, [placedBets])

  const addToBetSlip = useCallback((item: Omit<BetSlipItem, 'id' | 'stake'>) => {
    setBetSlip(prev => {
      // Prevent duplicate selections for the same match+market
      const exists = prev.find(b => b.matchId === item.matchId && b.market === item.market && b.selection === item.selection)
      if (exists) return prev
      const newItem: BetSlipItem = { ...item, id: `bet_${Date.now()}_${Math.random()}`, stake: 10 }
      return [...prev, newItem]
    })
    setIsBetSlipOpen(true)
  }, [])

  const removeFromBetSlip = useCallback((id: string) => {
    setBetSlip(prev => prev.filter(b => b.id !== id))
  }, [])

  const updateStake = useCallback((id: string, stake: number) => {
    setBetSlip(prev => prev.map(b => b.id === id ? { ...b, stake: Math.max(0, stake) } : b))
  }, [])

  const clearBetSlip = useCallback(() => {
    setBetSlip([])
  }, [])

  const placeBet = useCallback((): { success: boolean; message: string } => {
    if (betSlip.length === 0) return { success: false, message: 'Your bet slip is empty.' }

    const totalStake = betSlip.reduce((sum, b) => sum + b.stake, 0)

    if (totalStake <= 0) return { success: false, message: 'Please enter a stake amount.' }
    if (totalStake > balance) return { success: false, message: `Insufficient balance. You have $${balance.toFixed(2)}.` }

    const potentialReturn = betSlip.reduce((sum, b) => sum + b.stake * b.odds, 0)

    const newBet: PlacedBet = {
      id: `placed_${Date.now()}`,
      items: [...betSlip],
      totalStake,
      potentialReturn,
      placedAt: new Date(),
      status: 'pending'
    }

    setBalance(prev => parseFloat((prev - totalStake).toFixed(2)))
    setPlacedBets(prev => [newBet, ...prev])
    setBetSlip([])

    return { success: true, message: `Bet placed! $${totalStake.toFixed(2)} staked. Potential return: $${potentialReturn.toFixed(2)}` }
  }, [betSlip, balance])

  return (
    <WalletContext.Provider value={{
      balance, betSlip, placedBets,
      addToBetSlip, removeFromBetSlip, updateStake,
      clearBetSlip, placeBet,
      isBetSlipOpen, setIsBetSlipOpen
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) throw new Error('useWallet must be used within a WalletProvider')
  return context
}
