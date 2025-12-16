import React from 'react';

interface PayPalPaymentProps {
  amount: number;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

const PayPalPayment: React.FC<PayPalPaymentProps> = ({ amount, onSuccess, onError }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const checkPayPal = () => {
      if (window.paypal) {
        setIsLoaded(true);
        window.paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount.toFixed(2)
                }
              }]
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              onSuccess(details);
            });
          },
          onError: (err: any) => {
            onError(err);
          }
        }).render('#paypal-button-container');
      } else {
        setTimeout(checkPayPal, 100);
      }
    };
    checkPayPal();
  }, [amount]);

  return (
    <div className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
      <div className="text-center">
        <h3 className="text-xl font-bold text-blue-900 mb-2">PayPal Payment</h3>
        <p className="text-blue-700">Secure payment with PayPal</p>
        <div className="mt-3 p-3 bg-white rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600">Amount to pay:</p>
          <p className="text-2xl font-bold text-blue-900">${amount.toFixed(2)} USD</p>
        </div>
      </div>
      <div id="paypal-button-container" className="min-h-[50px]">
        {!isLoaded && (
          <div className="flex justify-center items-center h-12">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-blue-700">Loading PayPal...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayPalPayment;