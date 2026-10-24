import Link from 'next/link';
import { ConnectButton } from './ConnectButton';
import { Ticker } from './Ticker';

/**
 * The Settlix mark: two bars, violet and lime, meeting in an X where the
 * payment settles. Doubles as the x in the wordmark. Source: public/logo.svg.
 */
export function LogoMark({ className = 'h-10 w-10', shadow = true }: { className?: string; shadow?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      {shadow && (
        <g transform="translate(2.5 2.5)" fill="#0B0B0F">
          <rect x="17.5" y="1" width="11" height="44" rx="5.5" transform="rotate(45 23 23)" />
          <rect x="17.5" y="1" width="11" height="44" rx="5.5" transform="rotate(-45 23 23)" />
        </g>
      )}
      <rect x="17.5" y="1" width="11" height="44" rx="5.5" transform="rotate(45 23 23)" fill="#5B2EFF" stroke="#0B0B0F" strokeWidth="2.5" />
      <rect x="17.5" y="1" width="11" height="44" rx="5.5" transform="rotate(-45 23 23)" fill="#C6F432" stroke="#0B0B0F" strokeWidth="2.5" />
      <circle cx="23" cy="23" r="3.2" fill="#0B0B0F" />
    </svg>
  );
}

/** "settli" set in Unbounded with the mark as its x. */
export function Wordmark({ className = 'text-2xl', shadow = true }: { className?: string; shadow?: boolean }) {
  return (
    <span className={`inline-flex items-center font-display font-black lowercase leading-none tracking-[-0.04em] ${className}`}>
      settli
      <LogoMark shadow={shadow} className="ml-px mt-[0.14em] h-[1.05em] w-[1.05em] transition-transform group-hover:rotate-45" />
    </span>
  );
}

export function Logo() {
  return (
    <Link href="/" className="group" aria-label="Settlix home">
      <Wordmark className="text-[1.75rem]" />
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
