import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { commentService } from '../../services/commentService'

// Async thunks
export const fetchProductComments = createAsyncThunk(
  'comments/fetchProductComments',
  async (productId, { rejectWithValue }) => {
    try {
      const { data, error } = await commentService.getProductComments(productId)
      if (error) throw error
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ productId, content, userId }, { rejectWithValue }) => {
    try {
      const { data, error } = await commentService.addComment(productId, content, userId)
      if (error) throw error
      return data[0]
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const toggleLike = createAsyncThunk(
  'comments/toggleLike',
  async ({ productId, userId }, { rejectWithValue }) => {
    try {
      const { liked, error } = await commentService.toggleLike(productId, userId)
      if (error) throw error
      return { productId, liked }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchUserLikes = createAsyncThunk(
  'comments/fetchUserLikes',
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await commentService.getUserLikes(userId)
      if (error) throw error
      return data.map(like => like.product_id)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
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
      .addCase(fetchProductComments.fulfilled, (state, action) => {
        state.loading = false
        state.comments = action.payload
      })
      .addCase(fetchProductComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload)
      })
      // Toggle Like
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { productId, liked } = action.payload
        if (liked) {
          state.userLikes.push(productId)
        } else {
          state.userLikes = state.userLikes.filter(id => id !== productId)
        }
      })
      // Fetch User Likes
      .addCase(fetchUserLikes.fulfilled, (state, action) => {
        state.userLikes = action.payload
      })
  }
})

export const { clearComments, clearError } = commentSlice.actions
export default commentSlice.reducer