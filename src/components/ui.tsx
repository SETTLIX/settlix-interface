import type { ReactNode } from 'react';

const TONES = {
  info: 'bg-sky-soft',
  error: 'bg-coral-soft',
  success: 'bg-lime-soft',
  caution: 'bg-sun-soft',
} as const;
const DOTS = { info: 'bg-sky', error: 'bg-coral', success: 'bg-lime', caution: 'bg-sun' } as const;

export function Notice({ tone = 'info', title, children }: { tone?: keyof typeof TONES; title?: string; children: ReactNode }) {
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`flex gap-3 rounded-2xl border-2 border-ink px-4 py-3 text-sm shadow-hard-sm ${TONES[tone]}`}>
      <span className={`mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-ink ${DOTS[tone]}`} aria-hidden />
      <div>
        {title && <p className="font-display text-xs font-bold uppercase tracking-wider">{title}</p>}
        <div className={title ? 'mt-0.5' : ''}>{children}</div>
      </div>
    </div>
  );
}

/** A tilted sticker, for big state changes. */
export function Sticker({ children, tone = 'lime' }: { children: ReactNode; tone?: 'lime' | 'sun' | 'coral' | 'fog' }) {
  const bg = { lime: 'bg-lime', sun: 'bg-sun', coral: 'bg-coral text-field', fog: 'bg-fog' }[tone];
  return (
    <span className={`inline-block -rotate-6 animate-pop rounded-xl border-2 border-ink px-3 py-1 font-display text-sm font-black uppercase tracking-wider shadow-hard-sm ${bg}`}>
      {children}
    </span>
  );
}

export function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b-2 border-dashed border-ink/15 py-2 text-sm last:border-0">
      <span className="font-semibold text-ink/60">{label}</span>
      <span className="text-right font-mono font-semibold">{children}</span>
    </div>
  );
}

export function Spinner({ label = 'Loading' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-3 font-display text-xs font-bold uppercase tracking-wider" role="status">
      <span className="flex gap-1" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2.5 w-2.5 animate-bounce rounded-sm border-2 border-ink bg-violet" style={{ animationDelay: `${i * 120}ms` }} />
        ))}
      </span>
      {label}
    </span>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`panel p-6 ${className}`}>{children}</section>;
}

export function Check({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}
