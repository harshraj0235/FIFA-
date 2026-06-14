import Link from 'next/link';
import groupsData from '../data/groups.json';
import teamsData from '../data/teams.json';

export const metadata = {
  title: 'All Groups — FIFA World Cup 2026',
  description: 'View the complete group stage draw, standings, and matchups for all 12 groups at the 2026 FIFA World Cup.',
};

export default function GroupsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>📊 Group Stage</h1>
          <p className="subtitle">All 12 groups featuring 48 teams competing for the knockout stage.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card-grid">
            {groupsData.map(group => {
              const groupTeams = group.teams.map(slug => teamsData.find(t => t.slug === slug)).filter(Boolean);
              return (
                <Link href={`/groups/${group.slug}`} key={group.slug} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: '20px' }}>
                    <h3 style={{ marginBottom: '16px', color: 'var(--accent-gold)' }}>{group.name}</h3>
                    <table className="group-table">
                      <thead>
                        <tr>
                          <th>Team</th>
                          <th>Rank</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupTeams.map(team => (
                          <tr key={team.slug}>
                            <td>
                              <div className="team-cell">
                                <span className="flag">{team.flag}</span>
                                {team.name}
                              </div>
                            </td>
                            <td style={{ color: 'var(--text-muted)' }}>#{team.fifaRanking}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
