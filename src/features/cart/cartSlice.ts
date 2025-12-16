import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
    id: string | number;
    name: string;
    price: number;
    image_url?: string;
    quantity: number;
    [key: string]: any;
}

interface CartState {
    items: CartItem[];
    total: number;
    itemCount: number;
    isOpen: boolean;
}

const initialState: CartState = {
    items: [],
    total: 0,
    itemCount: 0,
    isOpen: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id)

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                })
            }

            state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0)
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
        },

        removeFromCart: (state, action: PayloadAction<string | number>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
            state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0)
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
        },

        updateQuantity: (state, action: PayloadAction<{ id: string | number; quantity: number }>) => {
            const { id, quantity } = action.payload
            const item = state.items.find(item => item.id === id)

            if (item) {
                item.quantity = Math.max(1, quantity)
            }

            state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0)
            state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
        },

        clearCart: (state) => {
            state.items = []
            state.total = 0
            state.itemCount = 0
        },

        toggleCart: (state) => {
            state.isOpen = !state.isOpen
        },

        closeCart: (state) => {
            state.isOpen = false
        }
    }
})

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart
} = cartSlice.actions

export default cartSlice.reducer
