'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, QrCode, Zap, Globe, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="border-b border-slate-700">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Settlix</div>
          <div className="flex gap-6">
            <Link href="/merchant" className="hover:text-blue-400">Merchant</Link>
            <Link href="/payment" className="hover:text-blue-400">Pay</Link>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
              Connect Wallet
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6">
            Accept Payments<br />
            <span className="text-blue-400">Instantly on Stellar</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            QR code payments • Instant settlement • Global reach
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/merchant/register" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2">
              Get Started <ArrowRight size={20} />
            </Link>
            <Link href="/payment" className="border border-blue-600 hover:bg-blue-600/10 px-8 py-4 rounded-lg font-semibold text-lg">
              Make a Payment
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <FeatureCard 
            icon={<QrCode size={32} />}
            title="QR Payments"
            description="Generate QR codes for instant customer payments"
          />
          <FeatureCard 
            icon={<Zap size={32} />}
            title="Instant Settlement"
            description="Receive funds immediately after payment"
          />
          <FeatureCard 
            icon={<Globe size={32} />}
            title="Cross-Border"
            description="Accept payments from anywhere in the world"
          />
          <FeatureCard 
            icon={<Shield size={32} />}
            title="Secure"
            description="Built on Stellar blockchain technology"
          />
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-20 text-center">
          <StatCard value="< 5 sec" label="Average Settlement Time" />
          <StatCard value="0.5%" label="Platform Fee" />
          <StatCard value="24/7" label="Always Available" />
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-600 transition-colors">
      <div className="text-blue-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
      <div className="text-4xl font-bold text-blue-400 mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  )
}
