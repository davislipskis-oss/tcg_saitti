'use client';

import { useEffect, useMemo, useState } from 'react';

function formatEuro(value) {
  return value == null ? '—' : `€${Number(value).toFixed(2)}`;
}

function formatPercent(value) {
  return value == null ? '—' : `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
}

function sortOffers(offers) {
  return [...offers].sort((a, b) => {
    if (a.price == null) return 1;
    if (b.price == null) return -1;
    return a.price - b.price;
  });
}

export default function ProductOffers({ product }) {
  const [snapshot, setSnapshot] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch(`/api/snapshots?slug=${product.slug}`);
        const json = await res.json();
        if (!ignore && json.snapshot) {
          setSnapshot(json.snapshot);
          setState('ready');
          return;
        }
      } catch {}
      if (!ignore) setState('fallback');
    }

    load();
    return () => { ignore = true; };
  }, [product.slug]);

  const offers = useMemo(() => {
    if (snapshot?.offers?.length) return sortOffers(snapshot.offers);
    return sortOffers(product.offers.map((offer) => ({
      ...offer,
      source: 'seed-snapshot',
      checkedAt: product.lastChecked,
      freshness: offer.freshness || 'Fresh',
      tier: 'A',
      region: 'Europe',
    })));
  }, [snapshot, product]);

  const liveRetailers = snapshot?.liveRetailers ?? 0;
  const checkedAt = snapshot?.checkedAt ?? product.lastChecked;
  const cacheTtl = snapshot?.cacheTtlHours;
  const mode = state === 'ready' ? (liveRetailers > 0 ? 'Live scrape + snapshot fallback' : 'Snapshot fallback only') : 'Seed snapshot';
  const availabilityCounter = snapshot?.availabilityCounter;
  const cardmarket = snapshot?.cardmarketAnchor;
  const bestOffer = offers.find((offer) => offer.price != null);

  return (
    <div className="panel">
      <div className="panel-inner">
        <div className="eyebrow">Retail scanner</div>
        <h3 style={{ marginTop: 14 }}>Lowest currently tracked offers</h3>
        <p className="copy" style={{ marginTop: 10 }}>
          This panel blends recent stored snapshots with on-demand retailer checks. It stays fast for the user while still attempting fresh scrapes for the most important European price anchors first.
        </p>

        <div className="note" style={{ marginTop: 18 }}>
          <strong>Data mode:</strong> {mode}. <strong>Checked:</strong> {checkedAt}. {cacheTtl ? <><strong>Refresh cadence:</strong> cached for up to {cacheTtl} hours for this product layer.</> : null}
        </div>

        <div className="grid-3" style={{ marginTop: 18 }}>
          <div className="card">
            <h3>Availability counter</h3>
            <div className="metric-value mono" style={{ marginTop: 12 }}>{availabilityCounter ? `${availabilityCounter.totalAvailable}/${availabilityCounter.totalTracked}` : `${offers.filter((offer) => offer.available).length}/${offers.length}`}</div>
            <p className="copy" style={{ marginTop: 10 }}>Retailers currently showing stock across the tracked European layer.</p>
          </div>
          <div className="card">
            <h3>Cheapest visible offer</h3>
            <div className="metric-value mono" style={{ marginTop: 12 }}>{formatEuro(bestOffer?.price ?? null)}</div>
            <p className="copy" style={{ marginTop: 10 }}>{bestOffer?.retailer || 'No priced retailer currently visible'}.</p>
          </div>
          <div className="card">
            <h3>Cardmarket anchor</h3>
            <div className="metric-value mono" style={{ marginTop: 12 }}>{formatEuro(cardmarket?.referencePrice ?? cardmarket?.currentPrice ?? null)}</div>
            <p className="copy" style={{ marginTop: 10 }}>Reference anchor from the pan-European marketplace layer.</p>
          </div>
        </div>

        {cardmarket ? (
          <div className="card" style={{ marginTop: 18 }}>
            <h3>Cardmarket trend anchor</h3>
            <div className="kv" style={{ marginTop: 16 }}>
              <div className="kv-row"><span>Price trend</span><strong className="mono">{formatEuro(cardmarket.priceTrend)}</strong></div>
              <div className="kv-row"><span>7 day average</span><strong className="mono">{formatEuro(cardmarket.avg7d)}</strong></div>
              <div className="kv-row"><span>30 day average</span><strong className="mono">{formatEuro(cardmarket.avg30d)}</strong></div>
              <div className="kv-row"><span>Short trend vs averages</span><strong className={cardmarket.shortTrend > 0 ? 'price-up' : cardmarket.shortTrend < 0 ? 'price-down' : 'price-flat'}>{formatPercent(cardmarket.shortTrend)}</strong></div>
              <div className="kv-row"><span>Available articles</span><strong className="mono">{cardmarket.availableArticles ?? '—'}</strong></div>
              <div className="kv-row"><span>EU spread vs cheapest retailer</span><strong className={cardmarket.euSpread < 0 ? 'price-up' : cardmarket.euSpread > 0 ? 'price-down' : 'price-flat'}>{formatEuro(cardmarket.euSpread)}</strong></div>
            </div>
            <p className="small" style={{ marginTop: 12 }}>
              Negative spread means the cheapest tracked retailer is currently below the Cardmarket anchor. Positive spread means retailer pricing is richer than the anchor.
            </p>
          </div>
        ) : null}

        <div className="table-wrap" style={{ marginTop: 12 }}>
          <table>
            <thead>
              <tr>
                <th>Retailer</th>
                <th>Tracked price</th>
                <th>Status</th>
                <th>Freshness</th>
                <th>Source</th>
                <th>Visit</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.retailer}>
                  <td>
                    {offer.retailer}
                    {offer.region ? <div className="muted-inline">{offer.region} · Tier {offer.tier}</div> : null}
                  </td>
                  <td className="mono">{formatEuro(offer.price)}</td>
                  <td>{offer.available ? 'Available' : 'Unavailable'}</td>
                  <td>{offer.freshness}</td>
                  <td>{offer.source === 'live-scrape' ? 'Live' : 'Snapshot'}</td>
                  <td>{offer.href && offer.href !== '#' ? <a href={offer.href} target="_blank" rel="noreferrer">Open</a> : 'Add URL'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="scanner-foot" style={{ marginTop: 14 }}>
          <span>Live retailers checked now: <strong>{liveRetailers}</strong></span>
          <span>Stores tracked in total: <strong>{offers.length}</strong></span>
          <span>Available now: <strong>{availabilityCounter?.totalAvailable ?? offers.filter((offer) => offer.available).length}</strong></span>
          <span>Countries covered: <strong>{snapshot?.countriesCovered || product.countriesCovered || '—'}</strong></span>
          <span>Lowest visible offer: <strong>{formatEuro(bestOffer?.price ?? null)}</strong></span>
        </div>
      </div>
    </div>
  );
}
