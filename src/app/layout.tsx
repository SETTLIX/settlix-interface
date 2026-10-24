import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Manrope, Unbounded } from 'next/font/google';
import { SiteHeader, Wordmark } from '@/components/SiteHeader';
import { WalletProvider } from '@/lib/wallet';
import './globals.css';

const display = Unbounded({ subsets: ['latin'], weight: ['500', '700', '900'], variable: '--font-display' });
const sans = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: { default: 'Settlix', template: '%s | Settlix' },
  description: 'Invoice in USDC or XLM, get paid by QR code, settled on Stellar in the same transaction.',
};

export const viewport: Viewport = { themeColor: '#5B2EFF' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <WalletProvider>
          <SiteHeader />
          <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">{children}</main>
          <footer className="border-t-2 border-ink bg-ink text-field">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm sm:px-6">
              <Wordmark className="text-xl" shadow={false} />
              <span className="text-field/70">
                Open source at{' '}
                <a className="font-bold text-lime underline-offset-4 hover:underline" href="https://github.com/SETTLIX">github.com/SETTLIX</a>
                . Contracts are unaudited.
              </span>
            </div>
          </footer>
        </WalletProvider>
      </body>
    </html>
  );
}
