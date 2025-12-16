import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { commentService } from '../../services/commentService'

// Async thunks
export const fetchProductComments = createAsyncThunk(
    'comments/fetchProductComments',
    async (productId: string | number, { rejectWithValue }) => {
        try {
            const { data, error } = await commentService.getProductComments(productId)
            if (error) throw error
            return data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ productId, content, userId }: { productId: string | number; content: string; userId: string }, { rejectWithValue }) => {
        try {
            const { data, error } = await commentService.addComment(productId, content, userId)
            if (error) throw error
            return data[0]
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleLike = createAsyncThunk(
    'comments/toggleLike',
    async ({ productId, userId }: { productId: string | number; userId: string }, { rejectWithValue }) => {
        try {
            const { liked, error } = await commentService.toggleLike(productId, userId)
            if (error) throw error
            return { productId, liked }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchUserLikes = createAsyncThunk(
    'comments/fetchUserLikes',
    async (userId: string, { rejectWithValue }) => {
        try {
            const { data, error } = await commentService.getUserLikes(userId)
            if (error) throw error
            // @ts-ignore
            return data.map((like: any) => like.product_id)
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

interface Comment {
    id: string | number;
    product_id: string | number;
    user_id: string;
    comment: string;
    created_at: string;
    users?: { nickname: string; avatar_url: string };
    [key: string]: any;
}

interface CommentState {
    comments: Comment[];
    userLikes: (string | number)[];
    loading: boolean;
    error: string | null;
}

const initialState: CommentState = {
    comments: [],
    userLikes: [],
    loading: false,
    error: null
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        clearComments: (state) => {
            state.comments = []
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Product Comments
            .addCase(fetchProductComments.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProductComments.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.comments = action.payload
            })
            .addCase(fetchProductComments.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false
                state.error = action.payload
            })
            // Add Comment
            .addCase(addComment.fulfilled, (state, action: PayloadAction<any>) => {
                state.comments.unshift(action.payload)
            })
            // Toggle Like
            .addCase(toggleLike.fulfilled, (state, action: PayloadAction<any>) => {
                const { productId, liked } = action.payload
                if (liked) {
                    state.userLikes.push(productId)
                } else {
                    state.userLikes = state.userLikes.filter(id => id !== productId)
                }
            })
            // Fetch User Likes
            .addCase(fetchUserLikes.fulfilled, (state, action: PayloadAction<any>) => {
                state.userLikes = action.payload
            })
    }
})

export const { clearComments, clearError } = commentSlice.actions
export default commentSlice.reducer
