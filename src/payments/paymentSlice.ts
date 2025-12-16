import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import cmiService from '../services/cmiService'

// Async thunks for different payment methods
export const processStripePayment = createAsyncThunk(
    'payment/processStripePayment',
    async (paymentData: any, { rejectWithValue }) => {
        try {
            // Stripe payment processing will be implemented here
            const response = await fetch('/api/stripe/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData)
            })
            const data = await response.json()
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const processCIHPayment = createAsyncThunk(
    'payment/processCIHPayment',
    async (paymentData: any, { rejectWithValue }) => {
        try {
            // CIH payment processing will be implemented here
            const response = await fetch('/api/cih/process-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData)
            })
            const data = await response.json()
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const processCMIPayment = createAsyncThunk(
    'payment/processCMIPayment',
    async (paymentData: any, { rejectWithValue }) => {
        try {
            // CMI payment processing using our service
            const result = await cmiService.processPayment(paymentData)
            if (result.success) {
                return result
            } else {
                return rejectWithValue(result.error)
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const processPayPalPayment = createAsyncThunk(
    'payment/processPayPalPayment',
    async (paymentData: any, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/paypal/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData)
            })
            const data = await response.json()
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const processBankTransferPayment = createAsyncThunk(
    'payment/processBankTransferPayment',
    async (paymentData: any, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/bank-transfer/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData)
            })
            const data = await response.json()
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const processUSDTPayment = createAsyncThunk(
    'payment/processUSDTPayment',
    async (paymentData: any, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/usdt/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData)
            })
            const data = await response.json()
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

interface PaymentState {
    selectedMethod: string;
    paymentIntent: any;
    paymentStatus: 'idle' | 'processing' | 'succeeded' | 'failed';
    loading: boolean;
    error: string | null;
}

const initialState: PaymentState = {
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
        setPaymentMethod: (state, action: PayloadAction<string>) => {
            state.selectedMethod = action.payload
        },
        clearPaymentIntent: (state) => {
            state.paymentIntent = null
        },
        setPaymentStatus: (state, action: PayloadAction<'idle' | 'processing' | 'succeeded' | 'failed'>) => {
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
            .addCase(processStripePayment.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.paymentIntent = action.payload
                state.paymentStatus = 'succeeded'
            })
            .addCase(processStripePayment.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
                state.paymentStatus = 'failed'
            })
            // CIH Payment
            .addCase(processCIHPayment.pending, (state) => {
                state.loading = true
                state.paymentStatus = 'processing'
            })
            .addCase(processCIHPayment.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.paymentIntent = action.payload
                state.paymentStatus = 'succeeded'
            })
            .addCase(processCIHPayment.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
                state.paymentStatus = 'failed'
            })
            // CMI Payment
            .addCase(processCMIPayment.pending, (state) => {
                state.loading = true
                state.paymentStatus = 'processing'
            })
            .addCase(processCMIPayment.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.paymentIntent = action.payload
                state.paymentStatus = 'succeeded'
            })
            .addCase(processCMIPayment.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
                state.paymentStatus = 'failed'
            })
            // PayPal Payment
            .addCase(processPayPalPayment.pending, (state) => {
                state.loading = true
                state.paymentStatus = 'processing'
            })
            .addCase(processPayPalPayment.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.paymentIntent = action.payload
                state.paymentStatus = 'succeeded'
            })
            .addCase(processPayPalPayment.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
                state.paymentStatus = 'failed'
            })
            // Bank Transfer Payment
            .addCase(processBankTransferPayment.pending, (state) => {
                state.loading = true
                state.paymentStatus = 'processing'
            })
            .addCase(processBankTransferPayment.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.paymentIntent = action.payload
                state.paymentStatus = 'succeeded'
            })
            .addCase(processBankTransferPayment.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
                state.paymentStatus = 'failed'
            })
            // USDT Payment
            .addCase(processUSDTPayment.pending, (state) => {
                state.loading = true
                state.paymentStatus = 'processing'
            })
            .addCase(processUSDTPayment.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.paymentIntent = action.payload
                state.paymentStatus = 'succeeded'
            })
            .addCase(processUSDTPayment.rejected, (state, action: PayloadAction<any>) => {
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
