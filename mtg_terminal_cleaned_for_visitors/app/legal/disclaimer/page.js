import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'Disclaimer | Sealed Intelligence Terminal',
  description: 'Disclaimer for snapshot-based MTG market signals and retailer pricing references.',
};

export default function DisclaimerPage() {
  return (
    <main>
      <section className="section">
        <div className="container panel">
          <div className="panel-inner">
            <SectionHeading
              eyebrow="Disclaimer"
              title="Analytical guidance, not a guarantee"
              intro="The information on this site is provided for general informational purposes only. It is not financial advice, investment advice or a guarantee of future pricing."
            />
            <ul className="list">
              <li>Retail prices are tracked from selected public product pages and may change without notice.</li>
              <li>Signals are based on observed snapshots, product context and internal scoring logic.</li>
              <li>You should verify final pricing, shipping and availability directly with the retailer before purchasing.</li>
              <li>This site is not affiliated with Wizards of the Coast, Cardmarket or any retailer listed here.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
