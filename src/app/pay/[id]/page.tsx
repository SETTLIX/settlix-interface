'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ConnectButton } from '@/components/ConnectButton';
import { Pass } from '@/components/Pass';
import { effectiveStatus } from '@/components/status';
import { Check, Notice, Row, Spinner, Sticker } from '@/components/ui';
import { config, tokenByContract } from '@/lib/config';
import { explain } from '@/lib/contracts';
import { relativeTime, shortAddress } from '@/lib/format';
import { formatAmount } from '@/lib/money';
import { settlix } from '@/lib/settlix';
import { usePoll } from '@/lib/usePoll';
import { useWallet } from '@/lib/wallet';

const LABEL = {
  Open: 'Amount due',
  Paid: 'Paid in full',
  Expired: 'Expired unpaid',
  Cancelled: 'Cancelled',
  PartiallyRefunded: 'Paid, part refunded',
  Refunded: 'Refunded',
} as const;

export default function PayPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const valid = Number.isInteger(id) && id > 0;
  const { address, wrongNetwork, signer } = useWallet();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tx, setTx] = useState<string | null>(null);

  const invoice = usePoll(() => (valid ? settlix.invoice(id) : Promise.resolve(null)), 5000, valid && !tx, [id]);
  const merchant = usePoll(
    () => (invoice.data ? settlix.merchant(invoice.data.merchant) : Promise.resolve(null)),
    60_000,
    false,
    [invoice.data?.merchant],
  );

  if (!valid) return <Notice tone="error">That is not a valid invoice link.</Notice>;
  if (invoice.loading && invoice.data === undefined) return <div className="py-20 text-center"><Spinner label="Fetching your pass" /></div>;
  if (invoice.error && invoice.data === undefined) return <Notice tone="error" title="Network unreachable">{invoice.error}</Notice>;
  const inv = invoice.data;
  if (!inv) return <Notice tone="error" title="No such invoice">Invoice #{id} does not exist on {config.network}.</Notice>;

  const status = effectiveStatus(inv.status, inv.expiresAt);
  const code = tokenByContract(inv.token)?.code ?? 'tokens';
  const name = merchant.data?.name ?? shortAddress(inv.merchant);

  async function pay() {
    if (!address) return;
    setBusy(true);
    setError(null);
    try {
      const { hash } = await settlix.payInvoice(address, signer, id);
      setTx(hash);
      await invoice.reload();
    } catch (err) {
      setError(explain(err));
    } finally {
      setBusy(false);
    }
  }

  const sticker =
    status === 'Paid' ? <Sticker>Settled</Sticker> : status === 'Expired' ? <Sticker tone="fog">Expired</Sticker> : status === 'Cancelled' ? <Sticker tone="fog">Void</Sticker> : status !== 'Open' ? <Sticker tone="sun">Refunded</Sticker> : undefined;

  return (
    <div className="mx-auto grid max-w-4xl items-start gap-10 md:grid-cols-[1fr_1fr]">
      <div className="md:sticky md:top-32">
        <Pass merchant={name} reference={inv.reference} id={inv.id} amount={formatAmount(inv.amount)} code={code} label={LABEL[status]} tone={status} sticker={sticker}>
          <Row label="Merchant">{shortAddress(inv.merchant)}</Row>
          {status === 'Open' && <Row label="Expires">{relativeTime(inv.expiresAt)}</Row>}
          {inv.paidAt && <Row label="Paid">{inv.paidAt.toLocaleString()}</Row>}
          {inv.customer && <Row label="Paid by">{shortAddress(inv.customer)}</Row>}
          {inv.refunded > 0n && <Row label="Refunded">{formatAmount(inv.refunded)} {code}</Row>}
        </Pass>
      </div>

      <div className="space-y-5">
        {status === 'Open' && (
          <>
            <p className="eyebrow">Checkout</p>
            <h1 className="font-display text-4xl font-black leading-tight">
              Pay {name} <span className="text-violet">{formatAmount(inv.amount)} {code}</span>
            </h1>
            <ol className="space-y-3">
              {[
                ['Check the pass', 'Amount, merchant and reference are read from the payment contract, not from the QR code.'],
                ['Sign once', 'Freighter asks you to approve a single pay_invoice call.'],
                ['Done', 'The merchant is paid and the fee taken in the same transaction.'],
              ].map(([t, b], i) => (
                <li key={t} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink bg-sun font-display text-xs font-black">{i + 1}</span>
                  <span className="text-sm"><strong className="font-bold">{t}.</strong> <span className="text-ink/70">{b}</span></span>
                </li>
              ))}
            </ol>
            {merchant.data && merchant.data.status !== 'Active' && (
              <Notice tone="caution">This merchant is not currently active, so the payment would be rejected.</Notice>
            )}
            {!address ? (
              <ConnectButton className="btn-accent w-full py-4 text-base" />
            ) : wrongNetwork ? (
              <Notice tone="caution">Switch Freighter to {config.network} to pay.</Notice>
            ) : (
              <button className="btn-accent w-full py-4 text-base" onClick={pay} disabled={busy}>
                {busy ? 'Approve in Freighter...' : `Pay ${formatAmount(inv.amount)} ${code}`}
              </button>
            )}
            {error && <Notice tone="error">{error}</Notice>}
          </>
        )}

        {status === 'Paid' && (
          <div className="panel animate-pop bg-lime p-7">
            <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-field shadow-hard-sm">
              <Check className="h-8 w-8" />
            </span>
            <p className="mt-5 font-display text-4xl font-black leading-tight">Settled.</p>
            <p className="mt-2 font-medium text-ink/75">{name} has the money. You can put your phone away.</p>
            {tx && (
              <a className="btn-ghost mt-6" href={`${config.explorer}/tx/${tx}`} target="_blank" rel="noreferrer">
                View transaction
              </a>
            )}
          </div>
        )}
        {status === 'Expired' && <Notice tone="caution" title="Expired">This invoice ran out of time before it was paid. Ask the merchant for a new one.</Notice>}
        {status === 'Cancelled' && <Notice title="Cancelled">The merchant voided this invoice.</Notice>}
        {(status === 'Refunded' || status === 'PartiallyRefunded') && <Notice title="Refunded">The merchant refunded {formatAmount(inv.refunded)} {code} to the payer.</Notice>}
      </div>
    </div>
  );
}
