import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { productService } from '../../services/productService'

// Async thunks
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const { data, error } = await productService.getAllProducts()
            if (error) throw error
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id: string | number, { rejectWithValue }) => {
        try {
            const { data, error } = await productService.getProductById(id)
            if (error) throw error
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData: any, { rejectWithValue }) => {
        try {
            const { data, error } = await productService.createProduct(productData)
            if (error) throw error
            return data[0]
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, productData }: { id: string | number; productData: any }, { rejectWithValue }) => {
        try {
            const { data, error } = await productService.updateProduct(id, productData)
            if (error) throw error
            return data[0]
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id: string | number, { rejectWithValue }) => {
        try {
            const { error } = await productService.deleteProduct(id)
            if (error) throw error
            return id
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

interface Product {
    id: string | number;
    name: string;
    price: number;
    category: string;
    image_url: string;
    description?: string;
    [key: string]: any;
}

interface ProductState {
    products: Product[];
    currentProduct: Product | null;
    categories: string[];
    selectedCategory: string;
    loading: boolean;
    error: string | null;
    searchQuery: string;
}

const initialState: ProductState = {
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
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
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
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            // Fetch Product by ID
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<any>) => {
                state.currentProduct = action.payload
            })
            // Create Product
            .addCase(createProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.products.unshift(action.payload)
            })
            // Update Product
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<any>) => {
                const index = state.products.findIndex(p => p.id === action.payload.id)
                if (index !== -1) {
                    state.products[index] = action.payload
                }
            })
            // Delete Product
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.products = state.products.filter(p => p.id !== action.payload)
            })
    }
})

export const { setSelectedCategory, setSearchQuery, clearCurrentProduct, clearError } = productSlice.actions
export default productSlice.reducer
