import React from 'react';
import { Link } from 'react-router-dom';
import { Key, Monitor, Package, BookOpen, Gamepad2, Smartphone, CreditCard, Tv } from 'lucide-react';

const CategoryItem = ({ category }) => {
  const IconComponent = category.icon;
  return (
    <Link 
      to={category.path}
      className="flex items-center space-x-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
    >
      <IconComponent className="h-5 w-5 text-gray-400 group-hover:text-blue-400" />
      <div className="flex-1">
        <span className="text-white font-medium">{category.name}</span>
        {category.count && (
          <span className="ml-2 text-gray-400 text-sm">({category.count})</span>
        )}
      </div>
      <svg className="h-4 w-4 text-gray-500 group-hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
};

const CategoryNavigation = () => {
  const categories = [];

  return (
    <div className="bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map(category => (
            <CategoryItem 
              key={category.name}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;
