import { NextRequest, NextResponse } from 'next/server'

const sportsOddsData: Record<string, any[]> = {
  football: [
    {
      id: 1,
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      league: 'Premier League',
      time: '15:00',
      date: 'Today',
      status: 'upcoming',
      markets: {
        matchResult: { home: 2.10, draw: 3.40, away: 3.20 },
        bothTeamsScore: { yes: 1.75, no: 2.05 },
        overUnder: { over25: 1.85, under25: 1.95 },
      }
    },
    {
      id: 2,
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      league: 'La Liga',
      time: '20:00',
      date: 'Today',
      status: 'live',
      liveMinute: '67',
      homeScore: 1,
      awayScore: 1,
      markets: {
        matchResult: { home: 2.50, draw: 3.20, away: 2.80 },
        bothTeamsScore: { yes: 1.60, no: 2.25 },
        overUnder: { over25: 1.70, under25: 2.10 },
      }
    },
    {
      id: 3,
      homeTeam: 'Bayern Munich',
      awayTeam: 'Borussia Dortmund',
      league: 'Bundesliga',
      time: '17:30',
      date: 'Today',
      status: 'upcoming',
      markets: {
        matchResult: { home: 1.75, draw: 3.80, away: 4.50 },
        bothTeamsScore: { yes: 1.80, no: 2.00 },
        overUnder: { over25: 1.65, under25: 2.25 },
      }
    },
    {
      id: 4,
      homeTeam: 'PSG',
      awayTeam: 'Lyon',
      league: 'Ligue 1',
      time: '21:00',
      date: 'Today',
      status: 'upcoming',
      markets: {
        matchResult: { home: 1.55, draw: 4.10, away: 5.50 },
        bothTeamsScore: { yes: 1.90, no: 1.90 },
        overUnder: { over25: 1.75, under25: 2.05 },
      }
    },
    {
      id: 5,
      homeTeam: 'Juventus',
      awayTeam: 'AC Milan',
      league: 'Serie A',
      time: '18:45',
      date: 'Tomorrow',
      status: 'upcoming',
      markets: {
        matchResult: { home: 2.20, draw: 3.30, away: 3.10 },
        bothTeamsScore: { yes: 1.85, no: 1.95 },
        overUnder: { over25: 1.95, under25: 1.85 },
      }
    },
    {
      id: 6,
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      league: 'Premier League',
      time: '16:30',
      date: 'Tomorrow',
      status: 'upcoming',
      markets: {
        matchResult: { home: 2.30, draw: 3.25, away: 3.00 },
        bothTeamsScore: { yes: 1.70, no: 2.10 },
        overUnder: { over25: 1.80, under25: 2.00 },
      }
    },
  ],
  basketball: [
    {
      id: 101,
      homeTeam: 'LA Lakers',
      awayTeam: 'Golden State Warriors',
      league: 'NBA',
      time: '20:00',
      date: 'Today',
      status: 'live',
      liveMinute: 'Q3 5:23',
      homeScore: 87,
      awayScore: 82,
      markets: {
        matchResult: { home: 1.85, draw: null, away: 1.95 },
        pointSpread: { home: 1.90, away: 1.90 },
        overUnder: { over215: 1.90, under215: 1.90 },
      }
    },
    {
      id: 102,
      homeTeam: 'Boston Celtics',
      awayTeam: 'Miami Heat',
      league: 'NBA',
      time: '22:30',
      date: 'Today',
      status: 'upcoming',
      markets: {
        matchResult: { home: 1.65, draw: null, away: 2.25 },
        pointSpread: { home: 1.90, away: 1.90 },
        overUnder: { over220: 1.90, under220: 1.90 },
      }
    },
    {
      id: 103,
      homeTeam: 'Chicago Bulls',
      awayTeam: 'New York Knicks',
      league: 'NBA',
      time: '19:00',
      date: 'Tomorrow',
      status: 'upcoming',
      markets: {
        matchResult: { home: 2.10, draw: null, away: 1.75 },
        pointSpread: { home: 1.90, away: 1.90 },
        overUnder: { over210: 1.90, under210: 1.90 },
      }
    },
  ],
  tennis: [
    {
      id: 201,
      homeTeam: 'Novak Djokovic',
      awayTeam: 'Carlos Alcaraz',
      league: 'Australian Open',
      time: '14:00',
      date: 'Today',
      status: 'live',
      liveMinute: 'Set 2 - 4:3',
      homeScore: '6-4',
      awayScore: '4-6',
      markets: {
        matchResult: { home: 1.80, draw: null, away: 2.00 },
        sets: { over35: 1.85, under35: 1.95 },
      }
    },
    {
      id: 202,
      homeTeam: 'Rafael Nadal',
      awayTeam: 'Roger Federer',
      league: 'Roland Garros',
      time: '16:00',
      date: 'Today',
      status: 'upcoming',
      markets: {
        matchResult: { home: 1.60, draw: null, away: 2.30 },
        sets: { over35: 1.90, under35: 1.90 },
      }
    },
  ],
  baseball: [
    {
      id: 301,
      homeTeam: 'New York Yankees',
      awayTeam: 'Boston Red Sox',
      league: 'MLB',
      time: '19:05',
      date: 'Today',
      status: 'upcoming',
      markets: {
        matchResult: { home: 1.80, draw: null, away: 2.00 },
        overUnder: { over85: 1.90, under85: 1.90 },
      }
    },
    {
      id: 302,
      homeTeam: 'LA Dodgers',
      awayTeam: 'San Francisco Giants',
      league: 'MLB',
      time: '22:10',
      date: 'Today',
      status: 'upcoming',
      markets: {
        matchResult: { home: 1.65, draw: null, away: 2.25 },
        overUnder: { over75: 1.90, under75: 1.90 },
      }
    },
  ],
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sport = searchParams.get('sport')?.toLowerCase() || 'football'

  // Simulate slight API delay
  await new Promise(resolve => setTimeout(resolve, 100))

  const data = sportsOddsData[sport]

  if (!data) {
    return NextResponse.json(
      { error: `Sport '${sport}' not found. Available: ${Object.keys(sportsOddsData).join(', ')}` },
      { status: 404 }
    )
  }

  return NextResponse.json({
    sport,
    matches: data,
    availableSports: Object.keys(sportsOddsData),
    generatedAt: new Date().toISOString(),
  })
}
