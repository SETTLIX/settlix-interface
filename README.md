# Settlix Interface

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

Modern frontend for Settlix merchant payment platform on Stellar.

**[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Screenshots](#screenshots)**

</div>

---

## 🌟 Features

### For Merchants
- 💳 **QR Code Payments**: Generate dynamic QR codes for customer payments
- 📊 **Real-time Dashboard**: Track payments, settlements, and analytics
- ⚡ **Instant Settlement**: View settlements as they happen
- 📈 **Analytics**: Transaction volume, revenue tracking, customer insights
- 🔔 **Notifications**: Real-time payment alerts

### For Customers
- 📱 **Scan & Pay**: Simple QR code scanning flow
- 🔐 **Wallet Integration**: Freighter, Albedo wallet support
- 💸 **Multi-Currency**: USDC, XLM, and other Stellar assets
- 🧾 **Receipt Generation**: Automatic digital receipts

### Technical Features
- 🎨 **Modern UI**: Clean, responsive design with TailwindCSS
- 🔄 **Real-time Updates**: WebSocket-based payment notifications
- 🌐 **PWA Ready**: Install as mobile/desktop app
- 🔒 **Secure**: Client-side wallet authentication

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- Stellar wallet (Freighter recommended)

### Installation

```bash
# Clone repository
git clone https://github.com/SETTLIX/settlix-interface.git
cd settlix-interface

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Run development server
npm run dev
```

Visit `http://localhost:3000`

### Environment Variables

Create `.env.local`:

```bash
# Stellar Network Configuration
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"

# Contract IDs (from deployment)
NEXT_PUBLIC_PAYMENT_CONTRACT_ID=CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
NEXT_PUBLIC_MERCHANT_REGISTRY_CONTRACT_ID=CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
NEXT_PUBLIC_SETTLEMENT_CONTRACT_ID=CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC

# API Configuration (optional)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

## 📖 Usage

### Merchant Flow

#### 1. Register as Merchant

```bash
# Navigate to merchant registration
http://localhost:3000/merchant/register
```

Fill in:
- Business Name
- Business ID/Tax Number
- Settlement Wallet Address
- Connect your wallet

#### 2. Generate Payment QR Code

```tsx
import PaymentQRCode from '@/components/qr/PaymentQRCode';

<PaymentQRCode 
  merchantAddress="GMERCHANT..."
  amount="10.00"
  token="USDC"
  reference="ORDER-123"
/>
```

#### 3. View Dashboard

Access real-time analytics at `/merchant/dashboard`:
- Today's revenue
- Transaction count
- Pending settlements
- Payment history

### Customer Flow

#### 1. Scan QR Code

Use any QR scanner or Settlix mobile app to scan merchant QR code.

#### 2. Review Payment Details

- Merchant name
- Amount and currency
- Order reference

#### 3. Approve Payment

Connect wallet and approve transaction. Payment settles instantly.

## 🎨 Pages

### Public Pages
- `/` - Landing page with features
- `/payment` - Customer payment interface
- `/payment/[paymentId]` - Payment details

### Merchant Pages (Auth Required)
- `/merchant/register` - Merchant registration
- `/merchant/dashboard` - Main dashboard
- `/merchant/payments` - Payment history
- `/merchant/settlements` - Settlement tracking
- `/merchant/qr-generator` - Generate payment QR codes
- `/merchant/settings` - Merchant profile settings

### Components

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── merchant/
│   │   ├── dashboard/
│   │   │   └── page.tsx           # Merchant dashboard
│   │   ├── register/
│   │   │   └── page.tsx           # Registration form
│   │   └── payments/
│   │       └── page.tsx           # Payment list
│   └── payment/
│       └── [id]/
│           └── page.tsx           # Payment details
├── components/
│   ├── qr/
│   │   ├── PaymentQRCode.tsx      # QR code generator
│   │   └── QRScanner.tsx          # QR code scanner
│   ├── dashboard/
│   │   ├── StatsCard.tsx          # Stats widget
│   │   ├── RecentPayments.tsx     # Payment list
│   │   └── RevenueChart.tsx       # Revenue chart
│   ├── wallet/
│   │   ├── ConnectWallet.tsx      # Wallet connection
│   │   └── WalletProvider.tsx     # Wallet context
│   └── ui/                        # Reusable UI components
├── lib/
│   ├── stellar.ts                 # Stellar SDK utilities
│   ├── contracts.ts               # Contract interaction
│   └── utils.ts                   # Helper functions
└── hooks/
    ├── useWallet.ts               # Wallet hook
    ├── usePayments.ts             # Payment data hook
    └── useContract.ts             # Contract interaction hook
```

## 🛠️ Development

### Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

### Code Style

- ESLint for linting
- Prettier for formatting
- TypeScript for type safety

## 🎨 Customization

### Theme

Edit `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
      },
    },
  },
};
```

### Components

All components use TailwindCSS for styling. No CSS modules or styled-components.

## 📱 Mobile Support

- Responsive design for all screen sizes
- Touch-optimized interactions
- PWA installable
- Camera access for QR scanning

## 🔒 Security

- Client-side wallet signatures
- No private keys stored
- XSS protection
- CSRF tokens
- Content Security Policy headers

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy

# Production deployment
vercel --prod
```

### Docker

```bash
# Build image
docker build -t settlix-interface .

# Run container
docker run -p 3000:3000 settlix-interface
```

### Environment Variables

Set all environment variables in your deployment platform:
- Vercel: Project Settings → Environment Variables
- Docker: Use `.env` file or `-e` flags

## 📊 Analytics

Integration with:
- Google Analytics
- Mixpanel
- Custom event tracking

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

MIT License

## 🔗 Links

- **Contracts**: [settlix-contracts](https://github.com/SETTLIX/settlix-contracts)
- **Oracle**: [settlix-oracle](https://github.com/SETTLIX/settlix-oracle)
- **Stellar Docs**: [soroban.stellar.org](https://soroban.stellar.org)

---

Built with ❤️ for merchants worldwide
