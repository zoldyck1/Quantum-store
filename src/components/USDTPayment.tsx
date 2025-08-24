import React, { useState } from 'react';
import { Copy, Check, Wallet } from 'lucide-react';

interface USDTPaymentProps {
  amount: number;
  onConfirm: (data: { name: string; contact: string }) => void;
}

const USDTPayment: React.FC<USDTPaymentProps> = ({ amount, onConfirm }) => {
  const [formData, setFormData] = useState({ name: '', contact: '' });
  const [copied, setCopied] = useState(false);
  
  const walletAddress = 'TYourUSDTWalletAddressHere123456789';
  const usdtAmount = (amount * 0.1).toFixed(2); // Convert MAD to USDT (example rate)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.contact) {
      onConfirm(formData);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Wallet className="h-6 w-6 text-orange-600" />
          <h3 className="text-xl font-bold text-orange-900">USDT Crypto Payment</h3>
        </div>
        <p className="text-orange-700">Pay with USDT cryptocurrency</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-orange-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Wallet className="h-5 w-5 text-orange-600 mr-2" />
          Wallet Details
        </h4>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-semibold text-gray-700">USDT Wallet Address (TRC20)</label>
              <button
                onClick={() => copyToClipboard(walletAddress)}
                className="flex items-center gap-2 px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <code className="block text-sm font-mono bg-white p-3 rounded border break-all text-gray-800">
              {walletAddress}
            </code>
          </div>
          
          <div className="flex justify-between items-center p-4 bg-orange-100 rounded-lg border border-orange-300">
            <span className="text-orange-700 font-medium">Amount to Send:</span>
            <span className="font-bold text-2xl text-orange-800">{usdtAmount} USDT</span>
          </div>
          
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <span className="text-red-600 font-bold text-lg">⚠️</span>
              <div className="text-sm text-red-700">
                <p className="font-semibold mb-1">Important Warning:</p>
                <p>Only send USDT on TRC20 network. Other tokens or networks will result in permanent loss of funds.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-orange-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Confirm Your USDT Payment</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email or Phone *</label>
            <input
              type="text"
              required
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Enter your email or phone number"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold text-lg shadow-md"
          >
            ₿ Confirm USDT Payment Sent
          </button>
        </form>
      </div>
    </div>
  );
};

export default USDTPayment;