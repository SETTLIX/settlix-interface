'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { effectiveStatus, StatusPill } from '@/components/status';
import { Check, Row } from '@/components/ui';
import { tokenByContract } from '@/lib/config';
import type { Invoice } from '@/lib/contracts';
import { relativeTime } from '@/lib/format';
import { formatAmount, splitFee } from '@/lib/money';
import { settlix } from '@/lib/settlix';
import { usePoll } from '@/lib/usePoll';

/** The counter screen: a scannable link to the pass that turns lime by itself once paid. */
export function InvoiceQR({ initial, feeBps }: { initial: Invoice; feeBps: number }) {
  const [url, setUrl] = useState('');
  useEffect(() => setUrl(`${window.location.origin}/pay/${initial.id}`), [initial.id]);
  const { data } = usePoll(() => settlix.invoice(initial.id), 4000, true, [initial.id]);
  const inv = data ?? initial;
  const status = effectiveStatus(inv.status, inv.expiresAt);
  const code = tokenByContract(inv.token)?.code ?? 'tokens';
  // After payment the contract records the actual fee; before it, preview at the current rate.
  const fee = inv.status === 'Open' ? splitFee(inv.amount, feeBps).fee : inv.fee;
  const paid = status === 'Paid';

  return (
    <div className={`overflow-hidden rounded-[26px] border-2 border-ink shadow-hard-lg transition-colors duration-500 ${paid ? 'bg-lime' : 'bg-violet'}`}>
      <div className={`flex items-center justify-between px-5 py-3 ${paid ? '' : 'text-field'}`}>
        <span className="font-mono text-xs font-semibold">#{inv.id} · {inv.reference}</span>
        <StatusPill status={status} />
      </div>
      <div className="mx-5 grid place-items-center rounded-2xl border-2 border-ink bg-field p-4">
        {paid ? (
          <div className="grid h-[208px] w-[208px] animate-pop place-items-center">
            <div className="text-center">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-ink bg-lime shadow-hard">
                <Check className="h-11 w-11" />
              </span>
              <p className="mt-4 font-display text-2xl font-black">Settled</p>
            </div>
          </div>
        ) : (
          <div className={status !== 'Open' ? 'opacity-20' : ''}>{url && <QRCodeSVG value={url} size={208} level="M" marginSize={0} fgColor="#0B0B0F" />}</div>
        )}
      </div>
      <div className={`px-5 pb-5 pt-4 ${paid ? '' : 'text-field'}`}>
        <p className="font-display text-4xl font-black leading-none">
          {formatAmount(inv.amount)} <span className="font-mono text-base font-semibold opacity-80">{code}</span>
        </p>
        <div className="mt-4 rounded-2xl border-2 border-ink bg-field px-4 py-1 text-ink">
          <Row label="You receive">{formatAmount(inv.amount - fee)} {code}</Row>
          <Row label="Platform fee">{formatAmount(fee)} {code}</Row>
          <Row label={status === 'Open' ? 'Expires' : 'Expiry'}>{relativeTime(inv.expiresAt)}</Row>
        </div>
        {url && (
          <div className="mt-4 flex gap-2">
            <button className="btn-ghost flex-1 px-3 text-xs" onClick={() => navigator.clipboard?.writeText(url)}>Copy link</button>
            <a className="btn-lime flex-1 px-3 text-xs" href={url} target="_blank" rel="noreferrer">Open pass</a>
          </div>
        )}
      </div>
    </div>
  );
}
