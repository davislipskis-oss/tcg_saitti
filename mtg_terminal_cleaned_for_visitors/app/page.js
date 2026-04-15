import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import SignalCard from '@/components/SignalCard';
import { strongestHoldSignals, strongestOpenSignals, watchlist } from '@/data/products';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="panel hero-terminal">
            <div className="panel-inner">
              <div className="eyebrow">Sealed market intelligence</div>
              <h1>Know before you break the seal.</h1>
              <p className="lead">
                Track sealed MTG product signals across Europe. Detect price momentum, supply compression and opening risk
                before you crack a premium box or chase the wrong listing.
              </p>
              <div className="stack">
                <span className="badge soft-gold">Sealed Momentum Score</span>
                <span className="badge">Retail price tracking</span>
                <span className="badge">Supply compression detection</span>
                <span className="badge">Opening risk intelligence</span>
              </div>
              <div className="button-row">
                <Link href="/signals" className="button button-primary">Check today’s strongest hold signals</Link>
                <Link href="/scanner" className="button button-secondary">Scan cheapest tracked offers</Link>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-inner">
              <div className="eyebrow">Live signal strip</div>
              <h3 style={{ marginTop: 14 }}>What matters right now</h3>
              <div className="hero-card-grid" style={{ marginTop: 18 }}>
                {strongestHoldSignals.slice(0, 3).map((product) => (
                  <div className="card" key={product.slug}>
                    <div className="signal-top">
                      <span className="signal-status hold">{product.recommendation}</span>
                      <span className="signal-score">{product.momentumScore}</span>
                    </div>
                    <h3 style={{ marginTop: 12 }}>{product.name}</h3>
                    <div className="kv" style={{ marginTop: 14 }}>
                      <div className="kv-row"><span>Lowest tracked</span><strong className="mono">€{product.lowestTrackedPrice}</strong></div>
                      <div className="kv-row"><span>Supply trend</span><strong>{product.supplyTrend}</strong></div>
                      <div className="kv-row"><span>Confidence</span><strong>{product.confidence}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="small" style={{ marginTop: 18 }}>
                Used for decisions where opening too early destroys value and waiting too long misses the move.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <SectionHeading
            eyebrow="Why this matters"
            title="Most collectors open too early. Most speculators sell too late."
            intro="This terminal is built to reduce both mistakes. It combines tracked retail pricing, supply change and sealed lifecycle context into one decision view."
          />
          <div className="grid-4">
            <div className="card">
              <h3>Sealed Momentum</h3>
              <p className="copy">A score built from price movement, availability compression and sealed lifecycle behavior.</p>
            </div>
            <div className="card">
              <h3>Retail Scanner</h3>
              <p className="copy">See the lowest currently tracked offers across selected European retailers on one screen.</p>
            </div>
            <div className="card">
              <h3>Opening Pressure</h3>
              <p className="copy">Opening EV alone is not enough. You also need timing, supply shape and confidence.</p>
            </div>
            <div className="card">
              <h3>Supply Compression</h3>
              <p className="copy">When listings disappear, sealed products can outperform fast. This tool surfaces that shift early.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Strong hold signals"
            title="Today’s best sealed hold profiles"
            intro="These products currently combine strong price behavior, healthier scarcity and a better sealed case than raw opening EV."
          />
          <div className="signal-grid">
            {strongestHoldSignals.map((product) => <SignalCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container split">
          <div className="panel">
            <div className="panel-inner">
              <SectionHeading
                eyebrow="Open pressure"
                title="Products where opening still competes with holding"
                intro="Some boxes remain close calls. These are the products where premium singles, variance and timing still matter."
              />
              <div className="signal-grid" style={{ gridTemplateColumns: '1fr', marginTop: 0 }}>
                {strongestOpenSignals.slice(0, 2).map((product) => <SignalCard key={product.slug} product={product} />)}
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-inner">
              <SectionHeading
                eyebrow="Watchlist"
                title="Boxes in active selection mode"
                intro="These products have meaningful upside paths on both sides. They deserve closer monitoring before action."
              />
              <div className="signal-grid" style={{ gridTemplateColumns: '1fr', marginTop: 0 }}>
                {watchlist.slice(0, 3).map((product) => <SignalCard key={product.slug} product={product} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container panel">
          <div className="panel-inner">
            <SectionHeading
              eyebrow="Methodology"
              title="Not a price list. A decision engine."
              intro="Signals combine multi-store price velocity, availability compression, product lifecycle context, serialized impact and confidence grading to turn scattered market data into clearer decisions."
            />
            <div className="button-row" style={{ marginTop: 8 }}>
              <Link href="/methodology" className="button button-secondary">Read the methodology</Link>
              <Link href="/market" className="button button-primary">Open the market overview</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
