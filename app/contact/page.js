export const metadata = {
  title: 'Contact Us | FanScoreboard',
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
        </div>
      </section>
      <section className="section">
        <div className="container content">
          <p>Have a question, suggestion, or found an error on our site? We'd love to hear from you.</p>
          
          <div className="card" style={{ padding: '32px', marginTop: '32px' }}>
            <h2 style={{ marginTop: 0 }}>Get in Touch</h2>
            <p><strong>Email:</strong> contact@fanscoreboard.com</p>
            <p>We aim to respond to all inquiries within 48 hours.</p>
          </div>
        </div>
      </section>
    </>
  );
}
