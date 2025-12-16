import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Monitor, Smartphone, Music, ShoppingBag, Zap, Globe, Headphones, Code, Cloud, Target, MessageCircle, Wand2, Video, Pickaxe } from 'lucide-react';

interface ProductItem {
    name: string;
    icon: React.ElementType;
    path: string;
    bgColor: string;
    description: string;
}

const CollectionItem = ({ product }: { product: ProductItem }) => {
    const IconComponent = product.icon;
    return (
        <Link
            to={product.path}
            className="group flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
            <div className={`p-4 rounded-xl mb-3 ${product.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="h-8 w-8 text-white" />
            </div>
            <span className="text-white font-medium text-sm text-center">{product.name}</span>
            <span className="text-gray-400 text-xs mt-1">{product.description}</span>
        </Link>
    );
};

const ProductCollection: React.FC = () => {
    const products: ProductItem[] = [
        {
            name: "Cursor",
            icon: Code,
            path: "/cursor",
            bgColor: "bg-blue-600",
            description: "AI Code Editor"
        },
        {
            name: "Cloud",
            icon: Cloud,
            path: "/cloud",
            bgColor: "bg-sky-500",
            description: "Cloud Services"
        },
        {
            name: "Valorant",
            icon: Target,
            path: "/valorant",
            bgColor: "bg-red-600",
            description: "FPS Game"
        },
        {
            name: "Apex",
            icon: Zap,
            path: "/apex",
            bgColor: "bg-orange-600",
            description: "Battle Royale"
        },
        {
            name: "Telegram Premium",
            icon: MessageCircle,
            path: "/telegram",
            bgColor: "bg-blue-500",
            description: "Messaging"
        },
        {
            name: "Midjourney",
            icon: Wand2,
            path: "/midjourney",
            bgColor: "bg-purple-600",
            description: "AI Art"
        },
        {
            name: "CapCut",
            icon: Video,
            path: "/capcut",
            bgColor: "bg-pink-600",
            description: "Video Editor"
        },
        {
            name: "Minecraft",
            icon: Pickaxe,
            path: "/minecraft",
            bgColor: "bg-green-600",
            description: "Sandbox Game"
        },
        {
            name: "Roblox",
            icon: Gamepad2,
            path: "/roblox",
            bgColor: "bg-red-500",
            description: "Gaming Platform"
        }
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Popular</h2>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                            <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                            <svg className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                            All
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
                    {products.map(product => (
                        <CollectionItem
                            key={product.name}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCollection;
