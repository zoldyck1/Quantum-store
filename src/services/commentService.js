import { supabase } from './supabaseClient'

export const commentService = {
  getProductComments: async (productId) => {
    const { data, error } = await supabase
      .from('product_comments')
      .select(`
        *,
        user:profiles(full_name, avatar_url)
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
    return { data, error }
  },

  addComment: async (productId, content, userId) => {
    const { data, error } = await supabase
      .from('product_comments')
      .insert([{
        product_id: productId,
        content,
        user_id: userId
      }])
      .select()
    return { data, error }
  },

  deleteComment: async (id) => {
    const { data, error } = await supabase
      .from('product_comments')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  toggleLike: async (productId, userId) => {
    // Check if like exists
    const { data: existingLike } = await supabase
      .from('product_likes')
      .select('id')
      .eq('product_id', productId)
      .eq('user_id', userId)
      .single()

    if (existingLike) {
      // Unlike
      const { error } = await supabase
        .from('product_likes')
        .delete()
        .eq('product_id', productId)
        .eq('user_id', userId)
      return { liked: false, error }
    } else {
      // Like
      const { error } = await supabase
        .from('product_likes')
        .insert([{
          product_id: productId,
          user_id: userId
        }])
      return { liked: true, error }
    }
  },

  getUserLikes: async (userId) => {
    const { data, error } = await supabase
      .from('product_likes')
      .select('product_id')
      .eq('user_id', userId)
    return { data, error }
  }
}