import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Pass } from '@/components/Pass';
import { effectiveStatus, StatusPill } from '@/components/status';
import { Row, Sticker } from '@/components/ui';
import { recentInvoices, rememberInvoice } from '@/lib/recent';

describe('status', () => {
  it('shows open invoices past expiry as expired', () => {
    const now = new Date('2026-10-24T12:00:00Z');
    expect(effectiveStatus('Open', new Date('2026-10-24T11:59:59Z'), now)).toBe('Expired');
    expect(effectiveStatus('Open', new Date('2026-10-24T12:00:01Z'), now)).toBe('Open');
    expect(effectiveStatus('Paid', new Date('2026-10-24T11:00:00Z'), now)).toBe('Paid');
  });

  it('labels statuses for people', () => {
    render(<StatusPill status="Open" />);
    expect(screen.getByText('Waiting')).toBeTruthy();
  });
});

describe('Pass', () => {
  it('renders merchant, amount, rows, sticker and a barcode label from the id', () => {
    render(
      <Pass merchant="Ada Fabrics" reference="ORDER-1001" id={42} amount="25.00" code="XLM" label="Paid in full" tone="Paid" sticker={<Sticker>Settled</Sticker>}>
        <Row label="To merchant">24.875 XLM</Row>
      </Pass>,
    );
    expect(screen.getByText('Ada Fabrics')).toBeTruthy();
    expect(screen.getByText('24.875 XLM')).toBeTruthy();
    expect(screen.getByText('Settled')).toBeTruthy();
    expect(screen.getByText('ref ORDER-1001')).toBeTruthy();
    expect(screen.getByText('SETTLIX·00000042')).toBeTruthy();
  });
});

describe('recent invoices', () => {
  it('keeps newest first, without duplicates, per merchant', () => {
    rememberInvoice('GA', 1);
    rememberInvoice('GA', 2);
    rememberInvoice('GA', 1);
    rememberInvoice('GB', 9);
    expect(recentInvoices('GA')).toEqual([1, 2]);
    expect(recentInvoices('GB')).toEqual([9]);
  });

  it('survives corrupted storage', () => {
    localStorage.setItem('settlix:invoices:GC', '{not json');
    expect(recentInvoices('GC')).toEqual([]);
  });
});
