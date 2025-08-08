// CMI Callback Handler Utility
// This would typically be implemented on your backend server

import cmiService from '../services/cmiService';

/**
 * Handle CMI payment callback
 * This function should be implemented on your backend server
 * @param {Object} callbackData - Data received from CMI callback
 * @returns {Object} - Verification result
 */
export const handleCMICallback = (callbackData) => {
  try {
    // Verify the callback data using CMI service
    const verificationResult = cmiService.verifyPaymentCallback(callbackData);
    
    if (verificationResult.success) {
      // Payment was successful and verified
      if (verificationResult.status === 'success') {
        // Update order status in database
        // Send confirmation email
        // Clear cart
        // Redirect user to success page
        
        return {
          success: true,
          status: 'payment_successful',
          orderId: verificationResult.orderId,
          transactionId: verificationResult.transactionId,
          message: 'Payment completed successfully'
        };
      } else {
        // Payment failed but callback is valid
        return {
          success: false,
          status: 'payment_failed',
          orderId: verificationResult.orderId,
          message: verificationResult.message || 'Payment failed'
        };
      }
    } else {
      // Invalid callback - possible fraud attempt
      console.error('Invalid CMI callback:', verificationResult.error);
      return {
        success: false,
        status: 'invalid_callback',
        error: 'Invalid payment callback'
      };
    }
  } catch (error) {
    console.error('CMI callback processing error:', error);
    return {
      success: false,
      status: 'processing_error',
      error: error.message
    };
  }
};

/**
 * Example Express.js route for handling CMI callback
 * This should be implemented on your backend server
 */
export const expressRouteExample = `
// Backend Express.js route example
app.post('/api/cmi/callback', express.urlencoded({ extended: true }), (req, res) => {
  const callbackData = req.body;
  
  const result = handleCMICallback(callbackData);
  
  if (result.success) {
    // Redirect user to success page
    res.redirect('/payment-success?orderId=' + result.orderId);
  } else {
    // Redirect user to failure page
    res.redirect('/payment-cancel?error=' + encodeURIComponent(result.error));
  }
});
`;

/**
 * Frontend function to handle return from CMI
 * This can be used on payment success/cancel pages
 */
export const handleCMIReturn = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('orderId');
  const error = urlParams.get('error');
  
  if (orderId) {
    // Payment successful
    return {
      success: true,
      orderId: orderId,
      message: 'Payment completed successfully'
    };
  } else if (error) {
    // Payment failed
    return {
      success: false,
      error: decodeURIComponent(error),
      message: 'Payment failed'
    };
  }
  
  return null;
};

// Example usage in payment success page
export const paymentSuccessPageExample = `
// In PaymentSuccess.jsx
import { handleCMIReturn } from '../utils/cmiCallback';

const PaymentSuccess = () => {
  const [paymentResult, setPaymentResult] = useState(null);
  
  useEffect(() => {
    const result = handleCMIReturn();
    if (result) {
      setPaymentResult(result);
    }
  }, []);
  
  if (paymentResult?.success) {
    return (
      <div className="text-center">
        <h1>Payment Successful!</h1>
        <p>Order ID: {paymentResult.orderId}</p>
      </div>
    );
  }
  
  // ... rest of component
};
`;
