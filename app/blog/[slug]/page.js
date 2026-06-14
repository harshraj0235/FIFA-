import Link from 'next/link';
import { notFound } from 'next/navigation';
import blogPosts from '../../data/blog-posts.json';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return {};
  
  return {
    title: `${post.title} | FanScoreboard`,
    description: post.summary,
  };
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  const date = new Date(post.date);

  // Schema for Google News / Discover
  const newsArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: [{
      '@type': 'Person',
      name: post.author,
    }],
    publisher: {
      '@type': 'Organization',
      name: 'FanScoreboard',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fanscoreboard.com/logo.png',
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      
      <div className="container">
        <div className="breadcrumbs">
          <Link href="/">Home</Link> <span className="sep">/</span> 
          <Link href="/blog">Blog</Link> <span className="sep">/</span> 
          <span>{post.title}</span>
        </div>
      </div>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card" style={{ padding: '40px', background: 'var(--bg-secondary)', border: 'none' }}>
            <div style={{ color: 'var(--accent-red)', fontSize: '0.9rem', marginBottom: '16px', fontWeight: '600' }}>
              {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • By {post.author}
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '24px', lineHeight: 1.2 }}>{post.title}</h1>
            
            <div className="content" style={{ padding: 0, margin: 0, maxWidth: '100%' }}>
              <p className="subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '32px', fontStyle: 'italic' }}>
                {post.summary}
              </p>
              
              <div className="ad-slot" style={{ margin: '32px 0' }}>Advertisement</div>
              
              {post.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '24px', color: 'var(--text-primary)' }}>
                  {paragraph}
                </p>
              ))}
              
              <div className="ad-slot" style={{ margin: '48px 0 0 0' }}>Advertisement</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
