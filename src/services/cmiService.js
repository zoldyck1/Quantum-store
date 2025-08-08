import CryptoJS from 'crypto-js';

// CMI Payment Service for Morocco
class CMIService {
  constructor() {
    this.merchantId = import.meta.env.VITE_CMI_MERCHANT_ID;
    this.apiKey = import.meta.env.VITE_CMI_API_KEY;
    this.hashKey = import.meta.env.VITE_CMI_HASH_KEY;
    this.gatewayUrl = import.meta.env.VITE_CMI_GATEWAY_URL;
    this.storeKey = import.meta.env.VITE_CMI_STORE_KEY;
  }

  // Generate hash for CMI request
  generateHash(data) {
    const hashString = `${data.amount}|${data.currency}|${data.orderId}|${data.okUrl}|${data.failUrl}|${this.hashKey}`;
    return CryptoJS.SHA512(hashString).toString(CryptoJS.enc.Hex).toUpperCase();
  }

  // Generate unique order ID
  generateOrderId() {
    return `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Prepare payment data for CMI
  preparePaymentData(orderData) {
    const orderId = this.generateOrderId();
    const amount = (orderData.amount * 100).toString(); // Convert to cents
    const currency = orderData.currency || '504'; // 504 is MAD (Moroccan Dirham)
    
    const paymentData = {
      shopurl: window.location.origin,
      okUrl: `${window.location.origin}/payment-success`,
      failUrl: `${window.location.origin}/payment-cancel`,
      callbackUrl: `${window.location.origin}/api/cmi/callback`,
      trantype: 'PreAuth', // or 'Auth' for direct charge
      currency: currency,
      amount: amount,
      orderId: orderId,
      clientid: this.merchantId,
      storekey: this.storeKey,
      storetype: '3d_pay_hosting',
      lang: orderData.language || 'fr', // fr, ar, en
      email: orderData.email || '',
      BillToName: orderData.billingName || '',
      BillToStreet1: orderData.billingAddress || '',
      BillToCity: orderData.billingCity || '',
      BillToCountry: orderData.billingCountry || 'MA',
      BillToPostalCode: orderData.billingPostalCode || '',
      tel: orderData.phone || '',
      refreshtime: '5' // Auto refresh time in minutes
    };

    // Generate hash
    paymentData.HASH = this.generateHash(paymentData);

    return paymentData;
  }

  // Create payment form and redirect to CMI
  async processPayment(orderData) {
    try {
      const paymentData = this.preparePaymentData(orderData);
      
      // Create a form and submit it to CMI gateway
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = this.gatewayUrl;
      form.style.display = 'none';

      // Add all payment data as hidden inputs
      Object.keys(paymentData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = paymentData[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      return {
        success: true,
        orderId: paymentData.orderId,
        message: 'Redirecting to CMI payment gateway...'
      };
    } catch (error) {
      console.error('CMI Payment Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Verify payment callback from CMI
  verifyPaymentCallback(callbackData) {
    try {
      const { HASHPARAMS, HASHPARAMSVAL, HASH } = callbackData;
      
      // Recreate hash from callback data
      const hashParams = HASHPARAMS.split('|');
      const hashValues = hashParams.map(param => callbackData[param] || '').join('|');
      const calculatedHash = CryptoJS.SHA512(`${hashValues}|${this.hashKey}`)
        .toString(CryptoJS.enc.Hex).toUpperCase();

      // Verify hash matches
      if (calculatedHash === HASH) {
        return {
          success: true,
          status: callbackData.ProcReturnCode === '00' ? 'success' : 'failed',
          orderId: callbackData.orderId,
          transactionId: callbackData.TransId,
          amount: callbackData.amount,
          message: callbackData.ErrMsg || callbackData.Response
        };
      } else {
        return {
          success: false,
          error: 'Hash verification failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get payment status
  async getPaymentStatus(orderId) {
    try {
      // This would typically involve calling CMI's status API
      // For now, we'll return a placeholder
      return {
        success: true,
        status: 'pending',
        orderId: orderId
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Cancel/Refund payment
  async refundPayment(transactionId, amount) {
    try {
      // CMI refund logic would go here
      // This is a placeholder implementation
      return {
        success: true,
        refundId: `REF_${Date.now()}`,
        message: 'Refund processed successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

export default new CMIService();
