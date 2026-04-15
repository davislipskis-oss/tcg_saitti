import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'Contact | Sealed Intelligence Terminal',
  description: 'Contact Sealed Intelligence Terminal for data corrections, retailer links and feedback.',
};

export default function ContactPage() {
  return (
    <main>
      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Corrections, retailer links and feedback"
              intro="If you spot a price issue, want to suggest a retailer, or want a product added to the tracked universe, use the details here."
            />
            <div className="card">
              <h3>Contact channels</h3>
              <div className="kv" style={{ marginTop: 18 }}>
                <div className="kv-row"><span>Email</span><strong>hello@example.com</strong></div>
                <div className="kv-row"><span>Data corrections</span><strong>Price, availability or product issues</strong></div>
                <div className="kv-row"><span>Retailer partnerships</span><strong>Store link inclusion requests</strong></div>
                <div className="kv-row"><span>Response window</span><strong>1–3 business days</strong></div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-inner">
              <div className="eyebrow">What to include</div>
              <h3 style={{ marginTop: 14 }}>Make the message easy to action</h3>
              <ul className="list" style={{ marginTop: 18 }}>
                <li>The exact product name or page URL</li>
                <li>The retailer where you saw the issue</li>
                <li>The price or availability difference you noticed</li>
                <li>Any screenshot or source link that helps verify the correction</li>
              </ul>
              <p className="copy" style={{ marginTop: 18 }}>
                This site is designed to become more useful over time. Clear correction requests help improve the quality of the tracked universe for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
