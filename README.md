# DigitalStore - Modern E-commerce Platform

A comprehensive e-commerce platform for digital products built with React, Supabase, and modern web technologies.

## 🚀 Features

### User Features
- **Authentication System**: Secure signup, login, logout, and password reset
- **Product Catalog**: Browse digital products by category with search and filtering
- **Shopping Cart**: Add products to cart with persistent state
- **Multiple Payment Methods**: 
  - Stripe (Visa/Mastercard)
  - CIH Bank (Morocco)
  - Cryptocurrency (BTC, USDT, ETH)
- **Order Management**: View order history and track payment status
- **Social Features**: Like and comment on products
- **Responsive Design**: Mobile-first approach for all devices

### Admin Features
- **Dashboard**: Overview of sales, users, and products with analytics
- **Product Management**: Add, edit, and delete products
- **User Management**: View and manage user accounts
- **Order Management**: View and update order statuses
- **Analytics**: Sales charts and performance metrics

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Recharts** for data visualization
- **React Hook Form** for form handling

### Backend
- **Supabase** for:
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - File storage
  - Edge functions

### Payments
- **Stripe** for international payments
- **CMI Morocco** for local payments
- **Coinbase Commerce/NowPayments** for cryptocurrency

## 📁 Project Structure

```
ecommerce-app/
├── src/
│   ├── components/          # Reusable UI components
│   ├── layouts/            # Layout components
│   ├── pages/              # Page components
│   ├── features/           # Feature-based modules
│   ├── services/           # API services
│   ├── store/              # Redux store
│   ├── utils/              # Utility functions
│   └── payments/           # Payment integrations
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase and payment provider credentials.

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the database migrations (SQL files will be provided)
   - Set up Row Level Security policies

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schema

The application uses the following main tables:
- `profiles` - User profiles and metadata
- `products` - Digital product catalog
- `orders` - Order information
- `order_items` - Order line items
- `product_comments` - Product reviews and comments
- `product_likes` - Product likes/favorites

## 🔐 Authentication

The app uses Supabase Auth with:
- Email/password authentication
- Email confirmation disabled by default
- User roles (user/admin) stored in user metadata
- Protected routes for authenticated users
- Admin-only routes for administrative functions

## 💳 Payment Integration

### Stripe
- Secure card payments
- Webhook handling for payment confirmations
- Automatic order status updates

### CIH Bank (Morocco)
- Local payment processing for Moroccan customers
- Integration with CMI payment gateway

### Cryptocurrency
- Support for Bitcoin, USDT, and Ethereum
- Integration with crypto payment processors
- Real-time payment verification

## 🔒 Security Features

- Row Level Security (RLS) on all database tables
- JWT-based authentication
- Secure payment processing
- Input validation and sanitization
- Protected admin routes

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)
- Touch-friendly interface
- Optimized performance on all devices

## 🎨 Design System

- **Colors**: Primary blue (#3B82F6), secondary green (#10B981), accent orange (#F59E0B)
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: 8px grid system for consistent spacing
- **Components**: Reusable, accessible UI components
- **Animations**: Subtle transitions and hover effects

## 🚀 Deployment

The application can be deployed to:
- **Vercel** (recommended for frontend)
- **Netlify**
- **Supabase** (for backend and database)

## 📈 Analytics

Built-in analytics dashboard includes:
- Sales performance over time
- User registration trends
- Product popularity metrics
- Revenue tracking
- Order status distribution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: rrzltktb@gmail.com
- Documentation: [Link to docs]
- Issues: Create a GitHub issue

---

Built using modern web technologies.