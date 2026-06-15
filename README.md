# Settlix Interface

Frontend application for Settlix merchant payment platform.

## Features

- **QR Code Payments**: Generate QR codes for customer payments
- **Merchant Dashboard**: Real-time payment tracking and analytics
- **Settlement Tracking**: View settlement history and pending payouts
- **Multi-currency Support**: USDC, XLM, and other Stellar assets
- **Customer Payment View**: Simple payment interface for customers

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Shadcn UI
- **Wallet Integration**: Freighter, Albedo
- **State Management**: React Context + Hooks
- **QR Generation**: qrcode.react

## Getting Started

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── merchant/          # Merchant dashboard pages
│   ├── payment/           # Customer payment pages
│   └── settlement/        # Settlement tracking pages
├── components/
│   ├── qr/               # QR code generation
│   ├── dashboard/        # Dashboard components
│   └── ui/               # Shadcn UI components
├── lib/
│   ├── stellar/          # Stellar SDK utilities
│   ├── contracts/        # Contract interaction
│   └── utils/            # Helper functions
└── hooks/                 # Custom React hooks
```

## Environment Variables

```bash
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_PAYMENT_CONTRACT_ID=
NEXT_PUBLIC_MERCHANT_REGISTRY_CONTRACT_ID=
```

## Features

### Merchant Dashboard
- Real-time payment notifications
- Transaction history
- Settlement tracking
- Analytics and reporting

### QR Payment Flow
1. Merchant generates QR code with payment details
2. Customer scans QR code
3. Customer approves payment in wallet
4. Payment confirmed and settled instantly

### Settlement Management
- View pending settlements
- Track settlement history
- Export transaction reports
- Multi-currency balance tracking
