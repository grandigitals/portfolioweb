'use client'

import { useState, useEffect } from 'react'
import useSWR from 'swr'

// Mock data generator for demonstration
// Replace with actual API calls when ready
const generateMockData = () => {
  const leagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'UEFA Champions League']
  const teams = [
    'Manchester United', 'Liverpool', 'Chelsea', 'Arsenal', 'Manchester City',
    'Real Madrid', 'Barcelona', 'Atletico Madrid', 'Valencia',
    'Juventus', 'AC Milan', 'Inter Milan', 'Roma',
    'Bayern Munich', 'Borussia Dortmund', 'RB Leipzig',
    'PSG', 'Lyon', 'Marseille'
  ]

  const getRandomTeam = () => teams[Math.floor(Math.random() * teams.length)]
  const getRandomLeague = () => leagues[Math.floor(Math.random() * leagues.length)]
  const getRandomScore = () => Math.floor(Math.random() * 5)
  const getRandomTime = () => `${Math.floor(Math.random() * 90) + 1}'`

  return {
    liveMatches: Array.from({ length: 6 }, (_, i) => ({
      id: `live-${i}`,
      homeTeam: getRandomTeam(),
      awayTeam: getRandomTeam(),
      homeScore: getRandomScore(),
      awayScore: getRandomScore(),
      status: i < 4 ? 'live' : 'finished',
      time: i < 4 ? getRandomTime() : 'FT',
      league: getRandomLeague()
    })),
    upcomingMatches: Array.from({ length: 8 }, (_, i) => ({
      id: `upcoming-${i}`,
      homeTeam: getRandomTeam(),
      awayTeam: getRandomTeam(),
      status: 'upcoming',
      time: `${12 + i}:00`,
      date: i < 3 ? 'Today' : i < 6 ? 'Tomorrow' : 'This Week',
      league: getRandomLeague()
    })),
    featuredMatches: Array.from({ length: 3 }, (_, i) => ({
      id: `featured-${i}`,
      homeTeam: getRandomTeam(),
      awayTeam: getRandomTeam(),
      homeScore: i === 0 ? getRandomScore() : undefined,
      awayScore: i === 0 ? getRandomScore() : undefined,
      status: i === 0 ? 'live' : 'upcoming',
      time: i === 0 ? getRandomTime() : `${14 + i}:00`,
      league: getRandomLeague()
    }))
  }
}

export function useSportsData() {
  const [data, setData] = useState(generateMockData())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // Update live scores every 10 seconds
    const interval = setInterval(() => {
      setData(generateMockData())
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return {
    liveMatches: data.liveMatches,
    upcomingMatches: data.upcomingMatches,
    featuredMatches: data.featuredMatches,
    isLoading
  }
}

// Future implementation with real API
export function useSportsAPI(endpoint: string) {
  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_SPORTS_API_KEY || '',
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    })
    return response.json()
  }

  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_SPORTS_API_KEY ? endpoint : null,
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true
    }
  )

  return {
    data,
    isLoading,
    error
  }
}
