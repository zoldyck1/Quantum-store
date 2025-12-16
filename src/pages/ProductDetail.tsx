import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Heart, Shield, Download, Check, X, ArrowLeft } from 'lucide-react';
import { PayPalIcon, CryptoIcon, BankIcon } from '../components/icons/PaymentIcons';
import { addToCart } from '../features/cart/cartSlice';
import { toast } from 'react-hot-toast';
// @ts-ignore
import PayPalPayment from '../components/PayPalPayment';
// @ts-ignore
import BankTransferPayment from '../components/BankTransferPayment';
// @ts-ignore
import USDTPayment from '../components/USDTPayment';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';

interface PlanFeature {
    name: string;
    price: number;
    originalPrice?: number;
    features: string[];
    limitations: string[];
}

interface ProductPlans {
    [key: string]: PlanFeature;
}

interface ProductData {
    id: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    rating: number;
    reviewCount: number;
    category: string;
    tags: string[];
    images: string[];
    plans: ProductPlans;
    features: string[];
    requirements: string[];
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState<string>('basic');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [activeTab, setActiveTab] = useState<string>('description');
    const [isFavorited, setIsFavorited] = useState<boolean>(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Product name mapping based on category-planId format
    const getProductName = (productId: string | undefined): string => {
        const productMap: { [key: string]: string } = {
            'cursor-1': 'Cursor Free',
            'cursor-2': 'Cursor Pro',
            'cursor-3': 'Cursor Business',
            'cloud-1': 'Basic Cloud',
            'cloud-2': 'Pro Cloud',
            'cloud-3': 'Enterprise Cloud',
            'valorant-1': 'VP 475',
            'valorant-2': 'VP 1000',
            'valorant-3': 'VP 2050',
            'apex-1': 'Apex Coins 1000',
            'apex-2': 'Apex Coins 2150',
            'apex-3': 'Apex Coins 4350',
            'telegram-1': 'Telegram Premium 1 Month',
            'telegram-2': 'Telegram Premium 6 Months',
            'telegram-3': 'Telegram Premium 1 Year',
            'midjourney-1': 'Midjourney Basic Plan',
            'midjourney-2': 'Midjourney Standard Plan',
            'midjourney-3': 'Midjourney Pro Plan',
            'capcut-1': 'CapCut Free',
            'capcut-2': 'CapCut Pro',
            'capcut-3': 'CapCut Business',
            'minecraft-1': 'Minecoins 1720',
            'minecraft-2': 'Minecoins 3500',
            'minecraft-3': 'Minecoins 8000',
            'roblox-1': 'Robux 800',
            'roblox-2': 'Robux 1700',
            'roblox-3': 'Robux 4500'
        };
        return productId ? (productMap[productId] || 'Premium Digital Marketing Course') : 'Premium Digital Marketing Course';
    };

    // Mock product data - in real app, fetch from API using id
    const product: ProductData = {
        id: id || 'default',
        name: getProductName(id),
        shortDescription: "Master digital marketing with our comprehensive online course",
        longDescription: "This comprehensive digital marketing course covers everything from SEO and social media marketing to email campaigns and analytics. Perfect for beginners and professionals looking to enhance their skills.",
        rating: 4.8,
        reviewCount: 1247,
        category: "Education",
        tags: ["Marketing", "SEO", "Social Media", "Analytics"],
        images: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
        ],
        plans: {
            basic: {
                name: "Basic Plan",
                price: 49.99,
                originalPrice: 79.99,
                features: [
                    "Core marketing modules",
                    "Basic templates",
                    "Email support",
                    "30-day access"
                ],
                limitations: [
                    "No advanced modules",
                    "Limited downloads"
                ]
            },
            premium: {
                name: "Premium Plan",
                price: 99.99,
                originalPrice: 149.99,
                features: [
                    "All marketing modules",
                    "Premium templates & tools",
                    "Priority support",
                    "Lifetime access",
                    "Certification included",
                    "1-on-1 consultation"
                ],
                limitations: []
            },
            enterprise: {
                name: "Enterprise Plan",
                price: 199.99,
                originalPrice: 299.99,
                features: [
                    "Everything in Premium",
                    "Team collaboration tools",
                    "Custom branding",
                    "Dedicated account manager",
                    "Advanced analytics",
                    "White-label options"
                ],
                limitations: []
            }
        },
        features: [
            "Instant download",
            "Money-back guarantee",
            "Regular updates",
            "Community access"
        ],
        requirements: [
            "Modern web browser",
            "Internet connection",
            "Basic computer skills"
        ]
    };

    const [mainImage, setMainImage] = useState<string>(product.images[0]);

    const currentPlan = product.plans[selectedPlan];
    const totalPrice = (currentPlan.price * quantity).toFixed(2);

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: `${product.id}-${selectedPlan}`,
            name: `${product.name} - ${currentPlan.name}`,
            price: currentPlan.price,
            quantity: quantity,
            image: product.images[0],
            plan: selectedPlan
        }));

        toast.success('Added to cart successfully!');
    };

    const handleBuyNow = () => {
        if (!selectedPaymentMethod) {
            toast.error('Please select a payment method first');
            return;
        }
        setShowPaymentDetails(true);
    };

    const [showPaymentDetails, setShowPaymentDetails] = useState<boolean>(false);

    const paymentMethods = [
        {
            id: 'paypal',
            name: 'PayPal',
            icon: PayPalIcon,
            description: 'Pay securely with PayPal',
            color: 'blue',
            bgColor: 'bg-blue-600 hover:bg-blue-700'
        },
        {
            id: 'bank-transfer',
            name: 'Bank Transfer',
            icon: BankIcon,
            description: 'Transfer via banking app',
            color: 'green',
            bgColor: 'bg-green-600 hover:bg-green-700'
        },
        {
            id: 'usdt',
            name: 'USDT Wallet',
            icon: CryptoIcon,
            description: 'Pay with USDT crypto',
            color: 'orange',
            bgColor: 'bg-orange-600 hover:bg-orange-700'
        }
    ];

    const handlePaymentMethodChange = (methodId: string) => {
        setSelectedPaymentMethod(methodId);
        setShowPaymentDetails(false);
    };


    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-900 min-h-screen text-white">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">

                {/* Left side: Product Images */}
                <div className="lg:col-span-4">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-800 mb-4">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setMainImage(image)}
                                className={`aspect-w-16 aspect-h-9 rounded-md overflow-hidden border-2 transition-colors ${mainImage === image ? 'border-blue-400' : 'border-gray-600 hover:border-gray-500'
                                    }`}
                            >
                                <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right side: Product Info, Plans, Payment */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-blue-400 font-medium">{product.category}</span>
                            <button
                                onClick={() => setIsFavorited(!isFavorited)}
                                className={`p-2 rounded-full transition-colors ${isFavorited ? 'text-red-400 bg-gray-700' : 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                                    }`}
                            >
                                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">{product.name}</h1>
                        <p className="text-md text-gray-300 mb-4">{product.shortDescription}</p>



                        <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full border border-gray-600">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Plan Selection */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Choose Your Plan</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.entries(product.plans).map(([planKey, plan]) => (
                                <div
                                    key={planKey}
                                    className={`border-2 rounded-md p-3 text-center cursor-pointer transition-all ${selectedPlan === planKey
                                        ? 'border-blue-400 bg-gray-700'
                                        : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                                        }`}
                                    onClick={() => setSelectedPlan(planKey)}
                                >
                                    <h4 className="font-semibold text-white text-sm">{plan.name}</h4>
                                    <p className="text-lg font-bold text-white">${plan.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-6">Choose Payment Method</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {paymentMethods.map((method) => {
                                const IconComponent = method.icon;
                                return (
                                    <button
                                        key={method.id}
                                        onClick={() => handlePaymentMethodChange(method.id)}
                                        className={`w-full flex items-center p-4 rounded-xl transition-all transform hover:scale-105 ${selectedPaymentMethod === method.id
                                            ? `${method.bgColor} shadow-lg`
                                            : 'bg-gray-700 hover:bg-gray-600 border border-gray-600'
                                            }`}
                                    >
                                        <div className={`p-3 rounded-lg mr-4 ${selectedPaymentMethod === method.id ? 'bg-white bg-opacity-20' : 'bg-gray-600'
                                            }`}>
                                            <IconComponent className={`h-6 w-6 ${selectedPaymentMethod === method.id ? 'text-white' :
                                                method.color === 'blue' ? 'text-blue-400' :
                                                    method.color === 'green' ? 'text-green-400' :
                                                        method.color === 'orange' ? 'text-orange-400' : 'text-gray-400'
                                                }`} />
                                        </div>
                                        <div className="text-left flex-1">
                                            <p className="text-lg font-semibold text-white">{method.name}</p>
                                            <p className="text-sm text-gray-300">{method.description}</p>
                                        </div>
                                        {selectedPaymentMethod === method.id && (
                                            <Check className="h-6 w-6 text-white" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-sm font-medium text-white">Quantity:</label>
                            <div className="flex items-center border border-gray-600 rounded-lg bg-gray-700">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3 py-1 text-gray-300 hover:text-white"
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 border-x border-gray-600 text-white">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3 py-1 text-gray-300 hover:text-white"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between py-3 border-t border-gray-700">
                            <span className="text-lg font-medium text-white">Total:</span>
                            <span className="text-2xl font-bold text-white">${totalPrice}</span>
                        </div>

                        <div className="flex space-x-4 mt-6">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-gray-500 hover:to-gray-600 transition-all duration-200 transform hover:scale-105 shadow-lg border border-gray-500"
                            >
                                🛒 Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                disabled={!selectedPaymentMethod}
                                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform shadow-lg ${selectedPaymentMethod
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 hover:scale-105'
                                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                    }`}
                            >
                                {selectedPaymentMethod ? '💳 Buy Now' : '⚠️ Select Payment Method'}
                            </button>
                        </div>

                        {/* Payment Details Modal */}
                        {showPaymentDetails && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-white">Complete Payment</h3>
                                        <button
                                            onClick={() => setShowPaymentDetails(false)}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>

                                    <div className="mb-4 p-3 bg-gray-700 rounded">
                                        <p className="text-sm text-gray-300">{product.name} - {currentPlan.name}</p>
                                        <p className="text-lg font-bold text-white">${totalPrice}</p>
                                    </div>

                                    {selectedPaymentMethod === 'paypal' && (
                                        <PayPalPayment
                                            amount={parseFloat(totalPrice)}
                                            onSuccess={(_details: any) => {
                                                toast.success('Payment successful!');
                                                setShowPaymentDetails(false);
                                            }}
                                            onError={(_error: any) => {
                                                toast.error('Payment failed');
                                            }}
                                        />
                                    )}

                                    {selectedPaymentMethod === 'bank-transfer' && (
                                        <BankTransferPayment
                                            amount={parseFloat(totalPrice)}
                                            onConfirm={(_data: any) => {
                                                toast.success('Payment confirmation received!');
                                                setShowPaymentDetails(false);
                                            }}
                                        />
                                    )}

                                    {selectedPaymentMethod === 'usdt' && (
                                        <USDTPayment
                                            amount={parseFloat(totalPrice)}
                                            onConfirm={(_data: any) => {
                                                toast.success('USDT payment confirmation received!');
                                                setShowPaymentDetails(false);
                                            }}
                                        />
                                    )}


                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-12 bg-gray-800 p-6 rounded-lg">
                <div className="border-b border-gray-700">
                    <nav className="flex space-x-6">
                        {[
                            { id: 'description', label: 'Description' },
                            { id: 'features', label: 'Features' },
                            { id: 'requirements', label: 'Requirements' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                    ? 'border-blue-400 text-blue-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="py-6">
                    {activeTab === 'description' && (
                        <div className="prose max-w-none text-gray-300 leading-relaxed">
                            <p>{product.longDescription}</p>
                        </div>
                    )}

                    {activeTab === 'features' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-white mb-3">What's Included</h4>
                                <ul className="space-y-2">
                                    {currentPlan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-300 text-sm">
                                            <Check className="h-4 w-4 text-green-400 mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-3">Key Benefits</h4>
                                <ul className="space-y-2">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-gray-300 text-sm">
                                            <Shield className="h-4 w-4 text-blue-400 mr-2" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === 'requirements' && (
                        <div>
                            <h4 className="font-semibold text-white mb-3">System Requirements</h4>
                            <ul className="space-y-2">
                                {product.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-center text-gray-300 text-sm">
                                        <Download className="h-4 w-4 text-gray-400 mr-2" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
