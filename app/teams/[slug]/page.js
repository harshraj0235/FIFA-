import Link from 'next/link';
import { notFound } from 'next/navigation';
import teamsData from '../../data/teams.json';
import matchesData from '../../data/matches.json';
import groupsData from '../../data/groups.json';
import venuesData from '../../data/venues.json';

// Generate static params for all 48 teams to enable SSG
export function generateStaticParams() {
  return teamsData.map((team) => ({
    slug: team.slug,
  }));
}

export function generateMetadata({ params }) {
  const team = teamsData.find(t => t.slug === params.slug);
  if (!team) return {};
  
  return {
    title: `${team.name} FIFA World Cup 2026 — Schedule, Roster & Group ${team.group}`,
    description: `Complete guide to ${team.name} at the 2026 FIFA World Cup. See their full match schedule, key players like ${team.keyPlayers.join(', ')}, and Group ${team.group} standings.`,
    keywords: [`${team.name} World Cup`, `${team.name} football`, `Group ${team.group}`],
  };
}

export default function TeamPage({ params }) {
  const team = teamsData.find(t => t.slug === params.slug);
  
  if (!team) {
    notFound();
  }

  // Get team's matches
  const teamMatches = matchesData.filter(m => m.homeTeam === team.slug || m.awayTeam === team.slug);
  
  // Get group data
  const group = groupsData.find(g => g.slug === team.group.toLowerCase());
  const groupTeams = group ? group.teams.map(slug => teamsData.find(t => t.slug === slug)) : [];

  return (
    <>
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">Home</Link> <span className="sep">/</span> 
          <Link href="/teams">Teams</Link> <span className="sep">/</span> 
          <span>{team.name}</span>
        </div>
      </div>

      <section className="page-hero" style={{ borderBottom: 'none' }}>
        <div className="container">
          <div style={{ fontSize: '5rem', lineHeight: '1', marginBottom: '16px' }}>{team.flag}</div>
          <h1>{team.name}</h1>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
            <span className="tag">Group {team.group}</span>
            <span className="tag">FIFA Rank #{team.fifaRanking}</span>
            <span className="tag">{team.confederation}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content" style={{ margin: '0' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-primary)' }}>
              {team.description}
            </p>
            
            <div className="ad-slot" style={{ margin: '32px 0' }}>Advertisement</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginTop: '48px' }}>
              <div>
                <h2>Key Information</h2>
                <div className="card" style={{ padding: '24px' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Head Coach:</strong> <span style={{ float: 'right' }}>{team.coach}</span>
                    </li>
                    <li style={{ marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>Key Players:</strong> <span style={{ float: 'right' }}>{team.keyPlayers.join(', ')}</span>
                    </li>
                    <li style={{ marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>World Cup Appearances:</strong> <span style={{ float: 'right' }}>{team.appearances}</span>
                    </li>
                    <li>
                      <strong style={{ color: 'var(--text-primary)' }}>World Cup Titles:</strong> <span style={{ float: 'right' }}>{team.titles}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2>Group {team.group} Opponents</h2>
                <div className="card" style={{ padding: '20px' }}>
                  <table className="group-table" style={{ margin: 0 }}>
                    <tbody>
                      {groupTeams.map(t => (
                        <tr key={t.slug}>
                          <td>
                            <Link href={`/teams/${t.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: t.slug === team.slug ? '800' : '500', color: t.slug === team.slug ? 'var(--accent-gold)' : 'inherit' }}>
                              <span className="flag">{t.flag}</span>
                              {t.name}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <Link href={`/groups/${team.group.toLowerCase()}`} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>View Group {team.group} Standings</Link>
                  </div>
                </div>
              </div>
            </div>

            <h2 style={{ marginTop: '48px' }}>Match Schedule</h2>
            {teamMatches.length > 0 ? (
              <div className="card-grid">
                {teamMatches.map(match => {
                  const home = teamsData.find(t => t.slug === match.homeTeam);
                  const away = teamsData.find(t => t.slug === match.awayTeam);
                  const venue = venuesData.find(v => v.slug === match.venue);
                  const date = new Date(match.date);
                  
                  return (
                    <Link href={`/matches/${match.slug}`} key={match.slug} style={{ textDecoration: 'none' }}>
                      <div className="card match-card">
                        <div className="match-teams">
                          <div className="match-team">
                            <span className="flag">{home.flag}</span>
                            <span className="name">{home.name}</span>
                          </div>
                          <div className="match-vs">VS</div>
                          <div className="match-team">
                            <span className="flag">{away.flag}</span>
                            <span className="name">{away.name}</span>
                          </div>
                        </div>
                        <div className="match-info">
                          <div className="match-date">{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} — {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                          <div>📍 {venue ? venue.name : 'TBD'}</div>
                          <div style={{ marginTop: '8px' }}><span className="tag">{match.stage.replace('-', ' ').toUpperCase()}</span></div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p>Schedule will be updated as matches are confirmed.</p>
            )}
            
            <div className="ad-slot" style={{ margin: '48px 0 0 0' }}>Advertisement</div>
          </div>
        </div>
      </section>
    </>
  );
}
