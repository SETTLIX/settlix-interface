'use client';

import { shortAddress } from '@/lib/format';
import { useWallet } from '@/lib/wallet';

export function ConnectButton({ className = 'btn-accent' }: { className?: string }) {
  const { address, installed, connecting, connect } = useWallet();
  if (address) {
    return (
      <span className="chip bg-lime py-1.5 font-mono" title={address}>
        <span className="h-2 w-2 rounded-full bg-ink" aria-hidden />
        {shortAddress(address, 4)}
      </span>
    );
  }
  if (installed === false) {
    return (
      <a className={className} href="https://www.freighter.app/" target="_blank" rel="noreferrer">
        Get Freighter
      </a>
    );
  }
  return (
    <button className={className} onClick={connect} disabled={connecting}>
      {connecting ? 'Connecting...' : 'Connect wallet'}
    </button>
  );
}

/** Shown in place of a page's content until a wallet is connected on the right network. */
export function WalletGate({ children, purpose }: { children: React.ReactNode; purpose: string }) {
  const { address, wrongNetwork, error } = useWallet();
  if (!address) {
    return (
      <div className="mx-auto grid max-w-3xl overflow-hidden rounded-[28px] border-2 border-ink shadow-hard-lg sm:grid-cols-[1fr_1.3fr]">
        <div className="relative grid min-h-48 place-items-center bg-violet p-8">
          <div className="grid h-24 w-24 animate-wiggle place-items-center rounded-3xl border-2 border-ink bg-lime shadow-hard">
            <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="#0B0B0F" strokeWidth={2.4} strokeLinejoin="round" aria-hidden>
              <rect x="3" y="6" width="18" height="13" rx="3" />
              <path d="M3 10h18M16 14.5h2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="bg-field p-8">
          <p className="eyebrow">Wallet required</p>
          <p className="mt-4 font-display text-3xl font-black leading-tight">Plug in your wallet.</p>
          <p className="mt-3 text-ink/70">{purpose}</p>
          <div className="mt-6">
            <ConnectButton />
          </div>
          {error && <p className="mt-3 text-sm font-semibold text-coral">{error}</p>}
        </div>
      </div>
    );
  }
  if (wrongNetwork) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border-2 border-ink bg-sun p-6 font-semibold shadow-hard">
        Freighter is on another network. Switch it to <strong>{process.env.NEXT_PUBLIC_STELLAR_NETWORK ?? 'testnet'}</strong> and reload.
      </div>
    );
  }
  return <>{children}</>;
}
