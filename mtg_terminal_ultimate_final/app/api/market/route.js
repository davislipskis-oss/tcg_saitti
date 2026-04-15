import { buildScannerSnapshot } from '@/lib/snapshot-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  const snapshots = await buildScannerSnapshot();
  const payload = snapshots.map((snapshot) => ({
    slug: snapshot.slug,
    lowestTrackedPrice: snapshot.lowestTrackedPrice,
    storesTracked: snapshot.storesTracked,
    countriesCovered: snapshot.countriesCovered,
    availableStores: snapshot.availabilityCounter?.totalAvailable ?? 0,
    cardmarketTrend: snapshot.cardmarketAnchor?.shortTrend ?? null,
    cardmarketReference: snapshot.cardmarketAnchor?.referencePrice ?? null,
    checkedAt: snapshot.checkedAt,
    layer: snapshot.layer,
    refreshPlan: snapshot.refreshPlan,
  }));

  return Response.json({ products: payload, source: 'snapshot-engine-with-cardmarket-anchor' });
}
