import Link from 'next/link';
import { ConnectButton } from './ConnectButton';
import { Ticker } from './Ticker';

/** The Settlix mark: one unbroken lime stroke, money moving in a single motion. Source: public/logo.svg. */
export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="5" y="5" width="41" height="41" rx="12" fill="#0B0B0F" />
      <rect x="1.5" y="1.5" width="41" height="41" rx="12" fill="#5B2EFF" stroke="#0B0B0F" strokeWidth="3" />
      <path d="M28.14 10.2A7.5 7.5 0 1 0 22 22A7.5 7.5 0 1 1 15.86 33.8" fill="none" stroke="#0B0B0F" strokeWidth="8.6" strokeLinecap="round" />
      <path d="M28.14 10.2A7.5 7.5 0 1 0 22 22A7.5 7.5 0 1 1 15.86 33.8" fill="none" stroke="#C6F432" strokeWidth="4.2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="Settlix home">
      <LogoMark className="h-10 w-10 transition-transform group-hover:-rotate-6" />
      <span className="font-display text-xl font-black tracking-tight">SETTLIX</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-field">
      <Ticker />
      <nav className="border-b-2 border-ink">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/merchant" className="hidden rounded-full px-3 py-1.5 text-sm font-bold hover:bg-sun sm:inline">Merchants</Link>
            <Link href="/admin" className="hidden rounded-full px-3 py-1.5 text-sm font-bold hover:bg-sun sm:inline">Admin</Link>
            <ConnectButton />
          </div>
        </div>
      </nav>
    </header>
  );
}
