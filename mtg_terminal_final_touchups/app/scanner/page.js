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
            Prices are tracked across selected European retailers and refreshed throughout the day, with the strongest market anchors checked most often.
          </div>

          <ScannerLiveTable products={products} />

          <div className="grid-2" style={{ marginTop: 18 }}>
            <div className="card">
              <h3>What the scanner shows</h3>
              <ul className="list" style={{ marginTop: 14 }}>
                <li>The cheapest currently tracked offer across the covered retailer set.</li>
                <li>How many stores are covered and how many currently show stock.</li>
                <li>How fresh the latest tracked pricing is for each visible row.</li>
              </ul>
            </div>
            <div className="card">
              <h3>Why it matters</h3>
              <ul className="list" style={{ marginTop: 14 }}>
                <li>It gives you a fast Europe-wide read before you buy, open or hold.</li>
                <li>It helps surface supply compression before it becomes obvious.</li>
                <li>It keeps product comparison practical instead of forcing store-by-store searching.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
