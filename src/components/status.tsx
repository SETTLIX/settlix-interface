import type { InvoiceStatus } from '@/lib/contracts';

const LABELS: Record<InvoiceStatus | 'Expired', [string, string]> = {
  Open: ['Waiting', 'bg-sun'],
  Expired: ['Expired', 'bg-fog'],
  Paid: ['Settled', 'bg-lime'],
  Cancelled: ['Void', 'bg-fog'],
  PartiallyRefunded: ['Part refund', 'bg-coral-soft'],
  Refunded: ['Refunded', 'bg-coral-soft'],
};

export function effectiveStatus(status: InvoiceStatus, expiresAt: Date, now = new Date()): InvoiceStatus | 'Expired' {
  return status === 'Open' && expiresAt <= now ? 'Expired' : status;
}

export function StatusPill({ status }: { status: InvoiceStatus | 'Expired' }) {
  const [label, bg] = LABELS[status];
  return <span className={`chip font-display uppercase tracking-wider ${bg}`}>{label}</span>;
}
