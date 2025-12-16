import React, { useState } from 'react';
import { Copy, Check, Banknote } from 'lucide-react';

interface BankTransferPaymentProps {
  amount: number;
  onConfirm: (data: { name: string; contact: string }) => void;
}

const BankTransferPayment: React.FC<BankTransferPaymentProps> = ({ amount, onConfirm }) => {
  const [formData, setFormData] = useState({ name: '', contact: '' });
  const [copied, setCopied] = useState(false);
  
  const bankDetails = {
    bankName: 'Your Bank Name',
    accountNumber: 'XXXX XXXX XXXX XXXX',
    rib: 'XX XXXX XXXX XXXX XXXX XXXX XX',
    accountHolder: 'Your Name'
  };

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
    <div className="space-y-6 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-green-900 mb-2">Bank Transfer Payment</h3>
        <p className="text-green-700">Transfer money using your banking app</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Banknote className="h-5 w-5 text-green-600 mr-2" />
          Bank Details
        </h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="text-gray-600">Bank:</span>
            <span className="font-semibold text-gray-800">{bankDetails.bankName}</span>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">RIB:</span>
              <button
                onClick={() => copyToClipboard(bankDetails.rib)}
                className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <span className="font-mono text-lg font-bold text-gray-800 block">{bankDetails.rib}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="text-gray-600">Account Holder:</span>
            <span className="font-semibold text-gray-800">{bankDetails.accountHolder}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-100 rounded border border-green-300">
            <span className="text-green-700 font-medium">Amount to Transfer:</span>
            <span className="font-bold text-2xl text-green-800">{amount.toFixed(2)} MAD</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Confirm Your Payment</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
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
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Enter your email or phone number"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg shadow-md"
          >
            ✓ Confirm Payment Sent
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankTransferPayment;