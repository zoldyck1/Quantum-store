import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { orderService } from '../../services/orderService'

// Async thunks
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const { data, error } = await orderService.createOrder(orderData)
      if (error) throw error
      return data[0]
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await orderService.getUserOrders(userId)
      if (error) throw error
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await orderService.getAllOrders()
      if (error) throw error
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data, error } = await orderService.updateOrderStatus(id, status)
      if (error) throw error
      return data[0]
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  orders: [],
  userOrders: [],
  currentOrder: null,
  loading: false,
  error: null
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.currentOrder = action.payload
        state.userOrders.unshift(action.payload)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch User Orders
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload
      })
      // Fetch All Orders
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload
      })
      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.id === action.payload.id)
        if (index !== -1) {
          state.orders[index] = action.payload
        }
      })
  }
})

export const { setCurrentOrder, clearCurrentOrder, clearError } = orderSlice.actions
export default orderSlice.reducer