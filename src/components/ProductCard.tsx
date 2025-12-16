import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Heart, ShoppingCart, Eye, Download, Lock } from 'lucide-react'
import { addToCart } from '../features/cart/cartSlice'
import LikeButton from './LikeButton'
import { AppDispatch, RootState } from '../store'

interface Product {
    id: string | number;
    title?: string;
    name?: string;
    price: number;
    original_price?: number;
    thumbnail_url?: string;
    imageUrl?: string;
    description?: string;
    category?: string;
    downloads?: number;
    likes?: { count: number }[];
    created_at?: string;
    createdAt?: string;
    [key: string]: any;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
    const { userLikes } = useSelector((state: RootState) => state.comments)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        if (!isAuthenticated) {
            navigate('/login')
            return
        }
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail_url: product.thumbnail_url
        }))
    }

    const isLiked = userLikes.includes(product.id)
    const likesCount = (product.likes && product.likes.length > 0) ? product.likes[0].count : 0;

    return (
        <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-700">
            <div className="relative">
                <Link to={`/products/${product.id}`}>
                    <img
                        src={product.thumbnail_url || product.imageUrl || 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg'}
                        alt={product.title || product.name || 'Product'}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>
                <div className="absolute top-3 right-3">
                    <LikeButton
                        productId={product.id}
                        isLiked={isLiked}
                        size="sm"
                    />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Link
                        to={`/products/${product.id}`}
                        className="bg-gray-700 text-gray-100 px-4 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center space-x-2 hover:bg-gray-600"
                    >
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                    </Link>
                </div>
            </div>

            <div className="p-4">
                <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-blue-600 text-blue-100 text-xs font-medium rounded-full">
                        {product.category || 'Digital'}
                    </span>
                </div>

                <Link to={`/products/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-100 mb-2 hover:text-blue-400 transition-colors line-clamp-2">
                        {product.title || product.name}
                    </h3>
                </Link>

                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {product.description || 'Digital product description'}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-end space-x-1">
                        <span className="text-2xl font-bold text-gray-100">
                            ${product.price}
                        </span>
                        {product.original_price && product.original_price > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                                ${product.original_price}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className={`${isAuthenticated
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-600 hover:bg-gray-700'
                            } text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2`}
                    >
                        {isAuthenticated ? (
                            <>
                                <ShoppingCart className="h-4 w-4" />
                                <span>Add to Cart</span>
                            </>
                        ) : (
                            <>
                                <Lock className="h-4 w-4" />
                                <span>Login to Buy</span>
                            </>
                        )}
                    </button>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-600">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{likesCount}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <Download className="h-4 w-4" />
                            <span>{product.downloads || 0}</span>
                        </span>
                    </div>
                    <div className="text-xs text-gray-500">
                        Added {new Date(product.created_at || product.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
