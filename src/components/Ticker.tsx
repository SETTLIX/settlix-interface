'use client';

import { useEffect, useState } from 'react';
import { config } from '@/lib/config';
import { settlix } from '@/lib/settlix';

interface Item {
  label: string;
  value: string;
}

/** Live prices from settlix-oracle and the on-chain fee, scrolling like a trading floor board. */
export function Ticker() {
  const [items, setItems] = useState<Item[]>([{ label: 'NETWORK', value: config.network.toUpperCase() }]);

  useEffect(() => {
    let alive = true;
    async function load() {
      const next: Item[] = [{ label: 'NETWORK', value: config.network.toUpperCase() }];
      try {
        const res = await fetch(`${config.oracleUrl}/v1/prices`);
        const body = await res.json();
        for (const p of body.prices ?? []) {
          next.push({ label: p.pair, value: p.ok ? Number(p.price).toFixed(4) : 'NO PRICE' });
        }
      } catch {
        next.push({ label: 'ORACLE', value: 'OFFLINE' });
      }
      try {
        next.push({ label: 'FEE', value: `${(await settlix.feeBps()) / 100}%` });
      } catch {
        /* chain unreachable: leave the fee out */
      }
      next.push({ label: 'SETTLEMENT', value: '1 TX' }, { label: 'CUSTODY', value: 'NONE' });
      if (alive) setItems(next);
    }
    void load();
    const t = setInterval(load, 30_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  const run = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-b-2 border-ink bg-lime" aria-label="Live prices">
      <div className="flex w-max animate-ticker gap-8 py-1.5 font-mono text-xs font-semibold motion-reduce:animate-none">
        {[0, 1].map((half) => (
          <div key={half} className="flex gap-8" aria-hidden={half === 1}>
            {run.map((it, i) => (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap">
                <span className="h-1.5 w-1.5 rotate-45 bg-ink" />
                <span className="opacity-60">{it.label}</span>
                <span>{it.value}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
