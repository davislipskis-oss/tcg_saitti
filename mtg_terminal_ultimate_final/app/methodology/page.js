import SectionHeading from '@/components/SectionHeading';
import { retailerList } from '@/lib/retailers';

export const metadata = {
  title: 'Methodology | Sealed Intelligence Terminal',
  description: 'How Sealed Momentum Scores, recommendations and Europe-first snapshot-based MTG retail tracking are calculated.',
};

export default function MethodologyPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Methodology"
            title="How the signals are built"
            intro="This product is not a raw price list. It is a Europe-first decision layer built from snapshot-based retail observations, Cardmarket anchor metrics and retailer tiering."
          />

          <div className="grid-3">
            <div className="card">
              <h3>1. Snapshot collection</h3>
              <p className="copy">Retail prices are observed from selected public product pages and stored as snapshots. That keeps the product fast and stable while still letting the main European price anchors be checked automatically.</p>
            </div>
            <div className="card">
              <h3>2. Retailer tiering</h3>
              <p className="copy">Tier A stores shape the market more directly and therefore refresh more often. Tier B stores add price discovery and supply confirmation. Tier C stores improve regional confidence without overloading the scraper layer.</p>
            </div>
            <div className="card">
              <h3>3. Product layering</h3>
              <p className="copy">Layer 1 products refresh most often. Layer 2 products refresh at a medium cadence. Layer 3 products refresh least often because their sealed market usually moves more slowly.</p>
            </div>
          </div>

          <div className="split" style={{ marginTop: 26 }}>
            <div className="panel">
              <div className="panel-inner">
                <div className="eyebrow">Signal inputs</div>
                <h3 style={{ marginTop: 14 }}>What feeds the momentum score</h3>
                <ul className="list" style={{ marginTop: 18 }}>
                  <li>Recent price velocity over 7, 30 and 90 day windows</li>
                  <li>Availability compression across tracked retailers</li>
                  <li>Cardmarket median-style anchor metrics and short trend drift</li>
                  <li>Serialized or premium treatment impact</li>
                  <li>Reprint risk and product lifecycle stage</li>
                  <li>Recommendation confidence based on data coverage and stability</li>
                </ul>
              </div>
            </div>
            <div className="panel">
              <div className="panel-inner">
                <div className="eyebrow">How the engine behaves</div>
                <h3 style={{ marginTop: 14 }}>Automatic scraping without fragile page-load scraping</h3>
                <div className="kv" style={{ marginTop: 18 }}>
                  <div className="kv-row"><span>Layer 1 products</span><strong>Up to every 6 hours</strong></div>
                  <div className="kv-row"><span>Layer 2 products</span><strong>Up to every 12 hours</strong></div>
                  <div className="kv-row"><span>Layer 3 products</span><strong>Up to every 24 hours</strong></div>
                  <div className="kv-row"><span>Priority EU store checks</span><strong>Tier A first</strong></div>
                  <div className="kv-row"><span>Availability counter</span><strong>Tracked per snapshot</strong></div>
                  <div className="kv-row"><span>Cardmarket anchor</span><strong>Parsed when available</strong></div>
                </div>
                <p className="copy" style={{ marginTop: 14 }}>Pages never need to scrape every retailer from scratch on each visit. They read the latest cached snapshot, then try fresh checks where that makes sense.</p>
              </div>
            </div>
          </div>

          <div className="panel" style={{ marginTop: 24 }}>
            <div className="panel-inner">
              <div className="eyebrow">Retail coverage</div>
              <h3 style={{ marginTop: 14 }}>Current European retailer layer</h3>
              <div className="table-wrap" style={{ marginTop: 8 }}>
                <table>
                  <thead>
                    <tr>
                      <th>Retailer</th>
                      <th>Tier</th>
                      <th>Region</th>
                      <th>Current role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retailerList.map((retailer) => (
                      <tr key={retailer.name}>
                        <td>{retailer.name}</td>
                        <td>{retailer.tier}</td>
                        <td>{retailer.region}</td>
                        <td>{retailer.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="note" style={{ marginTop: 22 }}>
            Prices are checked from public product pages and may change without notice. Always verify the final retailer price before purchasing.
          </div>
        </div>
      </section>
    </main>
  );
}
