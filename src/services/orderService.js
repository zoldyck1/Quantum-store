import { supabase } from './supabaseClient'

export const orderService = {
  createOrder: async (orderData) => {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
    return { data, error }
  },

  getUserOrders: async (userId) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          product:products(title, thumbnail_url, price)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  getAllOrders: async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        user:profiles(full_name, email),
        order_items(
          *,
          product:products(title, thumbnail_url)
        )
      `)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  updateOrderStatus: async (id, status) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    return { data, error }
  },

  getOrderAnalytics: async () => {
    const { data, error } = await supabase
      .rpc('get_order_analytics')
    return { data, error }
  }
}