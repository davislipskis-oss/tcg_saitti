import Link from 'next/link';

export default function SignalCard({ product }) {
  const statusClass = product.recommendation.toLowerCase();

  return (
    <Link href={`/product/${product.slug}`} className="signal-card">
      <div className="signal-top">
        <span className={`signal-status ${statusClass}`}>{product.recommendation}</span>
        <span className="signal-score">Score {product.momentumScore}</span>
      </div>

      <h3 style={{ marginTop: 18 }}>{product.name}</h3>
      <p className="copy" style={{ marginTop: 10 }}>{product.tagline}</p>

      <div className="kv">
        <div className="kv-row"><span>Lowest tracked price</span><strong className="mono">€{product.lowestTrackedPrice}</strong></div>
        <div className="kv-row"><span>Supply trend</span><strong>{product.supplyTrend}</strong></div>
        <div className="kv-row"><span>Confidence</span><strong>{product.confidence}</strong></div>
        <div className="kv-row"><span>Serialized impact</span><strong>{product.serializedImpact}</strong></div>
      </div>
    </Link>
  );
}
