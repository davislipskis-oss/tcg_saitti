import { notFound } from 'next/navigation';
import ProductOffers from '@/components/ProductOffers';
import { getProduct, products } from '@/data/products';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) {
    return { title: 'Product not found | Sealed Intelligence Terminal' };
  }

  return {
    title: `${product.name} | Sealed Intelligence Terminal`,
    description: product.seoTitle,
  };
}

function trendHeight(value, base = 20) {
  return `${Math.max(base, 70 + value * 4)}px`;
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const statusClass = product.recommendation.toLowerCase();

  return (
    <main>
      <section className="section">
        <div className="container hero-product">
          <div className="panel">
            <div className="panel-inner">
              <div className="eyebrow">{product.category}</div>
              <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 4rem)', marginTop: 16 }}>{product.name}</h1>
              <p className="lead" style={{ marginTop: 12 }}>{product.tagline}</p>
              <p className="copy" style={{ marginTop: 16 }}>{product.thesis}</p>

              <div className="ribbon-strip">
                <span className="ribbon">Layer: {product.layer}</span>
                <span className={`signal-status ${statusClass}`}>{product.recommendation}</span>
                <span className="ribbon">Confidence: {product.confidence}</span>
                <span className="ribbon">Lifecycle: {product.lifecycle}</span>
                <span className="ribbon">Last checked: {product.lastChecked}</span>
              </div>

              <div className="stat-matrix">
                <div className="metric">
                  <div className="metric-label">Lowest tracked price</div>
                  <div className="metric-value mono">€{product.lowestTrackedPrice}</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Supply trend</div>
                  <div className="metric-value">{product.supplyTrend}</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Serialized impact</div>
                  <div className="metric-value">{product.serializedImpact}</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Opening EV</div>
                  <div className="metric-value mono">{product.openingEv}%</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Hold tilt</div>
                  <div className="metric-value mono">{product.holdTilt}%</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Reprint risk</div>
                  <div className="metric-value">{product.reprintRisk}</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Tracked countries</div>
                  <div className="metric-value mono">{product.countriesCovered}</div>
                </div>
              </div>

              <div className="chart-box">
                <div className="eyebrow">Trend shape</div>
                <h3 style={{ marginTop: 14 }}>Tracked price movement</h3>
                <div className="sparkline">
                  <div className="bar" data-label="7d" style={{ height: trendHeight(product.price7d) }} />
                  <div className="bar gold" data-label="30d" style={{ height: trendHeight(product.price30d) }} />
                  <div className="bar" data-label="90d" style={{ height: trendHeight(product.price90d) }} />
                </div>
                <div className="kv" style={{ marginTop: 34 }}>
                  <div className="kv-row"><span>7 day move</span><strong className={product.price7d >= 0 ? 'price-up' : 'price-down'}>{product.price7d >= 0 ? '+' : ''}{product.price7d.toFixed(1)}%</strong></div>
                  <div className="kv-row"><span>30 day move</span><strong className={product.price30d >= 0 ? 'price-up' : 'price-down'}>{product.price30d >= 0 ? '+' : ''}{product.price30d.toFixed(1)}%</strong></div>
                  <div className="kv-row"><span>90 day move</span><strong className={product.price90d >= 0 ? 'price-up' : 'price-down'}>{product.price90d >= 0 ? '+' : ''}{product.price90d.toFixed(1)}%</strong></div>
                  <div className="kv-row"><span>Tracked supply change</span><strong className={product.supplyDelta30d < 0 ? 'price-up' : 'price-flat'}>{product.supplyDelta30d}%</strong></div>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-inner">
              <div className="score-orb">
                <div className="score-orb-inner">
                  <div>
                    <div className="score-orb-number">{product.momentumScore}</div>
                    <div className="score-orb-label">Momentum score</div>
                  </div>
                </div>
              </div>

              <div className="metric-grid" style={{ marginTop: 0 }}>
                <div className="metric">
                  <div className="metric-label">Recommendation</div>
                  <div className="metric-value">{product.recommendation}</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Signal strength</div>
                  <div className="metric-value">{product.signalStrength}</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Attention trend</div>
                  <div className="metric-value">{product.attentionTrend}</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Liquidity</div>
                  <div className="metric-value">{product.liquidity}</div>
                </div>
              </div>

              <div className="card" style={{ marginTop: 18 }}>
                <h3>Decision summary</h3>
                <div className="kv" style={{ marginTop: 18 }}>
                  <div className="kv-row"><span>Opening tilt</span><strong className="mono">{product.openTilt}%</strong></div>
                  <div className="kv-row"><span>Holding tilt</span><strong className="mono">{product.holdTilt}%</strong></div>
                  <div className="kv-row"><span>Market phase</span><strong>{product.marketPhase}</strong></div>
                  <div className="kv-row"><span>Stores tracked</span><strong>{product.storesTracked}</strong></div>
                  <div className="kv-row"><span>Countries covered</span><strong>{product.countriesCovered}</strong></div>
                  <div className="kv-row"><span>Tier A coverage</span><strong>{product.tierACoverage}</strong></div>
                </div>
              </div>

              <div className="card" style={{ marginTop: 18 }}>
                <h3>Refresh plan</h3>
                <p className="copy" style={{ marginTop: 12 }}>
                  {product.refreshPlan} Products in this layer are checked more often because they move the sealed market more aggressively.
                </p>
              </div>

              <div className="card" style={{ marginTop: 18 }}>
                <h3>Primary risks</h3>
                <ul className="list" style={{ marginTop: 14 }}>
                  {product.risks.map((risk) => <li key={risk}>{risk}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <ProductOffers product={product} />
        </div>
      </section>
    </main>
  );
}
