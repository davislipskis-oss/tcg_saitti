import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Sealed Intelligence Terminal',
  description: 'MTG sealed market signals across Europe. Track sealed momentum, supply compression and opening risk.',
  metadataBase: new URL('https://example.com'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell arcane-grid">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
