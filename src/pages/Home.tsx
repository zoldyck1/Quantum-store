import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import ProductGrid from '../components/ProductGrid';
import ProductCollection from '../components/ProductCollection';
import CategoryNavigation from '../components/CategoryNavigation';
import {
    ShoppingBag,
    Star,
    Shield,
    Zap,
    Users,
    ArrowRight,
    Sparkles
} from 'lucide-react';
import { AppDispatch, RootState } from '../store';

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    // Real subcards data for recommended section
    const recommendedProducts = [
        {
            id: 'cursor-2',
            name: 'Cursor Pro',
            title: 'Cursor Pro',
            price: 20,
            category: 'Development',
            description: 'AI-powered code editor with unlimited requests and advanced completions',
            imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'valorant-2',
            name: 'VP 1000',
            title: 'Valorant Points 1000',
            price: 10,
            category: 'Gaming',
            description: 'Get 1000 Valorant Points to unlock agents and premium skins',
            imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'midjourney-2',
            name: 'Midjourney Standard',
            title: 'Midjourney Standard Plan',
            price: 30,
            category: 'AI Art',
            description: 'Unlimited AI art generations with fast mode and private galleries',
            imageUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'telegram-2',
            name: 'Telegram Premium 6M',
            title: 'Telegram Premium 6 Months',
            price: 25,
            category: 'Communication',
            description: '6 months of Telegram Premium with all advanced features',
            imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
            createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'minecraft-2',
            name: 'Minecoins 3500',
            title: 'Minecraft Coins 3500',
            price: 20,
            category: 'Gaming',
            description: 'Get 3500 Minecoins to buy skins, worlds and texture packs',
            imageUrl: 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'capcut-2',
            name: 'CapCut Pro',
            title: 'CapCut Pro License',
            price: 10,
            category: 'Video Editing',
            description: 'Professional video editing with premium effects and no watermark',
            imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
            createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'roblox-2',
            name: 'Robux 1700',
            title: 'Roblox 1700 Robux',
            price: 20,
            category: 'Gaming',
            description: 'Get 1700 Robux to customize your avatar and buy premium items',
            imageUrl: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&h=300&fit=crop',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
            id: 'cloud-2',
            name: 'Pro Cloud',
            title: 'Pro Cloud Storage',
            price: 15,
            category: 'Cloud Storage',
            description: '1TB cloud storage with advanced sync and collaboration tools',
            imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
            createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        }
    ];

    return (
        <div className="bg-gray-900">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium">
                                <Sparkles className="h-4 w-4 mr-2" />
                                Welcome to Digital Axiom
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Discover Amazing
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Digital Products</span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Explore our curated collection of premium digital products, from software licenses to gaming credits,
                            all in one secure marketplace.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                to="/products"
                                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <ShoppingBag className="h-5 w-5 mr-2" />
                                Start Shopping
                                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                to="/signup"
                                className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
                            >
                                <Users className="h-5 w-5 mr-2" />
                                Join Our Community
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                                <div className="text-gray-300">Happy Customers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">500+</div>
                                <div className="text-gray-300">Digital Products</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                                <div className="text-gray-300">Uptime Guarantee</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Why Choose Digital Axiom?</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            We provide the best digital marketplace experience with security, speed, and reliability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 text-center hover:bg-gray-700/70 transition-all duration-300">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Shield className="h-8 w-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Secure Payments</h3>
                            <p className="text-gray-300">
                                All transactions are protected with industry-standard encryption and secure payment processing.
                            </p>
                        </div>

                        <div className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 text-center hover:bg-gray-700/70 transition-all duration-300">
                            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Zap className="h-8 w-8 text-green-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Instant Delivery</h3>
                            <p className="text-gray-300">
                                Get your digital products instantly after purchase with automated delivery system.
                            </p>
                        </div>

                        <div className="bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-2xl p-8 text-center hover:bg-gray-700/70 transition-all duration-300">
                            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Star className="h-8 w-8 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-4">Premium Quality</h3>
                            <p className="text-gray-300">
                                Curated collection of high-quality digital products from verified sellers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ProductCollection />
            <CategoryNavigation />
            <ProductGrid products={recommendedProducts} />
        </div>
    );
};

export default Home;
