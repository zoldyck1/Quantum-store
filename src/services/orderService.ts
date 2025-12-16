import insforgeClient from './insforgeClient'

export const orderService = {
    createOrder: async (orderData: any) => {
        const { data, error } = await insforgeClient.database
            .from('orders')
            .insert([orderData])
            .select()
            .single()
        return { data, error }
    },

    getUserOrders: async (userId: string) => {
        const { data, error } = await insforgeClient.database
            .from('orders')
            .select(`
        *,
        order_items(
          *,
          products!inner(name, image_url, price)
        )
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
        return { data, error }
    },

    getAllOrders: async () => {
        const { data, error } = await insforgeClient.database
            .from('orders')
            .select(`
        *,
        users!inner(nickname, email),
        order_items(
          *,
          products!inner(name, image_url)
        )
      `)
            .order('created_at', { ascending: false })
        return { data, error }
    },

    updateOrderStatus: async (id: string | number, status: string) => {
        const { data, error } = await insforgeClient.database
            .from('orders')
            .update({ status, updated_at: new Date().toISOString() })
            .eq('id', id)
            .select()
            .single()
        return { data, error }
    },

    getOrderAnalytics: async () => {
        // For now, return empty analytics - we'll implement this later
        return { data: [], error: null }
    }
}
