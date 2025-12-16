import insforgeClient from './insforgeClient'

export const commentService = {
  getProductComments: async (productId) => {
    const { data, error } = await insforgeClient.database
      .from('comments')
      .select(`
        *,
        users!inner(nickname, avatar_url)
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  addComment: async (productId, content, userId) => {
    const { data, error } = await insforgeClient.database
      .from('comments')
      .insert([{
        product_id: productId,
        comment: content,
        user_id: userId
      }])
      .select()
      .single()
    return { data, error }
  },

  deleteComment: async (id) => {
    const { data, error } = await insforgeClient.database
      .from('comments')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  toggleLike: async (productId, userId) => {
    // For now, return a placeholder - we'll implement likes later
    return { liked: false, error: null }
  },

  getUserLikes: async (userId) => {
    // For now, return empty array - we'll implement likes later
    return { data: [], error: null }
  }
}