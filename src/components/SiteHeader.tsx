import Link from 'next/link';
import { ConnectButton } from './ConnectButton';
import { Ticker } from './Ticker';

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2" aria-label="Settlix home">
      <span className="grid h-9 w-9 place-items-center rounded-xl border-2 border-ink bg-violet shadow-hard-sm transition-transform group-hover:-rotate-6">
        <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-lime" />
      </span>
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
