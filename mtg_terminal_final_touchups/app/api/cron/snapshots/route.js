
import { buildScannerSnapshot } from '@/lib/snapshot-engine';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const auth = request.headers.get('authorization');
  const expected = process.env.CRON_SECRET ? `Bearer ${process.env.CRON_SECRET}` : null;

  if (expected && auth !== expected) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const snapshots = await buildScannerSnapshot();
  return Response.json({
    ok: true,
    checkedAt: new Date().toISOString(),
    productsUpdated: snapshots.length,
    note: 'This cron route refreshes the in-memory snapshot cache. For durable persistence, connect Supabase or Vercel KV next.',
  });
}
