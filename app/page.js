import Link from 'next/link';
import teamsData from './data/teams.json';
import groupsData from './data/groups.json';
import venuesData from './data/venues.json';
import LiveScores from './components/LiveScores';
import LiveStandings from './components/LiveStandings';
import Countdown from './components/Countdown';

export default function HomePage() {
  const featuredTeams = teamsData.filter(t => ['brazil', 'argentina', 'france', 'england', 'spain', 'germany', 'portugal', 'netherlands'].includes(t.slug));
  const topGroups = groupsData.slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🔴 LIVE NOW — Group Stage in Progress</div>
          <h1>FIFA World Cup <span className="highlight">2026</span></h1>
          <p>Your complete fan hub — match schedules in your timezone, all 48 teams, 16 stadiums, group standings & live updates. June 11 – July 19, 2026.</p>
          <div className="hero-buttons">
              <Link href="/schedule" className="btn btn-primary">Match Schedule</Link>
              <Link href="/teams" className="btn btn-secondary">Explore Teams</Link>
            </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Countdown />
          <LiveScores />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header animate-fadeInUp">
            <h2>Live Group Standings</h2>
            <p>Real-time updates as the tournament progresses</p>
          </div>
          <LiveStandings />
        </div>
      </section>

      {/* STATS */}
      <section className="section">
        <div className="container">
          <div className="stats-row animate-fadeInUp">
            <div className="stat-item">
              <div className="stat-value">48</div>
              <div className="stat-label">Teams</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">104</div>
              <div className="stat-label">Matches</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">16</div>
              <div className="stat-label">Venues</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">3</div>
              <div className="stat-label">Host Nations</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">Groups</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TEAMS */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>⭐ Featured Teams</h2>
            <p>The favorites and contenders at the 2026 FIFA World Cup</p>
          </div>
          <div className="card-grid">
            {featuredTeams.map(team => (
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
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/teams" className="btn btn-secondary">View All 48 Teams →</Link>
          </div>
        </div>
      </section>

      {/* GROUPS PREVIEW */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>📊 Group Stage</h2>
            <p>48 teams divided into 12 groups of four</p>
          </div>
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
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/groups" className="btn btn-secondary">View All Groups →</Link>
          </div>
        </div>
      </section>

      {/* AD SLOT */}
      <section className="section">
        <div className="container">
          <div className="ad-slot">Advertisement</div>
        </div>
      </section>

      {/* VENUES */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>🏟️ World Cup Venues</h2>
            <p>16 iconic stadiums across the United States, Mexico & Canada</p>
          </div>
          <div className="card-grid-3">
            {venuesData.slice(0, 6).map(venue => (
              <Link href={`/venues/${venue.slug}`} key={venue.slug} style={{ textDecoration: 'none' }}>
                <div className="card venue-card">
                  <h3>{venue.name}</h3>
                  <div className="venue-city">📍 {venue.city}, {venue.country}</div>
                  <div className="venue-capacity">🏟️ Capacity: {venue.capacity.toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/venues" className="btn btn-secondary">View All 16 Venues →</Link>
          </div>
        </div>
      </section>

      {/* TIMEZONE CTA */}
      <section className="section">
        <div className="container">
          <div className="card" style={{ textAlign: 'center', padding: '48px 32px' }}>
            <h2 style={{ marginBottom: '12px' }}>🌍 Match Times in Your Country</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
              Never miss a match! See the complete World Cup 2026 schedule converted to your local timezone.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/timezone/india" className="btn btn-primary">🇮🇳 India</Link>
              <Link href="/timezone/united-kingdom" className="btn btn-secondary">🇬🇧 UK</Link>
              <Link href="/timezone/australia" className="btn btn-secondary">🇦🇺 Australia</Link>
              <Link href="/tools/timezone-converter" className="btn btn-secondary">All Countries →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <h2>❓ Frequently Asked Questions</h2>
          </div>
          <div className="faq-item">
            <h3>When is the FIFA World Cup 2026?</h3>
            <p>The 2026 FIFA World Cup runs from June 11 to July 19, 2026. The group stage is from June 11-27, followed by knockout rounds. The final is on July 19 at MetLife Stadium in New York/New Jersey.</p>
          </div>
          <div className="faq-item">
            <h3>How many teams are in the 2026 World Cup?</h3>
            <p>The 2026 World Cup features 48 teams — the most in history. They are divided into 12 groups of four teams each. The top two from each group plus the eight best third-placed teams advance to the Round of 32.</p>
          </div>
          <div className="faq-item">
            <h3>Where is the 2026 World Cup being held?</h3>
            <p>The 2026 FIFA World Cup is co-hosted by three countries: the United States (11 venues), Mexico (3 venues), and Canada (2 venues). There are 16 host cities and stadiums in total.</p>
          </div>
          <div className="faq-item">
            <h3>How many matches are in the 2026 World Cup?</h3>
            <p>There are 104 total matches in the 2026 FIFA World Cup — the most ever. This includes 48 group stage matchdays, 16 Round of 32 matches, 8 Round of 16 matches, 4 quarter-finals, 2 semi-finals, a third-place match, and the final.</p>
          </div>
          <div className="faq-item">
            <h3>What time are World Cup 2026 matches in India?</h3>
            <p>Most World Cup 2026 matches kick off between 6:00 PM and 4:00 AM IST (Indian Standard Time), as the tournament is held in North America. Visit our timezone converter for the complete schedule in Indian time.</p>
          </div>
        </div>
      </section>
    </>
  );
}
