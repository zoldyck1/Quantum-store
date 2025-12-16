import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processCMIPayment } from '../payments/paymentSlice';
import { CreditCard, Lock, Globe } from 'lucide-react';
import { AppDispatch, RootState } from '../store';

interface OrderData {
    amount: number;
    [key: string]: any;
}

interface CMIPaymentProps {
    orderData: OrderData;
    onPaymentInitiated: (payload: any) => void;
}

const CMIPayment: React.FC<CMIPaymentProps> = ({ orderData, onPaymentInitiated }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.payment);
    const [billingInfo, setBillingInfo] = useState({
        billingName: '',
        billingAddress: '',
        billingCity: '',
        billingPostalCode: '',
        phone: '',
        email: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBillingInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();

        const paymentData = {
            ...orderData,
            ...billingInfo,
            billingCountry: 'MA', // Morocco
            language: 'fr' // French, can be changed to 'ar' for Arabic or 'en' for English
        };

        try {
            const result = await dispatch(processCMIPayment(paymentData));
            if (result.type === 'payment/processCMIPayment/fulfilled') {
                onPaymentInitiated && onPaymentInitiated(result.payload);
            }
        } catch (error) {
            console.error('CMI Payment Error:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
                <CreditCard className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                    Paiement CMI - Carte Bancaire Marocaine
                </h3>
            </div>

            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center">
                    <Lock className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm text-blue-800">
                        Paiement sécurisé via le Centre Monétique Interbancaire (CMI)
                    </span>
                </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="billingName" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom complet *
                        </label>
                        <input
                            type="text"
                            id="billingName"
                            name="billingName"
                            value={billingInfo.billingName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nom et prénom"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={billingInfo.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="votre@email.com"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse *
                    </label>
                    <input
                        type="text"
                        id="billingAddress"
                        name="billingAddress"
                        value={billingInfo.billingAddress}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Adresse complète"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700 mb-1">
                            Ville *
                        </label>
                        <input
                            type="text"
                            id="billingCity"
                            name="billingCity"
                            value={billingInfo.billingCity}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ville"
                        />
                    </div>

                    <div>
                        <label htmlFor="billingPostalCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Code postal
                        </label>
                        <input
                            type="text"
                            id="billingPostalCode"
                            name="billingPostalCode"
                            value={billingInfo.billingPostalCode}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Code postal"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={billingInfo.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+212 6XX XXXXXX"
                    />
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md text-base font-medium text-white ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                            } transition duration-150 ease-in-out`}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Redirection en cours...
                            </>
                        ) : (
                            <>
                                <Globe className="w-5 h-5 mr-2" />
                                Payer avec CMI ({orderData?.amount} MAD)
                            </>
                        )}
                    </button>
                </div>

                <div className="text-xs text-gray-500 text-center mt-4">
                    <p>En cliquant sur "Payer", vous serez redirigé vers la plateforme sécurisée CMI</p>
                    <p>Cartes acceptées: Visa, MasterCard, cartes bancaires marocaines</p>
                </div>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <Lock className="w-4 h-4 mr-1" />
                        <span>SSL sécurisé</span>
                    </div>
                    <div className="flex items-center">
                        <img
                            src="/cmi-logo.png"
                            alt="CMI"
                            className="h-6 w-auto"
                            onError={(e: any) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <span className="ml-1">CMI Certifié</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CMIPayment;
