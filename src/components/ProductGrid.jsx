import React from 'react'
import ProductCard from './ProductCard'

const ProductGrid = ({ products }) => {
  // Show all products or limit to 8
  const displayProducts = products.slice(0, 8);

  return (
    <section className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">RECOMMENDED</h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
              <svg className="h-5 w-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
              <svg className="h-5 w-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="text-blue-400 hover:text-blue-300 font-medium text-sm cursor-pointer">
              All
            </span>
          </div>
        </div>
        {products.length === 0 ? (
          <div className="text-center text-gray-400">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductGrid
