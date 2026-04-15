import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'Terms | Sealed Intelligence Terminal',
  description: 'Terms of use for the Sealed Intelligence Terminal website.',
};

export default function TermsPage() {
  return (
    <main>
      <section className="section">
        <div className="container panel">
          <div className="panel-inner">
            <SectionHeading
              eyebrow="Terms"
              title="Basic terms of use"
              intro="By using this site, you agree to use the information at your own discretion. Retail pricing, availability and signals may change over time."
            />
            <ul className="list">
              <li>You may not copy the entire site or dataset and republish it as your own.</li>
              <li>You are responsible for verifying retailer information before purchasing.</li>
              <li>The site owner may change or remove tracked products, signals or retailer links at any time.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
