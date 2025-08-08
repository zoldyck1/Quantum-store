import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productService } from '../../services/productService'

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await productService.getAllProducts()
      if (error) throw error
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const { data, error } = await productService.getProductById(id)
      if (error) throw error
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const { data, error } = await productService.createProduct(productData)
      if (error) throw error
      return data[0]
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const { data, error } = await productService.updateProduct(id, productData)
      if (error) throw error
      return data[0]
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const { error } = await productService.deleteProduct(id)
      if (error) throw error
      return id
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  products: [],
  currentProduct: null,
  categories: ['Electronics', 'Digital Art', 'Software', 'Templates', 'Music', 'Videos', 'Documents'],
  selectedCategory: 'all',
  loading: false,
  error: null,
  searchQuery: ''
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch Product by ID
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload
      })
      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload)
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id)
        if (index !== -1) {
          state.products[index] = action.payload
        }
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload)
      })
  }
})

export const { setSelectedCategory, setSearchQuery, clearCurrentProduct, clearError } = productSlice.actions
export default productSlice.reducer