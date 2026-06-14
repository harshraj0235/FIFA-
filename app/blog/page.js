import Link from 'next/link';
import blogPosts from '../../data/blog-posts.json';

export const metadata = {
  title: 'World Cup 2026 News & Updates | FanScoreboard Blog',
  description: 'Latest news, analysis, player spotlights, and updates for the 2026 FIFA World Cup.',
};

export default function BlogPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>📰 Fan Hub Blog</h1>
          <p className="subtitle">Latest news, analysis, and guides for the 2026 FIFA World Cup.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))' }}>
            {blogPosts.map(post => {
              const date = new Date(post.date);
              return (
                <Link href={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: 'none' }}>
                  <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ color: 'var(--accent-red)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>
                      {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h2 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>{post.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', flex: 1 }}>{post.summary}</p>
                    <div style={{ marginTop: '16px', color: 'var(--accent-gold)', fontWeight: '600', fontSize: '0.9rem' }}>Read Article →</div>
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
