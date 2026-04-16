import SectionHeading from '@/components/SectionHeading';
import SignalsFilter from '@/components/SignalsFilter';
import { products, strongestHoldSignals, strongestOpenSignals, watchlist } from '@/data/products';

export const metadata = {
  title: 'Signals | Sealed Intelligence Terminal',
  description: 'Strong hold signals, open pressure and watchlist products for MTG sealed boxes.',
};

export default function SignalsPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Signals"
            title="Today’s strongest MTG sealed signals"
            intro="Filter every tracked product by recommendation. Use this page as the daily command center before buying, opening or listing sealed inventory."
          />

          <div className="grid-3">
            <div className="card">
              <h3>Strong Hold</h3>
              <p className="copy">Products where supply compression and price behavior currently favor sealed over opening.</p>
              <div className="metric-value mono" style={{ marginTop: 14 }}>{strongestHoldSignals.length}</div>
            </div>
            <div className="card">
              <h3>Open Pressure</h3>
              <p className="copy">Products where opening EV still meaningfully competes with sealed appreciation.</p>
              <div className="metric-value mono" style={{ marginTop: 14 }}>{strongestOpenSignals.length}</div>
            </div>
            <div className="card">
              <h3>Watchlist</h3>
              <p className="copy">Boxes with enough uncertainty that timing matters more than impulse.</p>
              <div className="metric-value mono" style={{ marginTop: 14 }}>{watchlist.length}</div>
            </div>
          </div>

          <SignalsFilter products={[...products].sort((a, b) => b.momentumScore - a.momentumScore)} />
        </div>
      </section>
    </main>
  );
}
