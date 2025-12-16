import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Grid, List, ArrowLeft } from 'lucide-react'
import { fetchProducts, setSelectedCategory, setSearchQuery } from '../features/products/productSlice'
import { productService } from '../services/productService'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products, categories, selectedCategory, searchQuery, loading, error } = useSelector(state => state.products)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    console.log('Products component mounted, fetching products...')
    dispatch(fetchProducts())
    
    // Test Insforge connection
    const testConnection = async () => {
      try {
        console.log('Testing Insforge connection...')
        const result = await productService.testConnection()
        console.log('Connection test result:', result)
      } catch (error) {
        console.error('Insforge connection test failed:', error)
      }
    }
    
    testConnection()
  }, [dispatch])

  // Add error handling
  if (error) {
    console.error('Products page error:', error)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Error loading products</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => dispatch(fetchProducts())}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category))
  }

  const handleSearchChange = (query) => {
    dispatch(setSearchQuery(query))
  }

  // Filter and sort products
  const filteredProducts = displayProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at) - new Date(a.created_at)
      case 'oldest':
        return new Date(a.created_at) - new Date(b.created_at)
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'popular':
        return (b.likes?.[0]?.count || 0) - (a.likes?.[0]?.count || 0)
      default:
        return 0
    }
  })

  // Debug information
  console.log('Products component render:', { products, loading, error, categories })

  // Fallback data for testing
  const fallbackProducts = [
    {
      id: 1,
      title: 'Sample Digital Product',
      description: 'This is a sample digital product for testing purposes',
      price: 29.99,
      category: 'Digital Art',
      thumbnail_url: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg',
      created_at: new Date().toISOString(),
      likes: [{ count: 5 }],
      downloads: 10
    },
    {
      id: 2,
      title: 'Another Sample Product',
      description: 'Another sample product to test the interface',
      price: 19.99,
      category: 'Software',
      thumbnail_url: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg',
      created_at: new Date().toISOString(),
      likes: [{ count: 3 }],
      downloads: 7
    }
  ]

  // Use fallback data if no products are loaded and not loading
  const displayProducts = products.length > 0 ? products : (!loading && !error ? fallbackProducts : [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </button>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Digital Products</h1>
        <p className="text-gray-600">
          Discover premium digital products from talented creators worldwide
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          Showing {sortedProducts.length} of {displayProducts.length} products
        </p>
      </div>

      {/* Products Grid/List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-xl"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'space-y-6'
        }>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Products