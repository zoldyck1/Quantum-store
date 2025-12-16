import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Send, Trash2 } from 'lucide-react'
import { addComment } from '../features/comments/commentSlice'
import toast from 'react-hot-toast'
import { AppDispatch, RootState } from '../store'

interface CommentBoxProps {
    productId: string | number;
}

const CommentBox: React.FC<CommentBoxProps> = ({ productId }) => {
    const dispatch = useDispatch<AppDispatch>()
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!isAuthenticated) {
            toast.error('Please login to comment')
            return
        }

        if (!comment.trim()) {
            toast.error('Please enter a comment')
            return
        }

        setLoading(true)
        try {
            await dispatch(addComment({
                productId,
                content: comment.trim(),
                userId: user.id
            })).unwrap()
            setComment('')
            toast.success('Comment added successfully')
        } catch (error) {
            toast.error('Failed to add comment')
        } finally {
            setLoading(false)
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-gray-600">Please login to leave a comment</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
                <img
                    src={user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user.user_metadata?.full_name || 'User'}&background=3b82f6&color=fff`}
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="3"
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            type="submit"
                            disabled={loading || !comment.trim()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
                        >
                            <Send className="h-4 w-4" />
                            <span>{loading ? 'Posting...' : 'Post Comment'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default CommentBox
