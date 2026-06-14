import { NextResponse } from 'next/server';

// FIFA World Cup 2026 Live Standings API - REAL DATA ONLY
export async function GET() {
  try {
    const apiKey = process.env.FOOTBALL_API_KEY;
    
    if (!apiKey) {
      console.warn('No FOOTBALL_API_KEY provided. Returning empty real data.');
      return NextResponse.json({ groups: [], source: 'api-missing-key' });
    }

    // Fetch real standings data from API-Sports for World Cup 2026 (League ID 1)
    const res = await fetch('https://v3.football.api-sports.io/standings?league=1&season=2026', {
      headers: { 'x-apisports-key': apiKey },
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (!data.response || data.response.length === 0) {
      return NextResponse.json({ groups: [], source: 'api' });
    }

    const standingsData = data.response[0].league.standings;
    
    const groups = standingsData.map(groupArray => {
      const groupName = groupArray[0].group; // e.g. "Group A"
      
      const teams = groupArray.map(teamStat => ({
        name: teamStat.team.name,
        flag: '',
        slug: teamStat.team.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        played: teamStat.all.played,
        won: teamStat.all.win,
        drawn: teamStat.all.draw,
        lost: teamStat.all.lose,
        goalsFor: teamStat.all.goals.for,
        goalsAgainst: teamStat.all.goals.against,
        goalDifference: teamStat.goalsDiff,
        points: teamStat.points,
      }));

      return {
        name: groupName.replace('Group ', ''),
        teams,
      };
    });

    return NextResponse.json({ groups, source: 'api' });
  } catch (error) {
    console.error('Failed to fetch real live standings:', error);
    // As per user request: NO MOCK DATA. Return empty array on failure.
    return NextResponse.json({ groups: [], source: 'api-error', error: error.message });
  }
}

