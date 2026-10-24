import type { ReactNode } from 'react';
import type { InvoiceStatus } from '@/lib/contracts';

type Tone = InvoiceStatus | 'Expired';

const TOP: Record<Tone, string> = {
  Open: 'bg-violet text-field',
  Paid: 'bg-lime text-ink',
  Expired: 'bg-fog text-ink/60',
  Cancelled: 'bg-fog text-ink/60',
  PartiallyRefunded: 'bg-coral text-field',
  Refunded: 'bg-coral text-field',
};

/**
 * An invoice as a transit pass: a colored top half that changes with state,
 * the amount set huge, and a barcode generated from the invoice id.
 */
export function Pass(props: {
  merchant: string;
  reference: string;
  id: number;
  amount: string;
  code: string;
  label: string;
  tone: Tone;
  sticker?: ReactNode;
  children?: ReactNode;
}) {
  const seed = (props.id % 4) + 1;
  return (
    <article className="relative overflow-hidden rounded-[28px] border-2 border-ink bg-field shadow-hard-lg">
      <div className={`px-6 pb-7 pt-6 transition-colors duration-500 ${TOP[props.tone]}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Pay to</p>
            <p className="truncate font-display text-lg font-bold">{props.merchant}</p>
          </div>
          <span className="shrink-0 rounded-full border-2 border-current px-2.5 py-0.5 font-mono text-xs font-semibold">#{props.id}</span>
        </div>
        <p className="mt-6 font-display text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">{props.label}</p>
        <p className="mt-1 break-all font-display text-5xl font-black leading-none tracking-tight">
          {props.amount}
          <span className="ml-2 align-top font-mono text-base font-semibold opacity-80">{props.code}</span>
        </p>
      </div>
      <div className="relative border-t-2 border-ink px-6 pb-5 pt-4">
        {/* Punched holes where the pass would tear. */}
        <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full border-2 border-ink bg-field" aria-hidden />
        <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full border-2 border-ink bg-field" aria-hidden />
        {/* Slapped across the tear line, clear of the amount. */}
        {props.sticker && <div className="pointer-events-none absolute -top-5 right-8">{props.sticker}</div>}
        <p className="mb-2 font-mono text-xs text-ink/60">ref {props.reference}</p>
        {props.children}
        <div className="barcode mt-4 h-10 rounded-sm opacity-90" style={{ ['--seed' as string]: seed }} aria-hidden />
        <p className="mt-1 text-center font-mono text-[10px] tracking-[0.35em] text-ink/50">SETTLIX·{String(props.id).padStart(8, '0')}</p>
      </div>
    </article>
  );
}
