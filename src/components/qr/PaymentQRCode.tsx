'use client'

import { QRCodeSVG } from 'qrcode.react';

interface PaymentQRCodeProps {
  merchantAddress: string;
  amount: string;
  token: string;
  reference?: string;
}

export default function PaymentQRCode({ 
  merchantAddress, 
  amount, 
  token,
  reference 
}: PaymentQRCodeProps) {
  // Generate payment URL that can be scanned
  const paymentData = {
    merchant: merchantAddress,
    amount,
    token,
    reference: reference || '',
    timestamp: Date.now(),
  };
  
  const paymentUrl = `settlix://pay?data=${encodeURIComponent(JSON.stringify(paymentData))}`;
  
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg">
      <QRCodeSVG 
        value={paymentUrl}
        size={256}
        level="H"
        includeMargin={true}
      />
      <div className="mt-4 text-center text-slate-900">
        <div className="font-semibold text-lg">{amount} {token}</div>
        {reference && (
          <div className="text-sm text-gray-600 mt-1">Ref: {reference}</div>
        )}
      </div>
    </div>
  );
}
