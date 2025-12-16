import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const OrderHistory = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </button>
      <h1 className="text-3xl font-bold text-gray-900">Order History Page</h1>
      <p className="mt-4 text-lg text-gray-600">This is a placeholder for the order history page.</p>
    </div>
  );
};

export default OrderHistory;
