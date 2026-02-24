'use client'

import { useAuth } from '@/contexts/AuthContext'
import { User, Settings, Heart, LogOut, Trophy, Calendar } from 'lucide-react'
import { useState } from 'react'

export default function UserProfile() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')

  if (!user) return null

  return (
    <div className="min-h-screen bg-dark-bg py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-dark-card rounded-xl p-6 mb-6 border border-dark-border">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">Member since {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-dark-bg rounded-lg p-4 text-center">
              <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">247</p>
              <p className="text-sm text-gray-400">Matches Watched</p>
            </div>
            <div className="bg-dark-bg rounded-lg p-4 text-center">
              <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-gray-400">Favorite Teams</p>
            </div>
            <div className="bg-dark-bg rounded-lg p-4 text-center">
              <Calendar className="w-6 h-6 text-secondary mx-auto mb-2" />
              <p className="text-2xl font-bold">18</p>
              <p className="text-sm text-gray-400">Upcoming Matches</p>
            </div>
            <div className="bg-dark-bg rounded-lg p-4 text-center">
              <Settings className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold">Active</p>
              <p className="text-sm text-gray-400">Account Status</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-dark-card rounded-xl border border-dark-border overflow-hidden">
          <div className="flex border-b border-dark-border">
            {['overview', 'favorites', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-primary text-white'
                    : 'text-gray-400 hover:bg-dark-bg'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'favorites' && <FavoritesTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-dark-bg rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">Watched: Manchester United vs Liverpool</p>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
              <span className="text-primary">2-1</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FavoritesTab() {
  const favoriteTeams = [
    { name: 'Manchester United', league: 'Premier League', logo: '🔴' },
    { name: 'Barcelona', league: 'La Liga', logo: '🔵' },
    { name: 'Bayern Munich', league: 'Bundesliga', logo: '🔴' },
  ]

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Favorite Teams</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteTeams.map((team, i) => (
          <div key={i} className="bg-dark-bg rounded-lg p-4 flex items-center gap-3 hover:bg-dark-hover transition-colors cursor-pointer">
            <span className="text-4xl">{team.logo}</span>
            <div>
              <p className="font-medium">{team.name}</p>
              <p className="text-sm text-gray-400">{team.league}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Notification Settings</h3>
        <div className="space-y-3">
          {['Live Match Updates', 'Favorite Team Alerts', 'Score Notifications'].map((setting) => (
            <label key={setting} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg cursor-pointer hover:bg-dark-hover transition-colors">
              <span>{setting}</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Display Preferences</h3>
        <div className="space-y-3">
          <div className="p-4 bg-dark-bg rounded-lg">
            <label className="block text-sm font-medium mb-2">Time Zone</label>
            <select className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-2 text-white">
              <option>UTC (GMT+0)</option>
              <option>EST (GMT-5)</option>
              <option>PST (GMT-8)</option>
            </select>
          </div>
          <div className="p-4 bg-dark-bg rounded-lg">
            <label className="block text-sm font-medium mb-2">Default Sport</label>
            <select className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-2 text-white">
              <option>Football</option>
              <option>Basketball</option>
              <option>Tennis</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
