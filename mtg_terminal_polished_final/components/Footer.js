import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h4>Sealed Intelligence Terminal</h4>
          <p>
            Snapshot-based market intelligence for MTG sealed products. Built to help collectors and speculators detect
            price momentum, supply compression and opening risk before making a move.
          </p>
        </div>

        <div>
          <h4>Navigate</h4>
          <ul className="footer-list">
            <li><Link href="/signals">Signals</Link></li>
            <li><Link href="/market">Market</Link></li>
            <li><Link href="/scanner">Scanner</Link></li>
            <li><Link href="/methodology">Methodology</Link></li>
          </ul>
        </div>

        <div>
          <h4>Trust</h4>
          <ul className="footer-list">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/legal/disclaimer">Disclaimer</Link></li>
            <li><Link href="/legal/privacy">Privacy</Link></li>
            <li><Link href="/legal/terms">Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4>Data notes</h4>
          <ul className="footer-list">
            <li>Retail prices are tracked from selected public product pages.</li>
            <li>Signals are updated from recent snapshots, not second-by-second market feeds.</li>
            <li>Always verify the final retailer price before purchasing.</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
