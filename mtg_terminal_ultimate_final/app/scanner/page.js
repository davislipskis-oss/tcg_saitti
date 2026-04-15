
import SectionHeading from '@/components/SectionHeading';
import ScannerLiveTable from '@/components/ScannerLiveTable';
import { products } from '@/data/products';

export const metadata = {
  title: 'Scanner | Sealed Intelligence Terminal',
  description: 'Cheapest currently tracked MTG sealed offers across a Europe-first retailer layer.',
};

export default function ScannerPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Retail scanner"
            title="Cheapest currently tracked offers across Europe"
            intro="Use the scanner when you already know the product and want a fast Europe-wide read on cheapest tracked offers, freshness and retailer coverage."
          />

          <div className="note">
            The scanner uses a Europe-first hybrid model. It attempts fresh retailer scrapes for priority anchors, then falls back to stored snapshots when a store blocks requests or a direct product URL has not been attached yet.
          </div>

          <ScannerLiveTable products={products} />

          <div className="grid-2" style={{ marginTop: 18 }}>
            <div className="card">
              <h3>How the tracking works</h3>
              <ul className="list" style={{ marginTop: 14 }}>
                <li>Layer 1 products refresh most often across the main European price anchors.</li>
                <li>Tier A retailers and Cardmarket-style anchors are checked more aggressively than Tier B and Tier C stores.</li>
                <li>Every visible row shows either a live scrape or a stable snapshot fallback, so the page stays fast and readable.</li>
              </ul>
            </div>
            <div className="card">
              <h3>What improves accuracy next</h3>
              <ul className="list" style={{ marginTop: 14 }}>
                <li>Adding direct product URLs for the top EU retailers per product.</li>
                <li>Keeping retailer-specific parsers updated when major EU store HTML changes and expanding direct product URLs beyond Cardmarket.</li>
                <li>Moving from in-memory cache to Supabase or KV for durable European price snapshots.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
