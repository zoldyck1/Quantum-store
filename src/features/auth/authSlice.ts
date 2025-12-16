import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authService } from '../../services/authService'

interface AuthState {
    user: any;
    profile: any;
    session: any;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

// Async thunks
export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({ email, password, userData }: any, { rejectWithValue }) => {
        try {
            const { data, error } = await authService.signUp(email, password, userData)
            if (error) throw error
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }: any, { rejectWithValue }) => {
        try {
            const { data, error } = await authService.signIn(email, password)
            if (error) throw error
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const signOut = createAsyncThunk(
    'auth/signOut',
    async (_, { rejectWithValue }) => {
        try {
            const { error } = await authService.signOut()
            if (error) throw error
            return true
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (email: string, { rejectWithValue }) => {
        try {
            const { data, error } = await authService.resetPassword(email)
            if (error) throw error
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState: AuthState = {
    user: null,
    profile: null,
    session: null,
    loading: false,
    error: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<any>) => {
            state.user = action.payload.user
            state.profile = action.payload.profile
            state.session = action.payload.session
            state.isAuthenticated = !!action.payload.user
        },
        clearAuth: (state) => {
            state.user = null
            state.profile = null
            state.session = null
            state.isAuthenticated = false
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Sign Up
            .addCase(signUp.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.user = action.payload.user
                state.profile = action.payload.profile
                state.session = action.payload.session
                state.isAuthenticated = !!action.payload.user
            })
            .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            // Sign In
            .addCase(signIn.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.user = action.payload.user
                state.profile = action.payload.profile
                state.session = action.payload.session
                state.isAuthenticated = !!action.payload.user
            })
            .addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            // Sign Out
            .addCase(signOut.fulfilled, (state) => {
                state.user = null
                state.profile = null
                state.session = null
                state.isAuthenticated = false
                state.loading = false
            })
            // Reset Password
            .addCase(resetPassword.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(resetPassword.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { setAuth, clearAuth, clearError } = authSlice.actions
export default authSlice.reducer
