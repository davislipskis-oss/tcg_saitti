'use client';

import { useMemo, useState } from 'react';
import SignalCard from '@/components/SignalCard';

export default function SignalsFilter({ products }) {
  const [query, setQuery] = useState('');
  const [recommendation, setRecommendation] = useState('ALL');

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      const matchesRecommendation = recommendation === 'ALL' || product.recommendation === recommendation;
      return matchesQuery && matchesRecommendation;
    });
  }, [products, query, recommendation]);

  return (
    <>
      <div className="filter-bar">
        <div className="field">
          <input
            className="input"
            type="search"
            placeholder="Search products"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="field" style={{ maxWidth: 240 }}>
          <select className="select" value={recommendation} onChange={(event) => setRecommendation(event.target.value)}>
            <option value="ALL">All signals</option>
            <option value="HOLD">Hold</option>
            <option value="WATCH">Watch</option>
            <option value="OPEN">Open</option>
          </select>
        </div>
      </div>

      <div className="signal-grid" style={{ marginTop: 20 }}>
        {filtered.length ? filtered.map((product) => <SignalCard key={product.slug} product={product} />) : (
          <div className="empty" style={{ gridColumn: '1 / -1' }}>
            No products match this filter.
          </div>
        )}
      </div>
    </>
  );
}
