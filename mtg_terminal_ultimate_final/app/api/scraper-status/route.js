import { retailerList } from '@/lib/retailers';

export function GET() {
  return Response.json({
    retailers: retailerList,
    mode: 'snapshot-cache',
    note: 'Prices are scraped from public product pages on demand, Cardmarket anchor metrics are parsed when available, and availability is counted per snapshot.',
  });
}
