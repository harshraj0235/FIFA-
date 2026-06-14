import Link from 'next/link';
import venuesData from '../data/venues.json';

export const metadata = {
  title: 'Venues & Stadiums — FIFA World Cup 2026',
  description: 'Explore the 16 iconic host cities and stadiums for the 2026 FIFA World Cup across the United States, Mexico, and Canada.',
};

export default function VenuesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>🏟️ Venues & Stadiums</h1>
          <p className="subtitle">16 world-class venues across 3 host nations.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card-grid-3">
            {venuesData.map(venue => (
              <Link href={`/venues/${venue.slug}`} key={venue.slug} style={{ textDecoration: 'none' }}>
                <div className="card venue-card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ height: '160px', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '3rem', opacity: 0.2 }}>🏟️</span>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3>{venue.name}</h3>
                    <div className="venue-city">📍 {venue.city}, {venue.country}</div>
                    <div className="venue-capacity">🏟️ Capacity: {venue.capacity.toLocaleString()}</div>
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
