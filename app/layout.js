import './globals.css';

export const metadata = {
  metadataBase: new URL('https://fanscoreboard.com'),
  title: {
    default: 'FanScoreboard — FIFA World Cup 2026 Live Schedule, Scores & Fan Hub',
    template: '%s | FanScoreboard'
  },
  description: 'Your ultimate fan hub for FIFA World Cup 2026. Live match schedules in your timezone, all 48 team profiles, 16 venues, group standings, match previews, and predictions. Free tools for every football fan.',
  keywords: ['FIFA World Cup 2026', 'World Cup schedule', 'World Cup 2026 teams', 'World Cup match times', 'World Cup venues', 'football', 'soccer'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'FanScoreboard',
    title: 'FanScoreboard — FIFA World Cup 2026 Fan Hub',
    description: 'Live schedules, team profiles, venues & timezone converter for the 2026 FIFA World Cup across USA, Mexico & Canada.',
    images: [{ url: '/images/og/home.jpg', width: 1200, height: 630, alt: 'FanScoreboard - FIFA World Cup 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FanScoreboard — FIFA World Cup 2026 Fan Hub',
    description: 'Live schedules, team profiles, venues & timezone converter for the 2026 FIFA World Cup.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://fanscoreboard.com',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FanScoreboard',
    url: 'https://fanscoreboard.com',
    description: 'FIFA World Cup 2026 Fan Hub with live schedules, team profiles, and timezone converter.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://fanscoreboard.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: 'FIFA World Cup 2026',
    startDate: '2026-06-11',
    endDate: '2026-07-19',
    location: {
      '@type': 'Place',
      name: 'United States, Mexico & Canada',
    },
    description: 'The 2026 FIFA World Cup featuring 48 teams across 16 venues in 3 countries.',
    organizer: {
      '@type': 'Organization',
      name: 'FIFA',
      url: 'https://www.fifa.com',
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0a0a0f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      </head>
      <body>
        <header className="header">
          <div className="header-inner">
            <a href="/" className="logo">
              <span className="logo-icon">⚽</span>
              <span>FanScoreboard</span>
            </a>
            <nav className="nav" id="nav">
              <a href="/">Home</a>
              <a href="/schedule">Schedule</a>
              <a href="/teams">Teams</a>
              <a href="/groups">Groups</a>
              <a href="/venues">Venues</a>
              <a href="/blog">Blog</a>
            </nav>
            <button className="nav-toggle" id="navToggle" aria-label="Toggle navigation" onClick={() => {}}>
              ☰
            </button>
          </div>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-grid">
              <div className="footer-brand">
                <h3>⚽ FanScoreboard</h3>
                <p>Your ultimate fan hub for major sporting events. Live schedules, team profiles, match previews, and timezone tools for fans worldwide.</p>
              </div>
              <div className="footer-links">
                <h4>World Cup 2026</h4>
                <ul>
                  <li><a href="/schedule">Match Schedule</a></li>
                  <li><a href="/teams">All 48 Teams</a></li>
                  <li><a href="/groups">Group Standings</a></li>
                  <li><a href="/venues">Venues & Stadiums</a></li>
                </ul>
              </div>
              <div className="footer-links">
                <h4>Tools</h4>
                <ul>
                  <li><a href="/tools/timezone-converter">Timezone Converter</a></li>
                  <li><a href="/blog">Latest News</a></li>
                </ul>
              </div>
              <div className="footer-links">
                <h4>Legal</h4>
                <ul>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/privacy-policy">Privacy Policy</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 FanScoreboard. All rights reserved. Not affiliated with FIFA. For informational purposes only.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
