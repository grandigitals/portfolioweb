'use client'

import { BarChart3, Trophy, TrendingUp, Activity } from 'lucide-react'

export default function StatsOverview() {
  const stats = [
    {
      icon: Activity,
      label: 'Live Matches',
      value: '12',
      color: 'text-accent-green',
      bgColor: 'bg-accent-green/10'
    },
    {
      icon: Trophy,
      label: 'Leagues',
      value: '25+',
      color: 'text-accent-blue',
      bgColor: 'bg-accent-blue/10'
    },
    {
      icon: TrendingUp,
      label: 'Today\'s Matches',
      value: '48',
      color: 'text-accent-orange',
      bgColor: 'bg-accent-orange/10'
    },
    {
      icon: BarChart3,
      label: 'This Week',
      value: '156',
      color: 'text-accent-yellow',
      bgColor: 'bg-accent-yellow/10'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="card hover:scale-105 transition-transform cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
