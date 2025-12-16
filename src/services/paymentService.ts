import { supabase } from './supabaseClient';

export interface PaymentConfirmation {
  orderId: string;
  paymentMethod: 'paypal' | 'bank-transfer' | 'usdt';
  amount: number;
  customerName: string;
  customerContact: string;
  transactionId?: string;
}

export const confirmPayment = async (data: PaymentConfirmation) => {
  try {
    const { data: result, error } = await supabase
      .from('payment_confirmations')
      .insert([{
        order_id: data.orderId,
        payment_method: data.paymentMethod,
        amount: data.amount,
        customer_name: data.customerName,
        customer_contact: data.customerContact,
        transaction_id: data.transactionId,
        status: 'pending',
        created_at: new Date().toISOString()
      }]);

    if (error) throw error;
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};