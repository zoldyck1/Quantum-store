import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cmiService from '../services/cmiService'

// Async thunks for different payment methods
export const processStripePayment = createAsyncThunk(
  'payment/processStripePayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      // Stripe payment processing will be implemented here
      const response = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      })
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const processCIHPayment = createAsyncThunk(
  'payment/processCIHPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      // CIH payment processing will be implemented here
      const response = await fetch('/api/cih/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      })
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const processCMIPayment = createAsyncThunk(
  'payment/processCMIPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      // CMI payment processing using our service
      const result = await cmiService.processPayment(paymentData)
      if (result.success) {
        return result
      } else {
        return rejectWithValue(result.error)
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const processCryptoPayment = createAsyncThunk(
  'payment/processCryptoPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      // Crypto payment processing will be implemented here
      const response = await fetch('/api/crypto/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      })
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  selectedMethod: 'stripe',
  paymentIntent: null,
  paymentStatus: 'idle', // idle, processing, succeeded, failed
  loading: false,
  error: null
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.selectedMethod = action.payload
    },
    clearPaymentIntent: (state) => {
      state.paymentIntent = null
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Stripe Payment
      .addCase(processStripePayment.pending, (state) => {
        state.loading = true
        state.paymentStatus = 'processing'
      })
      .addCase(processStripePayment.fulfilled, (state, action) => {
        state.loading = false
        state.paymentIntent = action.payload
        state.paymentStatus = 'succeeded'
      })
      .addCase(processStripePayment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.paymentStatus = 'failed'
      })
      // CIH Payment
      .addCase(processCIHPayment.pending, (state) => {
        state.loading = true
        state.paymentStatus = 'processing'
      })
      .addCase(processCIHPayment.fulfilled, (state, action) => {
        state.loading = false
        state.paymentIntent = action.payload
        state.paymentStatus = 'succeeded'
      })
      .addCase(processCIHPayment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.paymentStatus = 'failed'
      })
      // CMI Payment
      .addCase(processCMIPayment.pending, (state) => {
        state.loading = true
        state.paymentStatus = 'processing'
      })
      .addCase(processCMIPayment.fulfilled, (state, action) => {
        state.loading = false
        state.paymentIntent = action.payload
        state.paymentStatus = 'succeeded'
      })
      .addCase(processCMIPayment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.paymentStatus = 'failed'
      })
      // Crypto Payment
      .addCase(processCryptoPayment.pending, (state) => {
        state.loading = true
        state.paymentStatus = 'processing'
      })
      .addCase(processCryptoPayment.fulfilled, (state, action) => {
        state.loading = false
        state.paymentIntent = action.payload
        state.paymentStatus = 'succeeded'
      })
      .addCase(processCryptoPayment.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.paymentStatus = 'failed'
      })
  }
})

export const { 
  setPaymentMethod, 
  clearPaymentIntent, 
  setPaymentStatus, 
  clearError 
} = paymentSlice.actions

export default paymentSlice.reducer