import Link from 'next/link';
import { notFound } from 'next/navigation';
import matchesData from '../../data/matches.json';
import teamsData from '../../data/teams.json';
import venuesData from '../../data/venues.json';

export function generateStaticParams() {
  return matchesData.map((match) => ({
    slug: match.slug,
  }));
}

export function generateMetadata({ params }) {
  const match = matchesData.find(m => m.slug === params.slug);
  if (!match) return {};
  
  const home = teamsData.find(t => t.slug === match.homeTeam);
  const away = teamsData.find(t => t.slug === match.awayTeam);
  
  return {
    title: `${home?.name} vs ${away?.name} — World Cup 2026 Match Prediction & Time`,
    description: `Match preview, predictions, and live time for ${home?.name} vs ${away?.name} in Group ${match.group}. Playing on ${new Date(match.date).toLocaleDateString()} at the 2026 FIFA World Cup.`,
    keywords: [`${home?.name} vs ${away?.name}`, `World Cup match ${match.matchNumber}`, `Group ${match.group}`],
  };
}

export default function MatchPage({ params }) {
  const match = matchesData.find(m => m.slug === params.slug);
  
  if (!match) {
    notFound();
  }

  const home = teamsData.find(t => t.slug === match.homeTeam);
  const away = teamsData.find(t => t.slug === match.awayTeam);
  const venue = venuesData.find(v => v.slug === match.venue);
  const date = new Date(match.date);

  return (
    <>
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">Home</Link> <span className="sep">/</span> 
          <Link href="/schedule">Schedule</Link> <span className="sep">/</span> 
          <span>{home?.name} vs {away?.name}</span>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="card" style={{ padding: '40px 20px', textAlign: 'center', background: 'var(--gradient-card)' }}>
            <div style={{ display: 'inline-block', marginBottom: '24px' }}>
              <span className="tag" style={{ marginRight: '8px' }}>{match.stage.replace('-', ' ').toUpperCase()}</span>
              {match.group && <span className="tag">GROUP {match.group}</span>}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(20px, 5vw, 60px)' }}>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <Link href={`/teams/${home?.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1 }}>{home?.flag}</div>
                  <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', marginTop: '12px' }}>{home?.name}</h2>
                </Link>
              </div>
              
              <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '900', color: 'var(--accent-red)', margin: '10px 0' }}>VS</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Match #{match.matchNumber}</div>
              </div>
              
              <div style={{ flex: 1, textAlign: 'left' }}>
                <Link href={`/teams/${away?.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1 }}>{away?.flag}</div>
                  <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', marginTop: '12px' }}>{away?.name}</h2>
                </Link>
              </div>
            </div>

            <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)', display: 'inline-block' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-gold)' }}>
                {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div style={{ fontSize: '1.1rem', marginTop: '8px' }}>
                {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                📍 <Link href={`/venues/${venue?.slug}`}>{venue?.name}</Link> ({venue?.city})
              </div>
            </div>
          </div>

          <div className="ad-slot" style={{ margin: '32px 0' }}>Advertisement</div>

          <div className="content" style={{ margin: '0', maxWidth: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
              <div>
                <h2>Match Preview</h2>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>{match.description}</p>
                <p>
                  As {home?.name} takes on {away?.name}, fans around the world will be watching closely. 
                  {home?.name}, currently ranked #{home?.fifaRanking} in the world, will be looking to their star players like {home?.keyPlayers[0]} to make an impact.
                  Meanwhile, {away?.name} (FIFA Rank #{away?.fifaRanking}) will rely on {away?.keyPlayers[0]} to lead their charge.
                </p>
              </div>
              
              <div>
                <h2>Head to Head Stats</h2>
                <div className="card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ textAlign: 'center', width: '30%' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{home?.fifaRanking}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>FIFA Rank</div>
                    </div>
                    <div style={{ textAlign: 'center', width: '30%' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>-</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>-</div>
                    </div>
                    <div style={{ textAlign: 'center', width: '30%' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{away?.fifaRanking}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>FIFA Rank</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ textAlign: 'center', width: '30%' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{home?.titles}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>WC Titles</div>
                    </div>
                    <div style={{ textAlign: 'center', width: '30%' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>-</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>-</div>
                    </div>
                    <div style={{ textAlign: 'center', width: '30%' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{away?.titles}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>WC Titles</div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <h3>Fan Prediction</h3>
                  <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
                    <p style={{ marginBottom: '16px' }}>Who do you think will win?</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-secondary" style={{ flex: 1, padding: '10px' }}>{home?.name}</button>
                      <button className="btn btn-secondary" style={{ flex: 1, padding: '10px' }}>Draw</button>
                      <button className="btn btn-secondary" style={{ flex: 1, padding: '10px' }}>{away?.name}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
