import SectionHeading from '@/components/SectionHeading';
import { retailerList } from '@/lib/retailers';

export const metadata = {
  title: 'Methodology | Sealed Intelligence Terminal',
  description: 'How Sealed Momentum Scores, recommendations and Europe-first MTG retail tracking are calculated.',
};

export default function MethodologyPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Methodology"
            title="How the signals are built"
            intro="This is a Europe-first decision layer built to help collectors and speculators compare sealed products with more context than a simple price list."
          />

          <div className="grid-3">
            <div className="card">
              <h3>1. Market observation</h3>
              <p className="copy">Selected European retailer prices are tracked over time so the product can compare what is available now with what changed recently.</p>
            </div>
            <div className="card">
              <h3>2. Coverage weighting</h3>
              <p className="copy">Higher-signal stores influence the system more directly, while broader regional coverage improves confidence and helps confirm supply pressure.</p>
            </div>
            <div className="card">
              <h3>3. Product lifecycle context</h3>
              <p className="copy">Newer, premium and more actively traded products tend to receive more frequent observation because their sealed market can move faster.</p>
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
                  <li>Pan-European price anchor behaviour</li>
                  <li>Serialized or premium treatment impact</li>
                  <li>Reprint risk and product lifecycle stage</li>
                  <li>Recommendation confidence based on coverage and stability</li>
                </ul>
              </div>
            </div>
            <div className="panel">
              <div className="panel-inner">
                <div className="eyebrow">How tracking is handled</div>
                <h3 style={{ marginTop: 14 }}>Built for stability as well as speed</h3>
                <div className="kv" style={{ marginTop: 18 }}>
                  <div className="kv-row"><span>Most active products</span><strong>Checked most often</strong></div>
                  <div className="kv-row"><span>Broader product set</span><strong>Tracked at a slower cadence</strong></div>
                  <div className="kv-row"><span>Core European anchors</span><strong>Prioritised first</strong></div>
                  <div className="kv-row"><span>Availability</span><strong>Counted across tracked stores</strong></div>
                  <div className="kv-row"><span>Price reference layer</span><strong>Compared against market anchors</strong></div>
                </div>
                <p className="copy" style={{ marginTop: 14 }}>The goal is to keep the product fast, readable and dependable while still reacting to meaningful changes in the sealed market.</p>
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
