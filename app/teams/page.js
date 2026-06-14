import Link from 'next/link';
import teamsData from '../data/teams.json';

export const metadata = {
  title: 'All 48 Teams — FIFA World Cup 2026',
  description: 'Complete profiles, squads, and schedules for all 48 teams competing in the 2026 FIFA World Cup across the USA, Mexico, and Canada.',
};

export default function TeamsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>🏆 All 48 Teams</h1>
          <p className="subtitle">Explore the complete lineup for the 2026 FIFA World Cup</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card-grid">
            {teamsData.map(team => (
              <Link href={`/teams/${team.slug}`} key={team.slug} style={{ textDecoration: 'none' }}>
                <div className="card team-card">
                  <div className="team-flag">{team.flag}</div>
                  <div className="team-info">
                    <h3>{team.name}</h3>
                    <p>Group {team.group} • FIFA Rank #{team.fifaRanking}</p>
                    <div className="team-meta">
                      {team.titles > 0 && (
                        <span className="team-badge">🏆 {team.titles}x Champion{team.titles > 1 ? 's' : ''}</span>
                      )}
                      <span className="team-badge">{team.confederation}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
