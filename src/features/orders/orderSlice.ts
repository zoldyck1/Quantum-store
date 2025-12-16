import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { orderService } from '../../services/orderService'

// Async thunks
export const createOrder = createAsyncThunk(
    'orders/createOrder',
    async (orderData: any, { rejectWithValue }) => {
        try {
            const { data, error } = await orderService.createOrder(orderData)
            if (error) throw error
            return data[0]
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchUserOrders = createAsyncThunk(
    'orders/fetchUserOrders',
    async (userId: string, { rejectWithValue }) => {
        try {
            const { data, error } = await orderService.getUserOrders(userId)
            if (error) throw error
            return data
        } catch (error: any) {
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
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateOrderStatus = createAsyncThunk(
    'orders/updateOrderStatus',
    async ({ id, status }: { id: string | number; status: string }, { rejectWithValue }) => {
        try {
            const { data, error } = await orderService.updateOrderStatus(id, status)
            if (error) throw error
            return data[0]
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

interface Order {
    id: string | number;
    user_id: string;
    total_amount: number;
    status: string;
    items?: any[];
    [key: string]: any;
}

interface OrderState {
    orders: Order[];
    userOrders: Order[];
    currentOrder: Order | null;
    loading: boolean;
    error: string | null;
}

const initialState: OrderState = {
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
        setCurrentOrder: (state, action: PayloadAction<any>) => {
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
            .addCase(createOrder.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.currentOrder = action.payload
                state.userOrders.unshift(action.payload)
            })
            .addCase(createOrder.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            // Fetch User Orders
            .addCase(fetchUserOrders.fulfilled, (state, action: PayloadAction<any>) => {
                state.userOrders = action.payload
            })
            // Fetch All Orders
            .addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<any>) => {
                state.orders = action.payload
            })
            // Update Order Status
            .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<any>) => {
                const index = state.orders.findIndex(order => order.id === action.payload.id)
                if (index !== -1) {
                    state.orders[index] = action.payload
                }
            })
    }
})

export const { setCurrentOrder, clearCurrentOrder, clearError } = orderSlice.actions
export default orderSlice.reducer
