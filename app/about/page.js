import Link from 'next/link';

export const metadata = {
  title: 'About Us | FanScoreboard',
  description: 'Learn about FanScoreboard, your ultimate destination for live sports event tracking.',
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>About FanScoreboard</h1>
          <p className="subtitle">Your ultimate fan hub for major sporting events.</p>
        </div>
      </section>
      <section className="section">
        <div className="container content">
          <h2>Our Mission</h2>
          <p>At FanScoreboard, our mission is to provide fans worldwide with the most accessible, fastest, and most comprehensive hub for major global sporting events, starting with the 2026 FIFA World Cup.</p>
          
          <h2>What We Do</h2>
          <p>We understand that navigating schedules across different timezones can be a nightmare for international fans. We solve this by providing localized schedules, in-depth team profiles, venue guides, and real-time updates.</p>
          
          <h2>Disclaimer</h2>
          <p>FanScoreboard is an independent fan website. We are not affiliated with, endorsed by, or sponsored by FIFA or any official sports organization. All product names, logos, and brands are property of their respective owners.</p>
        </div>
      </section>
    </>
  );
}
