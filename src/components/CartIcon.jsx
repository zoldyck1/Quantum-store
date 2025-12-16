import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart } from 'lucide-react'
import { toggleCart } from '../features/cart/cartSlice'

const CartIcon = () => {
  const dispatch = useDispatch()
  const { itemCount } = useSelector(state => state.cart)

  return (
    <button
      onClick={() => dispatch(toggleCart())}
      className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  )
}

export default CartIcon