import Link from 'next/link';
import { notFound } from 'next/navigation';
import timezonesData from '../../data/timezones.json';
import matchesData from '../../data/matches.json';
import teamsData from '../../data/teams.json';

export function generateStaticParams() {
  return timezonesData.map((tz) => ({
    country: tz.slug,
  }));
}

export function generateMetadata({ params }) {
  const tz = timezonesData.find(t => t.slug === params.country);
  if (!tz) return {};
  
  return {
    title: `World Cup 2026 Match Schedule & Times in ${tz.name}`,
    description: `Complete FIFA World Cup 2026 schedule converted to local time in ${tz.name} (${tz.timezone}). Never miss a match with our localized kickoff times.`,
    keywords: [`World Cup times in ${tz.name}`, `World Cup schedule ${tz.name}`, `FIFA World Cup 2026`],
  };
}

export default function TimezonePage({ params }) {
  const tz = timezonesData.find(t => t.slug === params.country);
  
  if (!tz) {
    notFound();
  }

  return (
    <>
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">Home</Link> <span className="sep">/</span> 
          <span>Timezones</span> <span className="sep">/</span> 
          <span>{tz.name}</span>
        </div>
      </div>

      <section className="page-hero">
        <div className="container">
          <h1>World Cup 2026 Times in {tz.name}</h1>
          <p className="subtitle">All 104 matches converted to your local time ({tz.timezone}).</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="ad-slot" style={{ marginTop: 0 }}>Advertisement</div>

          <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
            {matchesData.map(match => {
              const home = teamsData.find(t => t.slug === match.homeTeam);
              const away = teamsData.find(t => t.slug === match.awayTeam);
              const date = new Date(match.date);
              
              return (
                <Link href={`/matches/${match.slug}`} key={match.slug} style={{ textDecoration: 'none' }}>
                  <div className="card match-card" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ flex: '1 1 200px', textAlign: 'left' }}>
                      <div className="match-date" style={{ fontSize: '1.2rem', color: 'var(--accent-red)' }}>
                        {date.toLocaleDateString(tz.locale, { timeZone: tz.timezone, weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 'bold' }}>
                        {date.toLocaleTimeString(tz.locale, { timeZone: tz.timezone, hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
                      </div>
                    </div>
                    
                    <div className="match-teams" style={{ flex: '2 1 300px', margin: '0' }}>
                      <div className="match-team" style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <span className="name" style={{ fontSize: '1.1rem' }}>{home?.name}</span>
                        <span className="flag" style={{ fontSize: '2rem' }}>{home?.flag}</span>
                      </div>
                      <div className="match-vs" style={{ fontSize: '0.9rem', padding: '0 16px' }}>VS</div>
                      <div className="match-team" style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <span className="flag" style={{ fontSize: '2rem' }}>{away?.flag}</span>
                        <span className="name" style={{ fontSize: '1.1rem' }}>{away?.name}</span>
                      </div>
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
