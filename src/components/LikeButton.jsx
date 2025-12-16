import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Heart } from 'lucide-react'
import { toggleLike } from '../features/comments/commentSlice'
import toast from 'react-hot-toast'

const LikeButton = ({ productId, isLiked, size = 'md' }) => {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector(state => state.auth)

  const handleToggleLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated) {
      toast.error('Please login to like products')
      return
    }

    try {
      await dispatch(toggleLike({ productId, userId: user.id })).unwrap()
      toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites')
    } catch (error) {
      toast.error('Failed to update like')
    }
  }

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  }

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }

  return (
    <button
      onClick={handleToggleLike}
      className={`
        ${sizeClasses[size]} 
        bg-white bg-opacity-90 backdrop-blur-sm rounded-full 
        flex items-center justify-center
        transition-all duration-200
        hover:bg-opacity-100 hover:scale-110
        ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}
      `}
    >
      <Heart 
        className={`${iconSizes[size]} ${isLiked ? 'fill-current' : ''}`} 
      />
    </button>
  )
}

export default LikeButton