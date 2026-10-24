# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning:
[SemVer](https://semver.org/).

## [Unreleased]

### Changed

- New visual identity, distinct from other Stellar POS projects:
  neo-brutalist white field, ink outlines, hard shadows, and violet, lime,
  sun, coral and sky blocks; Unbounded, Manrope and JetBrains Mono. Invoices
  are shown as a transit pass with a generated barcode. A live price ticker
  reads from settlix-oracle. The landing page is a bento grid with a flow
  diagram, and the pay page has a settled state.

## [0.2.0] - 2026-10-24

### Added

- Merchant console: apply with a browser-side SHA-256 of the business ID,
  pending and suspended states, invoices priced in USD (through the oracle)
  or directly in XLM or USDC, a QR panel that turns to PAID by itself, and
  a recent-invoices list.
- Customer pay page at `/pay/[id]`, paying with Freighter through the
  payment contract in one transaction.
- Admin page to look up and approve merchant applications.
- Soroban client shared by the UI and a testnet smoke test
  (`npm run smoke`).
- Vitest suite, ESLint flat config, CI, dependabot, security headers.
- README, architecture doc, security policy, contributing guide, code of
  conduct, MIT license, issue forms and PR template.

### Fixed

- `src/lib/stellar.ts` imported `SorobanRpc`, which no longer exists in
  `@stellar/stellar-sdk` 14.
- The Merchant, Pay and Get Started links pointed to routes that did not
  exist, and Connect Wallet did nothing.
- The QR code used an invented `settlix://` scheme no wallet or camera
  understands, and carried the amount in the code itself. It now encodes a
  normal URL, and the amount is read from the chain.
- Next.js 15.1.0 to 15.5, which includes the fix for the middleware
  authorization bypass (CVE-2025-29927).
- The removed `swcMinify` option in `next.config.js`.

### Removed

- Marketing claims the app could not back up ("< 5 sec", "24/7").
- Emoji from the README; generated `.meta/commits` filler files.
