import SectionHeading from '@/components/SectionHeading';
import MarketTable from '@/components/MarketTable';
import { products } from '@/data/products';

export const metadata = {
  title: 'Market | Sealed Intelligence Terminal',
  description: 'MTG sealed market overview with rising products, supply compression and recent price movement.',
};

export default function MarketPage() {
  const rising = [...products].sort((a, b) => b.price30d - a.price30d).slice(0, 5);
  const compressing = [...products].sort((a, b) => a.supplyDelta30d - b.supplyDelta30d).slice(0, 5);

  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Market overview"
            title="What the sealed market is doing now"
            intro="This page highlights broad opportunity across the tracked European retailer layer. It is built for fast pattern recognition: rising prices, shrinking supply and products entering stronger hold territory."
          />

          <div className="grid-3">
            <div className="card">
              <h3>Fastest 30d riser</h3>
              <div className="metric-value">{rising[0].name}</div>
              <p className="copy price-up" style={{ marginTop: 12 }}>+{rising[0].price30d.toFixed(1)}% over 30 days</p>
            </div>
            <div className="card">
              <h3>Strongest supply compression</h3>
              <div className="metric-value">{compressing[0].name}</div>
              <p className="copy price-up" style={{ marginTop: 12 }}>{compressing[0].supplyDelta30d}% active tracked supply over 30 days</p>
            </div>
            <div className="card">
              <h3>Highest momentum score</h3>
              <div className="metric-value">{[...products].sort((a, b) => b.momentumScore - a.momentumScore)[0].name}</div>
              <p className="copy" style={{ marginTop: 12 }}>Current score leader across the tracked European sealed universe.</p>
            </div>
          </div>

          <div className="split" style={{ marginTop: 26 }}>
            <div className="panel">
              <div className="panel-inner">
                <div className="eyebrow">Top rising</div>
                <h3 style={{ marginTop: 14 }}>30 day leaders</h3>
                <div className="kv" style={{ marginTop: 18 }}>
                  {rising.map((product) => (
                    <div className="kv-row" key={product.slug}>
                      <span>{product.name}</span>
                      <strong className="price-up">+{product.price30d.toFixed(1)}%</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="panel">
              <div className="panel-inner">
                <div className="eyebrow">Supply compression</div>
                <h3 style={{ marginTop: 14 }}>Fastest shrinking supply</h3>
                <div className="kv" style={{ marginTop: 18 }}>
                  {compressing.map((product) => (
                    <div className="kv-row" key={product.slug}>
                      <span>{product.name}</span>
                      <strong className="price-up">{product.supplyDelta30d}%</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <MarketTable products={[...products].sort((a, b) => b.momentumScore - a.momentumScore)} />
          </div>
        </div>
      </section>
    </main>
  );
}
