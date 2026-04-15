import SectionHeading from '@/components/SectionHeading';

export const metadata = {
  title: 'Privacy | Sealed Intelligence Terminal',
  description: 'Privacy notice for the Sealed Intelligence Terminal website.',
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="section">
        <div className="container panel">
          <div className="panel-inner">
            <SectionHeading
              eyebrow="Privacy"
              title="Simple privacy notice"
              intro="This starter version does not ask users to create accounts or submit personal data directly on-site. Standard server logs and analytics may still exist through hosting providers."
            />
            <ul className="list">
              <li>No account system is included in this version.</li>
              <li>No payment information is collected.</li>
              <li>If you later add analytics, email capture or affiliate tracking, this notice should be updated before launch.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
