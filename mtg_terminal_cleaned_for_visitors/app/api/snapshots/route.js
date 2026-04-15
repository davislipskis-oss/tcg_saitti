
import { buildProductSnapshot, buildScannerSnapshot } from '@/lib/snapshot-engine';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const snapshot = await buildProductSnapshot(slug, {
      force: searchParams.get('force') === '1'
    });

    if (!snapshot) {
      return Response.json({ error: 'Product not found' }, { status: 404 });
    }

    return Response.json({ snapshot });
  }

  const snapshots = await buildScannerSnapshot();
  return Response.json({ snapshots });
}
