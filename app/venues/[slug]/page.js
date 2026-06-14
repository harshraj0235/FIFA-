import Link from 'next/link';
import { notFound } from 'next/navigation';
import venuesData from '../../data/venues.json';
import matchesData from '../../data/matches.json';
import teamsData from '../../data/teams.json';

export function generateStaticParams() {
  return venuesData.map((venue) => ({
    slug: venue.slug,
  }));
}

export function generateMetadata({ params }) {
  const venue = venuesData.find(v => v.slug === params.slug);
  if (!venue) return {};
  
  return {
    title: `${venue.name} — World Cup 2026 Venue in ${venue.city}`,
    description: `Complete guide to ${venue.name} in ${venue.city}, ${venue.country}. Capacity: ${venue.capacity.toLocaleString()}. See the full schedule of World Cup 2026 matches hosted here.`,
    keywords: [`${venue.name} World Cup`, `${venue.city} World Cup stadium`, `World Cup 2026 venues`],
  };
}

export default function VenuePage({ params }) {
  const venue = venuesData.find(v => v.slug === params.slug);
  
  if (!venue) {
    notFound();
  }

  const venueMatches = matchesData.filter(m => m.venue === venue.slug);

  return (
    <>
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">Home</Link> <span className="sep">/</span> 
          <Link href="/venues">Venues</Link> <span className="sep">/</span> 
          <span>{venue.name}</span>
        </div>
      </div>

      <section className="page-hero" style={{ borderBottom: 'none', paddingBottom: '20px' }}>
        <div className="container">
          <h1>{venue.name}</h1>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
            <span className="tag">📍 {venue.city}, {venue.country}</span>
            <span className="tag">👥 Capacity: {venue.capacity.toLocaleString()}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content" style={{ margin: '0', maxWidth: '100%' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
              <div>
                <div style={{ width: '100%', height: '250px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '4rem', opacity: 0.2 }}>🏟️</span>
                </div>
                <h2>About the Venue</h2>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>{venue.description}</p>
                
                <div className="card" style={{ marginTop: '24px', padding: '20px' }}>
                  <h3 style={{ marginTop: 0, fontSize: '1.1rem' }}>Venue Details</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                      <strong>Timezone:</strong> <span style={{ float: 'right' }}>{venue.timezone} (UTC {venue.utcOffset})</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2>Matches at {venue.name}</h2>
                {venueMatches.length > 0 ? (
                  <div className="card-grid" style={{ gridTemplateColumns: '1fr', margin: 0 }}>
                    {venueMatches.map(match => {
                      const home = teamsData.find(t => t.slug === match.homeTeam);
                      const away = teamsData.find(t => t.slug === match.awayTeam);
                      const date = new Date(match.date);
                      
                      return (
                        <Link href={`/matches/${match.slug}`} key={match.slug} style={{ textDecoration: 'none' }}>
                          <div className="card match-card" style={{ padding: '16px' }}>
                            <div className="match-teams" style={{ margin: 0 }}>
                              <div className="match-team">
                                <span className="flag" style={{ fontSize: '1.5rem' }}>{home?.flag}</span>
                                <span className="name">{home?.name}</span>
                              </div>
                              <div className="match-vs" style={{ fontSize: '0.9rem' }}>VS</div>
                              <div className="match-team">
                                <span className="flag" style={{ fontSize: '1.5rem' }}>{away?.flag}</span>
                                <span className="name">{away?.name}</span>
                              </div>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
                              {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} Local
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>Matches for this venue have not been finalized yet.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="ad-slot" style={{ margin: '48px 0 0 0' }}>Advertisement</div>
          </div>
        </div>
      </section>
    </>
  );
}
