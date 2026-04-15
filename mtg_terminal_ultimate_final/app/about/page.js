import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'About | Sealed Intelligence Terminal',
  description: 'About the Sealed Intelligence Terminal project and what it is designed to do.',
};

export default function AboutPage() {
  return (
    <main>
      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="About"
              title="A decision terminal for sealed MTG products"
              intro="This project exists to answer a narrow but expensive question: should this sealed product be opened, held or simply watched longer?"
            />
          </div>
          <div className="panel">
            <div className="panel-inner">
              <div className="eyebrow">Design principle</div>
              <h3 style={{ marginTop: 14 }}>Collector-aware. Market-first.</h3>
              <p className="copy" style={{ marginTop: 14 }}>
                Most MTG tools focus on singles, deckbuilding or community content. This terminal focuses on sealed decisions,
                using recent retailer snapshots and lifecycle context to help users avoid obvious mistakes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
