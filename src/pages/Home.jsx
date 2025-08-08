import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import ProductGrid from '../components/ProductGrid';
import ProductCollection from '../components/ProductCollection';
import CategoryNavigation from '../components/CategoryNavigation';

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

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
      <ProductCollection />
      <CategoryNavigation />
      <ProductGrid products={recommendedProducts} />
    </div>
  );
};

export default Home;