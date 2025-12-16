import React, { ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './store'

// Layouts
import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import OrderHistory from './pages/OrderHistory'
import Checkout from './pages/Checkout'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentCancel from './pages/PaymentCancel'
import AdminDashboard from './pages/AdminDashboard'
import CategoryPage from './pages/CategoryPage'
import NotFound from './pages/NotFound'

interface ProtectedRouteProps {
    children: ReactNode;
    adminOnly?: boolean;
}

// Protected Route Component
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (adminOnly && user?.role !== 'admin') {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="products/:id" element={<ProductDetail />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />

                {/* Protected User Routes */}
                <Route path="profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="orders" element={
                    <ProtectedRoute>
                        <OrderHistory />
                    </ProtectedRoute>
                } />
                <Route path="checkout" element={<Checkout />} />
                <Route path="payment/success" element={
                    <ProtectedRoute>
                        <PaymentSuccess />
                    </ProtectedRoute>
                } />
                <Route path="payment/cancel" element={
                    <ProtectedRoute>
                        <PaymentCancel />
                    </ProtectedRoute>
                } />

                {/* Category Routes */}
                <Route path=":category" element={<CategoryPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                    <AdminLayout />
                </ProtectedRoute>
            }>
                <Route index element={<AdminDashboard />} />
                {/* Add more admin routes here */}
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes
