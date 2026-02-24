'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useWallet } from '@/contexts/WalletContext'
import { User, Settings, Heart, LogOut, Trophy, Calendar, Wallet, TrendingUp, CheckCircle, Clock, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { balance, placedBets } = useWallet()
  const [activeTab, setActiveTab] = useState<'overview' | 'bets' | 'favorites' | 'settings'>('overview')

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Trophy className="w-16 h-16 text-accent-green/30 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Sign In to View Profile</h2>
        <p className="text-gray-400 mb-6">Create an account to track your bets and manage your play credits.</p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    )
  }

  const totalWagered = placedBets.reduce((s, b) => s + b.totalStake, 0)
  const pendingBets = placedBets.filter(b => b.status === 'pending').length

  return (
    <div className="min-h-screen">
      <div className="max-w-full px-4 sm:px-6 py-6 space-y-6">

        {/* Profile Header */}
        <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden animate-fade-in">
          {/* Banner */}
          <div className="h-24 sm:h-32 bg-gradient-to-r from-accent-green/20 via-accent-blue/20 to-accent-green/10" />

          <div className="px-5 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10 sm:-mt-12">
              {/* Avatar */}
              <div className="flex items-end gap-4">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-dark-card shadow-xl"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-accent-green to-accent-blue rounded-full border-4 border-dark-card flex items-center justify-center shadow-xl">
                    <User className="w-10 h-10 sm:w-12 sm:h-12 text-dark-bg" />
                  </div>
                )}
                <div className="pb-1">
                  <h1 className="text-xl sm:text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 border border-red-600/30 rounded-lg text-sm transition-colors self-start sm:self-auto"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              <div className="bg-dark-bg rounded-xl p-3 sm:p-4 text-center border border-dark-border">
                <Wallet className="w-5 h-5 text-accent-green mx-auto mb-1.5" />
                <p className="text-xl sm:text-2xl font-bold text-accent-green">${balance.toFixed(0)}</p>
                <p className="text-xs text-gray-500">Play Credits</p>
              </div>
              <div className="bg-dark-bg rounded-xl p-3 sm:p-4 text-center border border-dark-border">
                <TrendingUp className="w-5 h-5 text-accent-blue mx-auto mb-1.5" />
                <p className="text-xl sm:text-2xl font-bold">{placedBets.length}</p>
                <p className="text-xs text-gray-500">Total Bets</p>
              </div>
              <div className="bg-dark-bg rounded-xl p-3 sm:p-4 text-center border border-dark-border">
                <Clock className="w-5 h-5 text-accent-orange mx-auto mb-1.5" />
                <p className="text-xl sm:text-2xl font-bold">{pendingBets}</p>
                <p className="text-xs text-gray-500">Pending</p>
              </div>
              <div className="bg-dark-bg rounded-xl p-3 sm:p-4 text-center border border-dark-border">
                <Trophy className="w-5 h-5 text-accent-yellow mx-auto mb-1.5" />
                <p className="text-xl sm:text-2xl font-bold">${totalWagered.toFixed(0)}</p>
                <p className="text-xs text-gray-500">Total Wagered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide border-b border-dark-border">
            {(['overview', 'bets', 'favorites', 'settings'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[80px] px-4 py-3 text-sm font-medium capitalize whitespace-nowrap transition-colors border-b-2
                  ${activeTab === tab
                    ? 'border-accent-green text-accent-green bg-accent-green/5'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-dark-surface'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-5">
            {activeTab === 'overview' && <OverviewTab placedBets={placedBets} balance={balance} />}
            {activeTab === 'bets' && <BetsTab placedBets={placedBets} />}
            {activeTab === 'favorites' && <FavoritesTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

function OverviewTab({ placedBets, balance }: { placedBets: any[]; balance: number }) {
  const startingBalance = 1000
  const profitLoss = balance - startingBalance
  return (
    <div className="space-y-6">
      {/* P&L Card */}
      <div className={`rounded-xl p-4 border ${profitLoss >= 0 ? 'bg-accent-green/10 border-accent-green/30' : 'bg-red-500/10 border-red-500/30'}`}>
        <p className="text-sm text-gray-400 mb-1">Overall P&amp;L vs Starting Balance</p>
        <p className={`text-3xl font-bold ${profitLoss >= 0 ? 'text-accent-green' : 'text-red-400'}`}>
          {profitLoss >= 0 ? '+' : ''}{profitLoss.toFixed(2)}
        </p>
        <p className="text-xs text-gray-500 mt-1">Starting balance: $1,000.00</p>
      </div>

      <div>
        <h3 className="text-base font-bold mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent-orange" />
          Recent Bets
        </h3>
        {placedBets.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <TrendingUp className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No bets placed yet. Head to <Link href="/leagues/football" className="text-accent-green hover:underline">Live Odds</Link> to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {placedBets.slice(0, 5).map(bet => (
              <div key={bet.id} className="bg-dark-bg rounded-xl p-3.5 border border-dark-border flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{bet.items[0]?.selection}</p>
                  <p className="text-xs text-gray-500">{new Date(bet.placedAt).toLocaleString()}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-gray-400">Stake: <span className="text-white">${bet.totalStake.toFixed(2)}</span></p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${bet.status === 'pending' ? 'bg-accent-orange/20 text-accent-orange' : bet.status === 'won' ? 'bg-accent-green/20 text-accent-green' : 'bg-red-500/20 text-red-400'}`}>
                    {bet.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function BetsTab({ placedBets }: { placedBets: any[] }) {
  if (placedBets.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p className="mb-4">No bets placed yet.</p>
        <Link href="/leagues/football" className="btn-primary inline-flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4" />
          Browse Odds
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {placedBets.map(bet => (
        <div key={bet.id} className="bg-dark-bg border border-dark-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
              bet.status === 'pending' ? 'bg-accent-orange/10 text-accent-orange border-accent-orange/30' :
              bet.status === 'won' ? 'bg-accent-green/10 text-accent-green border-accent-green/30' :
              'bg-red-500/10 text-red-400 border-red-500/30'
            }`}>
              {bet.status.toUpperCase()}
            </span>
            <span className="text-xs text-gray-500">{new Date(bet.placedAt).toLocaleString()}</span>
          </div>
          <div className="space-y-2 mb-3">
            {bet.items.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium">{item.selection}</span>
                  <span className="text-xs text-gray-500 ml-2">({item.market})</span>
                </div>
                <span className="text-accent-green font-bold">@ {item.odds.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-dark-border text-sm">
            <span className="text-gray-400">Stake: <span className="text-white font-medium">${bet.totalStake.toFixed(2)}</span></span>
            <span className="text-gray-400">Potential: <span className="text-accent-green font-bold">${bet.potentialReturn.toFixed(2)}</span></span>
          </div>
        </div>
      ))}
    </div>
  )
}

function FavoritesTab() {
  const favoriteTeams = [
    { name: 'Manchester United', league: 'Premier League', flag: '🔴', sport: 'football' },
    { name: 'Barcelona', league: 'La Liga', flag: '🔵', sport: 'football' },
    { name: 'LA Lakers', league: 'NBA', flag: '🟡', sport: 'basketball' },
  ]
  return (
    <div>
      <h3 className="text-base font-bold mb-4 flex items-center gap-2">
        <Heart className="w-4 h-4 text-red-400" />
        Favourite Teams
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {favoriteTeams.map((team, i) => (
          <Link
            key={i}
            href={`/leagues/${team.sport}`}
            className="flex items-center gap-3 bg-dark-bg hover:bg-dark-surface border border-dark-border hover:border-accent-green/30 rounded-xl p-4 transition-all group"
          >
            <span className="text-3xl">{team.flag}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{team.name}</p>
              <p className="text-xs text-gray-500">{team.league}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-accent-green transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold mb-3 flex items-center gap-2">
          <Settings className="w-4 h-4 text-accent-blue" />
          Notifications
        </h3>
        <div className="space-y-2">
          {['Live Match Updates', 'Favourite Team Alerts', 'Odds Change Alerts', 'Score Notifications'].map(s => (
            <label key={s} className="flex items-center justify-between p-3.5 bg-dark-bg rounded-xl border border-dark-border cursor-pointer hover:border-dark-border/70 transition-colors">
              <span className="text-sm">{s}</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#00e676]" />
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-base font-bold mb-3">Display Preferences</h3>
        <div className="space-y-2">
          <div className="p-3.5 bg-dark-bg rounded-xl border border-dark-border">
            <label className="block text-xs text-gray-400 mb-1.5">Odds Format</label>
            <select className="w-full bg-dark-card border border-dark-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent-green">
              <option>Decimal (2.50)</option>
              <option>Fractional (3/2)</option>
              <option>American (+150)</option>
            </select>
          </div>
          <div className="p-3.5 bg-dark-bg rounded-xl border border-dark-border">
            <label className="block text-xs text-gray-400 mb-1.5">Default Sport</label>
            <select className="w-full bg-dark-card border border-dark-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-accent-green">
              <option>Football</option>
              <option>Basketball</option>
              <option>Tennis</option>
              <option>Baseball</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
