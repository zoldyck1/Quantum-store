import React from 'react'
import { Link } from 'react-router-dom'
import { Package, Mail, Phone, MapPin } from 'lucide-react'
import { PayPalIcon, CryptoIcon, BankIcon } from './icons/PaymentIcons'

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <Package className="h-8 w-8 text-blue-400" />
                            <span className="text-xl font-bold">DigitalStore</span>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Your premier destination for digital products. From software to digital art,
                            templates to music - discover premium digital content from creators worldwide.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-gray-300">
                                <Mail className="h-4 w-4" />
                                <span>support@digitalstore.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-300">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-300">
                                <MapPin className="h-4 w-4" />
                                <span>123 Digital Avenue, Tech City, TC 12345</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <Link to="/products" className="block text-gray-300 hover:text-white transition-colors">
                                Products
                            </Link>
                            <Link to="/categories" className="block text-gray-300 hover:text-white transition-colors">
                                Categories
                            </Link>
                            <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">
                                About Us
                            </Link>
                            <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <div className="space-y-2">
                            <Link to="/help" className="block text-gray-300 hover:text-white transition-colors">
                                Help Center
                            </Link>
                            <Link to="/terms" className="block text-gray-300 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link to="/privacy" className="block text-gray-300 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/refunds" className="block text-gray-300 hover:text-white transition-colors">
                                Refund Policy
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 DigitalStore. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-6 mt-4 md:mt-0">
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Privacy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Terms
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Support
                            </a>
                        </div>
                        <div className="flex items-center space-x-3 ml-6">
                            <span className="text-xs text-gray-500">We Accept:</span>
                            <PayPalIcon className="h-6 w-6 opacity-70 hover:opacity-100 transition-opacity" />
                            <CryptoIcon className="h-6 w-6 opacity-70 hover:opacity-100 transition-opacity" />
                            <BankIcon className="h-6 w-6 opacity-70 hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
