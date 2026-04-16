import Link from 'next/link';

const links = [
  { href: '/signals', label: 'Signals' },
  { href: '/market', label: 'Market' },
  { href: '/scanner', label: 'Scanner' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  return (
    <header className="topbar">
      <div className="container nav">
        <Link href="/" className="brand" aria-label="Sealed Intelligence Terminal home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-copy">
            <span className="brand-title">Sealed Intelligence Terminal</span>
            <span className="brand-subtitle">MTG sealed market signals across Europe</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
