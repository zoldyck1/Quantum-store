import insforgeClient from './insforgeClient'

export const commentService = {
    getProductComments: async (productId: string | number) => {
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

    addComment: async (productId: string | number, content: string, userId: string) => {
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

    deleteComment: async (id: string | number) => {
        const { data, error } = await insforgeClient.database
            .from('comments')
            .delete()
            .eq('id', id)
        return { data, error }
    },

    toggleLike: async (productId: string | number, userId: string) => {
        // For now, return a placeholder - we'll implement likes later
        return { liked: false, error: null }
    },

    getUserLikes: async (userId: string) => {
        // For now, return empty array - we'll implement likes later
        return { data: [], error: null }
    }
}
