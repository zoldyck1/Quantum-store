import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import productSlice from '../features/products/productSlice'
import cartSlice from '../features/cart/cartSlice'
import orderSlice from '../features/orders/orderSlice'
import commentSlice from '../features/comments/commentSlice'
import adminSlice from '../features/admin/adminSlice'
import paymentSlice from '../payments/paymentSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    cart: cartSlice,
    orders: orderSlice,
    comments: commentSlice,
    admin: adminSlice,
    payment: paymentSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
