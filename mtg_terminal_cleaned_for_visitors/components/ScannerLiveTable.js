'use client';

import { useEffect, useMemo, useState } from 'react';

function formatEuro(value) {
  return value == null ? '—' : `€${Number(value).toFixed(2)}`;
}

function formatPercent(value) {
  return value == null ? '—' : `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
}

function buildSeedRows(products) {
  return products
    .map((product) => {
      const availableOffers = product.offers.filter((offer) => offer.available && offer.price != null).sort((a, b) => a.price - b.price);
      const best = availableOffers[0];
      return {
        slug: product.slug,
        name: product.name,
        bestRetailer: best?.retailer || '—',
        bestPrice: best?.price || null,
        storesTracked: product.storesTracked,
        availableStores: product.offers.filter((offer) => offer.available).length,
        countriesCovered: product.countriesCovered || null,
        cardmarketTrend: null,
        freshness: best?.freshness || 'Tracked',
        checkedAt: product.lastChecked,
        liveRetailers: 0,
      };
    })
    .sort((a, b) => {
      if (a.bestPrice == null) return 1;
      if (b.bestPrice == null) return -1;
      return a.bestPrice - b.bestPrice;
    });
}

export default function ScannerLiveTable({ products }) {
  const [snapshots, setSnapshots] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch('/api/snapshots');
        const json = await res.json();
        if (!ignore && Array.isArray(json.snapshots)) setSnapshots(json.snapshots);
      } catch {}
    }
    load();
    return () => { ignore = true; };
  }, []);

  const rows = useMemo(() => {
    if (!snapshots) return buildSeedRows(products);
    return snapshots.map((snapshot) => {
      const bestOffer = [...snapshot.offers].filter((offer) => offer.price != null).sort((a, b) => a.price - b.price)[0];
      return {
        slug: snapshot.slug,
        name: products.find((product) => product.slug === snapshot.slug)?.name || snapshot.slug,
        bestRetailer: bestOffer?.retailer || '—',
        bestPrice: bestOffer?.price ?? null,
        storesTracked: snapshot.storesTracked,
        availableStores: snapshot.availabilityCounter?.totalAvailable ?? 0,
        countriesCovered: snapshot.countriesCovered || products.find((product) => product.slug === snapshot.slug)?.countriesCovered || null,
        cardmarketTrend: snapshot.cardmarketAnchor?.shortTrend ?? null,
        freshness: bestOffer?.freshness || 'Fresh',
        checkedAt: snapshot.checkedAt,
        liveRetailers: snapshot.liveRetailers,
      };
    }).sort((a, b) => {
      if (a.bestPrice == null) return 1;
      if (b.bestPrice == null) return -1;
      return a.bestPrice - b.bestPrice;
    });
  }, [snapshots, products]);

  return (
    <div className="table-wrap panel" style={{ marginTop: 22 }}>
      <div className="panel-inner" style={{ paddingTop: 8 }}>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Cheapest tracked retailer</th>
              <th>Price</th>
              <th>Available / tracked</th>
              <th>Countries</th>
              <th>Cardmarket trend</th>
              <th>Freshness</th>
              <th>Live checks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.slug}>
                <td>{row.name}<div className="muted-inline">{row.checkedAt}</div></td>
                <td>{row.bestRetailer}</td>
                <td className="mono">{formatEuro(row.bestPrice)}</td>
                <td>{row.availableStores}/{row.storesTracked}</td>
                <td>{row.countriesCovered ?? '—'}</td>
                <td className={row.cardmarketTrend > 0 ? 'price-up' : row.cardmarketTrend < 0 ? 'price-down' : 'price-flat'}>{formatPercent(row.cardmarketTrend)}</td>
                <td>{row.freshness}</td>
                <td>{row.liveRetailers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
