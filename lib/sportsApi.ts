// Sports API Integration Layer
// This file provides a clean interface for integrating with various sports APIs

const API_FOOTBALL_BASE_URL = process.env.NEXT_PUBLIC_SPORTS_API_URL || 'https://v3.football.api-sports.io'
const API_KEY = process.env.NEXT_PUBLIC_SPORTS_API_KEY || ''

interface ApiHeaders {
  'x-rapidapi-key': string
  'x-rapidapi-host': string
}

const getHeaders = (): ApiHeaders => ({
  'x-rapidapi-key': API_KEY,
  'x-rapidapi-host': 'v3.football.api-sports.io'
})

// API Football Endpoints
export const sportsApi = {
  // Get live matches
  getLiveMatches: async () => {
    if (!API_KEY) {
      throw new Error('API key not configured')
    }

    const response = await fetch(`${API_FOOTBALL_BASE_URL}/fixtures?live=all`, {
      headers: getHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch live matches')
    }
    
    return response.json()
  },

  // Get fixtures by date
  getFixturesByDate: async (date: string) => {
    if (!API_KEY) {
      throw new Error('API key not configured')
    }

    const response = await fetch(`${API_FOOTBALL_BASE_URL}/fixtures?date=${date}`, {
      headers: getHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch fixtures')
    }
    
    return response.json()
  },

  // Get leagues
  getLeagues: async () => {
    if (!API_KEY) {
      throw new Error('API key not configured')
    }

    const response = await fetch(`${API_FOOTBALL_BASE_URL}/leagues`, {
      headers: getHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch leagues')
    }
    
    return response.json()
  },

  // Get team information
  getTeam: async (teamId: number) => {
    if (!API_KEY) {
      throw new Error('API key not configured')
    }

    const response = await fetch(`${API_FOOTBALL_BASE_URL}/teams?id=${teamId}`, {
      headers: getHeaders()
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch team')
    }
    
    return response.json()
  }
}

// Alternative: TheSportsDB API (Free, no key required)
const SPORTSDB_BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3'

export const sportsDbApi = {
  // Get live scores (Soccer)
  getLiveSoccer: async () => {
    const response = await fetch(`${SPORTSDB_BASE_URL}/livescore.php?s=Soccer`)
    if (!response.ok) {
      throw new Error('Failed to fetch live scores')
    }
    return response.json()
  },

  // Get events by date
  getEventsByDate: async (date: string, sport: string = 'Soccer') => {
    const response = await fetch(`${SPORTSDB_BASE_URL}/eventsday.php?d=${date}&s=${sport}`)
    if (!response.ok) {
      throw new Error('Failed to fetch events')
    }
    return response.json()
  },

  // Get team details
  getTeam: async (teamId: string) => {
    const response = await fetch(`${SPORTSDB_BASE_URL}/lookupteam.php?id=${teamId}`)
    if (!response.ok) {
      throw new Error('Failed to fetch team')
    }
    return response.json()
  },

  // Search for team
  searchTeam: async (teamName: string) => {
    const response = await fetch(`${SPORTSDB_BASE_URL}/searchteams.php?t=${teamName}`)
    if (!response.ok) {
      throw new Error('Failed to search team')
    }
    return response.json()
  }
}

// Export a unified API interface
export const getSportsData = {
  live: async () => {
    // Try API-Football first if key is available, fallback to TheSportsDB
    try {
      if (API_KEY) {
        return await sportsApi.getLiveMatches()
      }
      return await sportsDbApi.getLiveSoccer()
    } catch (error) {
      console.error('Error fetching live data:', error)
      return null
    }
  },

  fixtures: async (date: string) => {
    try {
      if (API_KEY) {
        return await sportsApi.getFixturesByDate(date)
      }
      return await sportsDbApi.getEventsByDate(date)
    } catch (error) {
      console.error('Error fetching fixtures:', error)
      return null
    }
  }
}
