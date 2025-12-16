import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Check } from 'lucide-react';

interface Plan {
    id: number;
    name: string;
    price: number;
    features: string[];
    popular: boolean;
}

interface CategoryData {
    name: string;
    description: string;
    plans: Plan[];
}

interface CategoryDataMap {
    [key: string]: CategoryData;
}

const categoryData: CategoryDataMap = {
    cursor: {
        name: 'Cursor',
        description: 'AI-powered code editor',
        plans: [
            { id: 1, name: 'Cursor Free', price: 0, features: ['Basic AI assistance', 'Limited requests'], popular: false },
            { id: 2, name: 'Cursor Pro', price: 20, features: ['Unlimited AI requests', 'Advanced completions', 'Priority support'], popular: true },
            { id: 3, name: 'Cursor Business', price: 40, features: ['Team collaboration', 'Admin controls', 'Custom models'], popular: false }
        ]
    },
    cloud: {
        name: 'Cloud Services',
        description: 'Cloud storage and computing',
        plans: [
            { id: 1, name: 'Basic Cloud', price: 5, features: ['100GB storage', 'Basic sync'], popular: false },
            { id: 2, name: 'Pro Cloud', price: 15, features: ['1TB storage', 'Advanced sync', 'Collaboration'], popular: true },
            { id: 3, name: 'Enterprise Cloud', price: 50, features: ['Unlimited storage', 'Enterprise features'], popular: false }
        ]
    },
    valorant: {
        name: 'Valorant',
        description: 'Tactical FPS game content',
        plans: [
            { id: 1, name: 'VP 475', price: 5, features: ['475 Valorant Points', 'Buy skins & agents'], popular: false },
            { id: 2, name: 'VP 1000', price: 10, features: ['1000 Valorant Points', 'Popular choice'], popular: true },
            { id: 3, name: 'VP 2050', price: 20, features: ['2050 Valorant Points', 'Best value'], popular: false }
        ]
    },
    apex: {
        name: 'Apex Legends',
        description: 'Battle royale game content',
        plans: [
            { id: 1, name: 'Apex Coins 1000', price: 10, features: ['1000 Apex Coins', 'Buy legends & skins'], popular: false },
            { id: 2, name: 'Apex Coins 2150', price: 20, features: ['2150 Apex Coins', 'Most popular'], popular: true },
            { id: 3, name: 'Apex Coins 4350', price: 40, features: ['4350 Apex Coins', 'Best value'], popular: false }
        ]
    },
    telegram: {
        name: 'Telegram Premium',
        description: 'Enhanced messaging features',
        plans: [
            { id: 1, name: 'Premium 1 Month', price: 5, features: ['All premium features', '1 month access'], popular: false },
            { id: 2, name: 'Premium 6 Months', price: 25, features: ['All premium features', '6 months access'], popular: true },
            { id: 3, name: 'Premium 1 Year', price: 45, features: ['All premium features', '1 year access'], popular: false }
        ]
    },
    midjourney: {
        name: 'Midjourney',
        description: 'AI art generation',
        plans: [
            { id: 1, name: 'Basic Plan', price: 10, features: ['200 generations/month', 'Basic features'], popular: false },
            { id: 2, name: 'Standard Plan', price: 30, features: ['Unlimited generations', 'Fast mode'], popular: true },
            { id: 3, name: 'Pro Plan', price: 60, features: ['Unlimited fast generations', 'Commercial usage'], popular: false }
        ]
    },
    capcut: {
        name: 'CapCut',
        description: 'Video editing software',
        plans: [
            { id: 1, name: 'CapCut Free', price: 0, features: ['Basic editing', 'Limited exports'], popular: false },
            { id: 2, name: 'CapCut Pro', price: 10, features: ['Premium effects', 'HD exports', 'No watermark'], popular: true },
            { id: 3, name: 'CapCut Business', price: 25, features: ['Commercial license', 'Team features'], popular: false }
        ]
    },
    minecraft: {
        name: 'Minecraft',
        description: 'Sandbox game content',
        plans: [
            { id: 1, name: 'Minecoins 1720', price: 10, features: ['1720 Minecoins', 'Buy skins & worlds'], popular: false },
            { id: 2, name: 'Minecoins 3500', price: 20, features: ['3500 Minecoins', 'Popular choice'], popular: true },
            { id: 3, name: 'Minecoins 8000', price: 40, features: ['8000 Minecoins', 'Best value'], popular: false }
        ]
    },
    roblox: {
        name: 'Roblox',
        description: 'Gaming platform currency',
        plans: [
            { id: 1, name: 'Robux 800', price: 10, features: ['800 Robux', 'Buy items & games'], popular: false },
            { id: 2, name: 'Robux 1700', price: 20, features: ['1700 Robux', 'Most popular'], popular: true },
            { id: 3, name: 'Robux 4500', price: 50, features: ['4500 Robux', 'Best value'], popular: false }
        ]
    }
};

const CategoryPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    // @ts-ignore
    const data = category && categoryData[category];

    if (!data) {
        return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Category not found</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Link to="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
                    <p className="text-gray-400 text-lg">{data.description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {data.plans.map((plan: Plan) => (
                        <Link
                            key={plan.id}
                            to={`/products/${category}-${plan.id}`}
                            className="relative bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                        <Star className="h-3 w-3 mr-1" />
                                        Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <div className="text-3xl font-bold text-blue-400">
                                    ${plan.price}
                                    {plan.price > 0 && <span className="text-sm text-gray-400">/month</span>}
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature: string, index: number) => (
                                    <li key={index} className="flex items-center text-gray-300">
                                        <Check className="h-4 w-4 text-green-400 mr-3" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                                View Details
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
