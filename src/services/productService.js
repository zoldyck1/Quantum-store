import { supabase } from './supabaseClient'

export const productService = {
  getAllProducts: async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        likes:product_likes(count),
        comments:product_comments(count)
      `)
      .eq('active', true)
    return { data, error }
  },

  getProductById: async (id) => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        likes:product_likes(count),
        comments:product_comments(
          id,
          content,
          created_at,
          user:profiles(full_name, avatar_url)
        )
      `)
      .eq('id', id)
      .single()
    return { data, error }
  },

  getProductsByCategory: async (category) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('active', true)
    return { data, error }
  },

  createProduct: async (productData) => {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
    return { data, error }
  },

  updateProduct: async (id, productData) => {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
    return { data, error }
  },

  deleteProduct: async (id) => {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  uploadProductImage: async (file, fileName) => {
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file)
    return { data, error }
  },

  getImageUrl: (fileName) => {
    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)
    return data.publicUrl
  }
}