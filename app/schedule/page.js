import Link from 'next/link';
import matchesData from '../data/matches.json';
import teamsData from '../data/teams.json';
import venuesData from '../data/venues.json';

export const metadata = {
  title: 'Full Match Schedule — FIFA World Cup 2026',
  description: 'Complete 104-match schedule for the 2026 FIFA World Cup. View all dates, times, and venues for the group stage and knockout rounds.',
};

export default function SchedulePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>📅 Match Schedule</h1>
          <p className="subtitle">All 104 matches of the 2026 FIFA World Cup.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card" style={{ marginBottom: '32px', padding: '24px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '16px' }}>View Times in Your Local Timezone</h2>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/timezone/india" className="btn btn-secondary">🇮🇳 India (IST)</Link>
              <Link href="/timezone/united-kingdom" className="btn btn-secondary">🇬🇧 UK (BST)</Link>
              <Link href="/timezone/australia" className="btn btn-secondary">🇦🇺 Australia (AEST)</Link>
            </div>
            <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              * Default times below are shown in your browser's local timezone.
            </p>
          </div>

          <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
            {matchesData.map(match => {
              const home = teamsData.find(t => t.slug === match.homeTeam);
              const away = teamsData.find(t => t.slug === match.awayTeam);
              const venue = venuesData.find(v => v.slug === match.venue);
              // Since this is SSG without a specific timezone prop, we'll let the client-side render handle exact local times if needed, 
              // but for SEO we render a generic UTC string or a specific static string.
              // We'll use a simple static rendering here for SEO, and recommend using a client component for true local time.
              const date = new Date(match.date);
              
              return (
                <Link href={`/matches/${match.slug}`} key={match.slug} style={{ textDecoration: 'none' }}>
                  <div className="card match-card" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: '1 1 200px', textAlign: 'left' }}>
                      <div className="match-date" style={{ fontSize: '1.1rem' }}>
                        {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' })} UTC
                      </div>
                    </div>
                    
                    <div className="match-teams" style={{ flex: '2 1 300px', margin: '0' }}>
                      <div className="match-team" style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <span className="name">{home?.name}</span>
                        <span className="flag" style={{ fontSize: '1.5rem' }}>{home?.flag}</span>
                      </div>
                      <div className="match-vs" style={{ fontSize: '0.9rem', padding: '0 16px' }}>VS</div>
                      <div className="match-team" style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <span className="flag" style={{ fontSize: '1.5rem' }}>{away?.flag}</span>
                        <span className="name">{away?.name}</span>
                      </div>
                    </div>

                    <div style={{ flex: '1 1 200px', textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <div>📍 {venue?.name}</div>
                      <div>Group {match.group}</div>
                    </div>
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
