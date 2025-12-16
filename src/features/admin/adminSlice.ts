import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import insforgeClient from '../../services/insforgeClient'

// Async thunks
export const fetchDashboardData = createAsyncThunk(
    'admin/fetchDashboardData',
    async (_, { rejectWithValue }) => {
        try {
            // Fetch users count
            const { data: users } = await insforgeClient.database
                .from('users')
                .select('id')

            // Fetch products count
            const { data: products } = await insforgeClient.database
                .from('products')
                .select('id')

            // Fetch orders count
            const { data: orders } = await insforgeClient.database
                .from('orders')
                .select('id')

            // Fetch total revenue
            const { data: revenueData } = await insforgeClient.database
                .from('orders')
                .select('total_amount')
                .eq('status', 'completed')

            // @ts-ignore
            const totalRevenue = revenueData?.reduce((sum: number, order: any) => sum + order.total_amount, 0) || 0

            // Fetch recent orders
            const { data: recentOrders } = await insforgeClient.database
                .from('orders')
                .select(`
          *,
          users!inner(nickname, email)
        `)
                .order('created_at', { ascending: false })
                .limit(10)

            // For now, return empty sales data - we'll implement this later
            const salesData: any[] = []

            return {
                usersCount: users?.length || 0,
                productsCount: products?.length || 0,
                ordersCount: orders?.length || 0,
                totalRevenue,
                recentOrders: recentOrders || [],
                salesData
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const { data, error } = await insforgeClient.database
                .from('users')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

interface DashboardData {
    usersCount: number;
    productsCount: number;
    ordersCount: number;
    totalRevenue: number;
    recentOrders: any[];
    salesData: any[];
}

interface AdminState {
    dashboardData: DashboardData;
    users: any[];
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    dashboardData: {
        usersCount: 0,
        productsCount: 0,
        ordersCount: 0,
        totalRevenue: 0,
        recentOrders: [],
        salesData: []
    },
    users: [],
    loading: false,
    error: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Dashboard Data
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDashboardData.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.dashboardData = action.payload
            })
            .addCase(fetchDashboardData.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            // Fetch All Users
            .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<any>) => {
                state.users = action.payload
            })
    }
})

export const { clearError } = adminSlice.actions
export default adminSlice.reducer
