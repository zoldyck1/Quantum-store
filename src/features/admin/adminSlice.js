import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../services/supabaseClient'

// Async thunks
export const fetchDashboardData = createAsyncThunk(
  'admin/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      // Fetch users count
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Fetch products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      // Fetch orders count
      const { count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

      // Fetch total revenue
      const { data: revenueData } = await supabase
        .from('orders')
        .select('total_amount')
        .eq('status', 'completed')

      const totalRevenue = revenueData?.reduce((sum, order) => sum + order.total_amount, 0) || 0

      // Fetch recent orders
      const { data: recentOrders } = await supabase
        .from('orders')
        .select(`
          *,
          user:profiles(full_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(10)

      // Fetch sales data for chart
      const { data: salesData } = await supabase
        .rpc('get_daily_sales', { days: 30 })

      return {
        usersCount,
        productsCount,
        ordersCount,
        totalRevenue,
        recentOrders,
        salesData
      }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
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
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false
        state.dashboardData = action.payload
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch All Users
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
  }
})

export const { clearError } = adminSlice.actions
export default adminSlice.reducer