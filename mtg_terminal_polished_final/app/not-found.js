import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <section className="section">
        <div className="container panel">
          <div className="panel-inner" style={{ textAlign: 'center' }}>
            <div className="eyebrow">404</div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', marginTop: 14 }}>The signal could not be found.</h1>
            <p className="lead" style={{ margin: '18px auto 0' }}>
              The requested page does not exist in the tracked universe. Return to the signals page and continue from there.
            </p>
            <div className="button-row" style={{ justifyContent: 'center' }}>
              <Link href="/signals" className="button button-primary">Back to signals</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
