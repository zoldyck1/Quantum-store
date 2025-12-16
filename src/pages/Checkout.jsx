import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPaymentMethod } from '../payments/paymentSlice';
import CMIPayment from '../components/CMIPayment';
import PayPalPayment from '../components/PayPalPayment';
import BankTransferPayment from '../components/BankTransferPayment';
import USDTPayment from '../components/USDTPayment';
import { CreditCard, Smartphone, DollarSign, ArrowLeft, Banknote, Wallet } from 'lucide-react';
import { PayPalIcon, CryptoIcon, BankIcon } from '../components/icons/PaymentIcons';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cart);
  const { selectedMethod } = useSelector(state => state.payment);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 50, // 50 MAD shipping
    tax: 0,
    total: 0
  });

  // Calculate order totals
  useEffect(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.2; // 20% VAT in Morocco
    const total = subtotal + orderSummary.shipping + tax;
    
    setOrderSummary({
      ...orderSummary,
      subtotal,
      tax,
      total
    });
  }, [items]);

  const paymentMethods = [
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay securely with PayPal',
      icon: PayPalIcon,
      popular: true
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      description: 'Transfer money via your banking app',
      icon: BankIcon
    },
    {
      id: 'usdt',
      name: 'USDT Wallet',
      description: 'Pay with USDT cryptocurrency',
      icon: CryptoIcon
    }
  ];

  const handlePaymentMethodChange = (methodId) => {
    dispatch(setPaymentMethod(methodId));
  };

  const handlePaymentInitiated = (paymentResult) => {
    console.log('Payment initiated:', paymentResult);
    // Handle successful payment initiation
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Panier Vide</h1>
          <p className="text-lg text-gray-600">Votre panier est vide. Ajoutez des produits pour continuer.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </button>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Finaliser la Commande</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Résumé de la commande</h2>
            
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                  </div>
                  <span>{(item.price * item.quantity).toFixed(2)} MAD</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sous-total</span>
                <span>{orderSummary.subtotal.toFixed(2)} MAD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Livraison</span>
                <span>{orderSummary.shipping.toFixed(2)} MAD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>TVA (20%)</span>
                <span>{orderSummary.tax.toFixed(2)} MAD</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between text-base font-medium">
                  <span>Total</span>
                  <span>{orderSummary.total.toFixed(2)} MAD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-10 lg:mt-0 lg:col-span-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Méthode de paiement</h2>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div key={method.id} className="relative">
                      <input
                        type="radio"
                        id={method.id}
                        name="payment-method"
                        value={method.id}
                        checked={selectedMethod === method.id}
                        onChange={() => handlePaymentMethodChange(method.id)}
                        className="sr-only"
                      />
                      <label
                        htmlFor={method.id}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <IconComponent className="w-6 h-6 text-gray-400 mr-3" />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">
                              {method.name}
                            </span>
                            {method.popular && (
                              <span className="ml-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                Recommandé
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                        <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                          selectedMethod === method.id
                            ? 'border-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedMethod === method.id && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Form */}
            <div className="border-t border-gray-200 pt-6">
              {selectedMethod === 'paypal' && (
                <PayPalPayment
                  amount={orderSummary.total}
                  onSuccess={handlePaymentInitiated}
                  onError={(error) => console.error('PayPal error:', error)}
                />
              )}
              
              {selectedMethod === 'bank-transfer' && (
                <BankTransferPayment
                  amount={orderSummary.total}
                  onConfirm={handlePaymentInitiated}
                />
              )}
              
              {selectedMethod === 'usdt' && (
                <USDTPayment
                  amount={orderSummary.total}
                  onConfirm={handlePaymentInitiated}
                />
              )}
              

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
