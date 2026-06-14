'use client';

import { useState } from 'react';
import Link from 'next/link';
import timezonesData from '../../data/timezones.json';

export default function TimezoneConverterTool() {
  const [selectedTz, setSelectedTz] = useState(timezonesData[0].slug);

  return (
    <>
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">Home</Link> <span className="sep">/</span> 
          <span>Tools</span> <span className="sep">/</span> 
          <span>Timezone Converter</span>
        </div>
      </div>

      <section className="page-hero">
        <div className="container">
          <h1>🌍 Match Timezone Converter</h1>
          <p className="subtitle">Select your country to generate a custom World Cup schedule in your local time.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '24px' }}>Choose Your Location</h2>
            
            <div className="tz-converter" style={{ margin: '0 auto 32px' }}>
              <select 
                value={selectedTz} 
                onChange={(e) => setSelectedTz(e.target.value)}
                style={{ fontSize: '1.2rem', padding: '16px', backgroundColor: 'var(--bg-secondary)' }}
              >
                {timezonesData.map(tz => (
                  <option key={tz.slug} value={tz.slug}>{tz.name} ({tz.timezone})</option>
                ))}
              </select>
            </div>
            
            <Link href={`/timezone/${selectedTz}`} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '16px 32px' }}>
              Generate My Local Schedule →
            </Link>
          </div>

          <div className="ad-slot" style={{ margin: '48px 0' }}>Advertisement</div>

          <div className="content" style={{ padding: 0 }}>
            <h3>Why use this tool?</h3>
            <p>
              With the 2026 FIFA World Cup being hosted across the United States, Mexico, and Canada, matches are played across four different major timezones (Eastern, Central, Mountain, and Pacific).
            </p>
            <p>
              For international fans in Europe, Asia, and Africa, this means matches will often kick off late at night or early in the morning. Our timezone converter does the complex math for you, converting all 104 matches into your precise local time so you never miss a kickoff.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
