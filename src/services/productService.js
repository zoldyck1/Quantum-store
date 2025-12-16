import insforgeClient from './insforgeClient'

export const productService = {
  // Test connection to Insforge
  testConnection: async () => {
    try {
      console.log('Testing Insforge connection...')
      const { data, error } = await insforgeClient.database
        .from('products')
        .select('count')
      
      if (error) {
        console.error('Insforge connection test failed:', error)
        return { success: false, error }
      }
      
      console.log('Insforge connection test successful:', data)
      return { success: true, data }
    } catch (err) {
      console.error('Exception in testConnection:', err)
      return { success: false, error: err }
    }
  },

  getAllProducts: async () => {
    try {
      console.log('Fetching products from Insforge...')
      const { data, error } = await insforgeClient.database
        .from('products')
        .select('*')
        .eq('is_active', true)
      
      if (error) {
        console.error('Error fetching products:', error)
        return { data: null, error }
      }
      
      console.log('Products fetched successfully:', data)
      return { data, error }
    } catch (err) {
      console.error('Exception in getAllProducts:', err)
      return { data: null, error: err }
    }
  },

  getProductById: async (id) => {
    const { data, error } = await insforgeClient.database
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    return { data, error }
  },

  getProductsByCategory: async (category) => {
    const { data, error } = await insforgeClient.database
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
    return { data, error }
  },

  createProduct: async (productData) => {
    const { data, error } = await insforgeClient.database
      .from('products')
      .insert([productData])
      .select()
      .single()
    return { data, error }
  },

  updateProduct: async (id, productData) => {
    const { data, error } = await insforgeClient.database
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single()
    return { data, error }
  },

  deleteProduct: async (id) => {
    const { data, error } = await insforgeClient.database
      .from('products')
      .delete()
      .eq('id', id)
    return { data, error }
  },

  uploadProductImage: async (file, fileName) => {
    const { data, error } = await insforgeClient.storage
      .from('product-images')
      .upload(fileName, file)
    return { data, error }
  },

  getImageUrl: (fileName) => {
    // Insforge returns the full URL in the upload response
    return fileName
  }
}