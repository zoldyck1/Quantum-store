import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-6xl font-bold text-blue-600">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mt-4">Page Not Found</h2>
            <p className="mt-4 text-lg text-gray-600">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFound;
