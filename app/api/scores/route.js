import { NextResponse } from 'next/server';

// FIFA World Cup 2026 Live Scores API - REAL DATA ONLY
export async function GET() {
  try {
    const apiKey = process.env.FOOTBALL_API_KEY;
    
    if (!apiKey) {
      console.warn('No FOOTBALL_API_KEY provided. Returning empty real data.');
      return NextResponse.json({ matches: [], source: 'api-missing-key' });
    }

    // Fetch real data from API-Sports for World Cup 2026 (League ID 1)
    const res = await fetch('https://v3.football.api-sports.io/fixtures?league=1&season=2026', {
      headers: { 'x-apisports-key': apiKey },
      next: { revalidate: 30 },
    });
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (!data.response) {
      return NextResponse.json({ matches: [], source: 'api' });
    }

    const matches = data.response.map(fixture => ({
      homeName: fixture.teams.home.name,
      awayName: fixture.teams.away.name,
      homeFlag: '', 
      awayFlag: '',
      homeScore: fixture.goals.home ?? null,
      awayScore: fixture.goals.away ?? null,
      status: fixture.fixture.status.short === '1H' || fixture.fixture.status.short === '2H' ? 'LIVE' : 
              fixture.fixture.status.short === 'HT' ? 'HT' :
              fixture.fixture.status.short === 'FT' ? 'FT' : 'SCHEDULED',
      minute: fixture.fixture.status.elapsed || 0,
      kickoff: new Date(fixture.fixture.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      venue: fixture.fixture.venue?.name || 'TBD',
      group: fixture.league.round || '',
      events: [], // Would fetch from fixture.events in a paid API tier
    }));
    
    // Sort: live first, then upcoming, then finished
    const order = { 'LIVE': 0, 'HT': 1, 'SCHEDULED': 2, 'FT': 3 };
    matches.sort((a, b) => (order[a.status] ?? 9) - (order[b.status] ?? 9));

    return NextResponse.json({ matches, source: 'api' });
    
  } catch (error) {
    console.error('Failed to fetch real live scores:', error);
    // As per user request: NO MOCK DATA. Return empty array on failure.
    return NextResponse.json({ matches: [], source: 'api-error', error: error.message });
  }
}

