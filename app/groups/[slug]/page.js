import Link from 'next/link';
import { notFound } from 'next/navigation';
import groupsData from '../../data/groups.json';
import teamsData from '../../data/teams.json';
import matchesData from '../../data/matches.json';
import venuesData from '../../data/venues.json';

export function generateStaticParams() {
  return groupsData.map((group) => ({
    slug: group.slug,
  }));
}

export function generateMetadata({ params }) {
  const group = groupsData.find(g => g.slug === params.slug);
  if (!group) return {};
  
  const teamNames = group.teams.map(slug => teamsData.find(t => t.slug === slug)?.name).join(', ');
  
  return {
    title: `${group.name} Standings & Schedule — FIFA World Cup 2026`,
    description: `Complete guide to ${group.name} at the 2026 FIFA World Cup. Featuring ${teamNames}. View live standings, match schedules, and predictions.`,
    keywords: [`World Cup ${group.name}`, `${group.name} standings`, `World Cup 2026`],
  };
}

export default function GroupPage({ params }) {
  const group = groupsData.find(g => g.slug === params.slug);
  
  if (!group) {
    notFound();
  }

  const groupTeams = group.teams.map(slug => teamsData.find(t => t.slug === slug)).filter(Boolean);
  const groupMatches = matchesData.filter(m => m.group === group.slug.toUpperCase());

  return (
    <>
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">Home</Link> <span className="sep">/</span> 
          <Link href="/groups">Groups</Link> <span className="sep">/</span> 
          <span>{group.name}</span>
        </div>
      </div>

      <section className="page-hero">
        <div className="container">
          <h1>{group.name}</h1>
          <p className="subtitle">Current standings and match schedule for the group stage.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content" style={{ margin: '0', maxWidth: '100%' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
              <div>
                <h2>Live Standings</h2>
                <div className="card" style={{ padding: '24px' }}>
                  <table className="group-table" style={{ margin: 0, width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Pos</th>
                        <th>Team</th>
                        <th title="Played">P</th>
                        <th title="Won">W</th>
                        <th title="Drawn">D</th>
                        <th title="Lost">L</th>
                        <th title="Goal Difference">GD</th>
                        <th title="Points">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupTeams.map((team, index) => (
                        <tr key={team.slug}>
                          <td>{index + 1}</td>
                          <td>
                            <Link href={`/teams/${team.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span className="flag" style={{ fontSize: '1.2rem' }}>{team.flag}</span>
                              {team.name}
                            </Link>
                          </td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td style={{ fontWeight: 'bold' }}>0</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '16px', fontStyle: 'italic' }}>
                    * Top 2 teams advance automatically. Best 8 third-place teams also advance.
                  </p>
                </div>
              </div>

              <div>
                <h2>Group {group.slug.toUpperCase()} Schedule</h2>
                <div className="card-grid" style={{ gridTemplateColumns: '1fr', margin: 0 }}>
                  {groupMatches.length > 0 ? groupMatches.map(match => {
                    const home = teamsData.find(t => t.slug === match.homeTeam);
                    const away = teamsData.find(t => t.slug === match.awayTeam);
                    const venue = venuesData.find(v => v.slug === match.venue);
                    const date = new Date(match.date);
                    
                    return (
                      <Link href={`/matches/${match.slug}`} key={match.slug} style={{ textDecoration: 'none' }}>
                        <div className="card match-card" style={{ padding: '16px' }}>
                          <div className="match-teams" style={{ margin: 0 }}>
                            <div className="match-team">
                              <span className="flag" style={{ fontSize: '2rem' }}>{home?.flag}</span>
                              <span className="name">{home?.name}</span>
                            </div>
                            <div className="match-vs" style={{ fontSize: '0.9rem' }}>VS</div>
                            <div className="match-team">
                              <span className="flag" style={{ fontSize: '2rem' }}>{away?.flag}</span>
                              <span className="name">{away?.name}</span>
                            </div>
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
                            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {venue ? venue.name : 'TBD'}
                          </div>
                        </div>
                      </Link>
                    );
                  }) : (
                    <p style={{ color: 'var(--text-secondary)' }}>Match schedule will be updated shortly.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="ad-slot" style={{ margin: '40px 0' }}>Advertisement</div>
            
            <div style={{ marginTop: '40px' }}>
              <h2>Group Analysis</h2>
              <p>
                {group.name} promises to be one of the most exciting groups in the tournament. 
                With {groupTeams.length > 0 ? groupTeams[0].name : 'the top seed'} looking to assert their dominance, 
                and teams like {groupTeams.length > 1 ? groupTeams[1].name : 'the challengers'} ready to cause an upset, 
                every point will be crucial. The matches played in this group will be pivotal for the entire tournament bracket.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
