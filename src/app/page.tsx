import Link from 'next/link';
import { Pass } from '@/components/Pass';
import { Row, Sticker } from '@/components/ui';

function FlowNode({ label, sub, className }: { label: string; sub: string; className: string }) {
  return (
    <div className={`rounded-2xl border-2 border-ink px-3 py-2 text-center text-ink shadow-hard-sm ${className}`}>
      <p className="font-display text-xs font-black uppercase">{label}</p>
      <p className="font-mono text-[11px] opacity-70">{sub}</p>
    </div>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 40 16" className="h-4 w-10 shrink-0" aria-hidden>
    <path d="M0 8h34M28 2l7 6-7 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
  </svg>
);

const MOVES = [
  ['Invoice', 'Type a dollar amount. A signed oracle quote turns it into XLM or USDC, and your wallet writes the invoice on-chain.', 'bg-sun'],
  ['Scan', 'The QR is a plain web link. Any phone camera opens the pass; no app, no account.', 'bg-sky'],
  ['Settled', 'The customer signs once. Merchant paid, fee taken, invoice closed: one ledger, no middleman.', 'bg-lime'],
] as const;

export default function Home() {
  return (
    <div className="space-y-20 sm:space-y-28">
      <section className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div>
          <p className="eyebrow">Merchant payments on Stellar</p>
          <h1 className="mt-6 font-display text-[2.15rem] font-black leading-[0.98] tracking-tight min-[420px]:text-5xl sm:text-6xl xl:text-7xl">
            Settle
            <br />
            <span className="relative inline-block -rotate-2 rounded-2xl border-2 border-ink bg-violet px-3 text-field shadow-hard">up</span>{' '}
            in one
            <br />
            transaction.
          </h1>
          <p className="mt-8 max-w-lg text-lg font-medium text-ink/75">
            Show a QR code, get paid in XLM or USDC, and have the money in your account before the customer puts their phone away. The
            contract checks everything and keeps nothing.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/merchant" className="btn-accent px-7 py-3.5 text-base">Start taking payments</Link>
            <a href="https://github.com/SETTLIX" className="btn-ghost px-7 py-3.5 text-base">See the code</a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem]">
          <div className="absolute -left-6 -top-6 hidden h-28 w-28 rounded-full border-2 border-ink bg-sun sm:block" aria-hidden />
          <div className="absolute -bottom-5 -right-5 hidden h-20 w-20 rotate-12 rounded-2xl border-2 border-ink bg-coral sm:block" aria-hidden />
          <div className="relative rotate-[2deg]">
            <Pass merchant="Northside Coffee" reference="TAB-0417" id={417} amount="18.40" code="USDC" label="Paid in full" tone="Paid" sticker={<Sticker>Settled</Sticker>}>
              <Row label="To merchant">18.308 USDC</Row>
              <Row label="Platform fee">0.092 USDC</Row>
            </Pass>
          </div>
        </div>
      </section>

      <section className="grid auto-rows-[minmax(11rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="panel flex flex-col justify-between bg-violet p-6 text-field sm:col-span-2 lg:row-span-2">
          <div>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-lime">One transaction</p>
            <p className="mt-3 font-display text-3xl font-black leading-tight">Everything happens in a single signature.</p>
          </div>
          <div className="mt-8 space-y-4 text-ink">
            <div className="flex items-center gap-2 text-field">
              <FlowNode label="Customer" sub="signs once" className="bg-field" />
              <Arrow />
              <FlowNode label="Payment" sub="contract" className="bg-sun" />
            </div>
            <div className="flex flex-wrap items-center gap-2 pl-6 text-field sm:pl-24">
              <Arrow />
              <FlowNode label="Merchant" sub="99.5%" className="bg-lime" />
              <FlowNode label="Fee vault" sub="0.5%" className="bg-sky" />
            </div>
          </div>
          <p className="mt-6 text-sm text-field/75">Registry check, fee split, payout and invoice close all happen in one Soroban call. If any check fails, nothing moves.</p>
        </div>

        <div className="panel bg-lime p-6">
          <p className="font-display text-5xl font-black">1x</p>
          <p className="mt-2 font-display text-sm font-bold uppercase">Paid once</p>
          <p className="mt-1 text-sm text-ink/70">Every invoice and every reference can be paid exactly once.</p>
        </div>
        <div className="panel bg-sun p-6">
          <p className="font-display text-5xl font-black">0</p>
          <p className="mt-2 font-display text-sm font-bold uppercase">Funds held</p>
          <p className="mt-1 text-sm text-ink/70">Money goes straight from customer to merchant.</p>
        </div>
        <div className="panel bg-sky p-6">
          <p className="font-display text-sm font-bold uppercase">Verified merchants</p>
          <p className="mt-2 text-sm text-ink/70">Approved before they can invoice. Only a SHA-256 hash of the business ID goes on-chain.</p>
        </div>
        <div className="panel bg-coral-soft p-6">
          <p className="font-display text-sm font-bold uppercase">Prices that refuse to lie</p>
          <p className="mt-2 text-sm text-ink/70">Median of CoinGecko and the Stellar DEX. Stale or conflicting data means no quote instead of a wrong one.</p>
        </div>
      </section>

      <section>
        <p className="eyebrow">Three moves</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {MOVES.map(([title, body, bg], i) => (
            <div key={title} className="panel relative p-6 pt-10">
              <span className={`absolute -top-6 left-6 grid h-12 w-12 place-items-center rounded-full border-2 border-ink font-display text-xl font-black shadow-hard-sm ${bg}`}>
                {i + 1}
              </span>
              <p className="font-display text-2xl font-black">{title}</p>
              <p className="mt-2 text-ink/70">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel overflow-hidden bg-ink text-field">
        <div className="grid gap-px bg-field/20 md:grid-cols-3">
          {[
            ['settlix-contracts', 'Soroban: invoices, merchant registry, fee vault', 'bg-violet'],
            ['settlix-oracle', 'Prices, signed quotes, payment verification', 'bg-sun'],
            ['settlix-interface', 'This app: console, pass, approvals', 'bg-lime'],
          ].map(([repo, body, dot]) => (
            <a key={repo} href={`https://github.com/SETTLIX/${repo}`} className="group bg-ink p-6 hover:bg-[#17171f]">
              <span className={`inline-block h-4 w-4 rounded-full border-2 border-field ${dot}`} />
              <p className="mt-4 font-mono text-sm font-semibold group-hover:text-lime">{repo}</p>
              <p className="mt-1 text-sm text-field/60">{body}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
