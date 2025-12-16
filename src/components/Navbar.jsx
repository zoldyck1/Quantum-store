import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Search, ShoppingCart, User, LogOut, Settings, Package, Grid3X3, Sun, Moon, Globe } from 'lucide-react'
import { signOut } from '../features/auth/authSlice'
import { toggleCart } from '../features/cart/cartSlice'
import CartIcon from './CartIcon'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const { itemCount } = useSelector(state => state.cart)
  
  const handleSignOut = async () => {
    await dispatch(signOut())
    navigate('/')
  }

  const isAdmin = user?.user_metadata?.role === 'admin'
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark') || false
  })
  
  // Check if current page is a detail page
  const isDetailPage = location.pathname.match(/^\/products\/[^/]+$/) !== null

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setIsDarkMode(false)
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700 sticky top-0 z-50">
      {/* Top bar with Buyers, Sellers, Affiliates */}
      <div className="bg-gray-800 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/buyers" className="text-gray-300 hover:text-white transition-colors">Buyers</Link>
            <Link to="/sellers" className="text-gray-300 hover:text-white transition-colors">Sellers</Link>
            <Link to="/affiliates" className="text-gray-300 hover:text-white transition-colors">Affiliates</Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Currency/Language Dropdown */}
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <span className="font-medium">USD</span>
              <span>|</span>
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>English</span>
              </div>
            </div>
            {/* Theme Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-1 rounded text-gray-300 hover:text-white transition-colors"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg">
                <span className="text-white font-bold text-lg">DA</span>
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-white">Digital Axiom</span>
            </div>
          </Link>

          {/* Search Bar */}
          {!isDetailPage && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Product search"
                    className="w-full pl-14 pr-16 py-3 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-base placeholder-gray-500 text-gray-900"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <kbd className="px-2 py-1 bg-gray-200 rounded text-xs text-gray-500 font-medium">⌘K</kbd>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            {/* Chat, Purchases, Favorites, Cart icons */}
            <button className="flex flex-col items-center p-2 text-gray-300 hover:text-white transition-colors">
              <div className="p-1 rounded bg-gray-700/50 hover:bg-gray-600">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <span className="text-xs mt-1">Chat</span>
            </button>

            <button className="flex flex-col items-center p-2 text-gray-300 hover:text-white transition-colors">
              <div className="p-1 rounded bg-gray-700/50 hover:bg-gray-600">
                <Package className="h-4 w-4" />
              </div>
              <span className="text-xs mt-1">Purchases</span>
            </button>

            <button className="flex flex-col items-center p-2 text-gray-300 hover:text-white transition-colors">
              <div className="p-1 rounded bg-gray-700/50 hover:bg-gray-600">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <span className="text-xs mt-1">Favorites</span>
            </button>

            <button className="flex flex-col items-center p-2 text-gray-300 hover:text-white transition-colors">
              <div className="p-1 rounded bg-gray-700/50 hover:bg-gray-600 relative">
                <ShoppingCart className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-xs">0</span>
              </div>
              <span className="text-xs mt-1">Cart</span>
            </button>
            
            {isAuthenticated ? (
              <>
                {/* User Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white transition-colors">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:block">{user?.profile?.nickname || user?.email || 'User'}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Package className="h-4 w-4 mr-2" />
                        Order History
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-5 py-3 text-base font-medium text-gray-300 hover:text-white rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar