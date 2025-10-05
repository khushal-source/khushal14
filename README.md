# SwapCycle - Full-Stack Exchange & Marketplace Platform

SwapCycle is a modern full-stack web application where users can exchange, donate, or buy/sell used products. Built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### User Features
- **User Authentication**: Secure JWT-based registration and login system
- **User Dashboard**: Manage profile, products, and view analytics
- **Post Products**: List items for barter, donation, or sale
- **Product Browsing**: Advanced search and filtering system
- **Product Details**: Detailed product pages with image galleries
- **Chat System**: Real-time messaging between buyers and sellers
- **Transactions**: Track all your purchases and sales
- **Payment Integration**: Secure Stripe payment processing for purchases

### Admin Features
- **Admin Dashboard**: Overview of platform statistics
- **User Management**: View, edit, and manage user accounts
- **Product Management**: Moderate and manage all product listings
- **Transaction Monitoring**: Track all platform transactions

### Technical Features
- Responsive design with Tailwind CSS
- Image upload with Cloudinary support
- RESTful API architecture
- MongoDB database with Mongoose ODM
- JWT authentication and authorization
- Rate limiting and security headers
- Input validation and sanitization

## 🧩 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **Stripe React** - Payment integration
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud image storage
- **Stripe** - Payment processing
- **Helmet** - Security headers
- **Express Rate Limit** - API rate limiting

## 📦 Project Structure

```
swapcycle/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── layout/   # Layout components (Navbar, Footer)
│   │   │   ├── ProductCard.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── PaymentModal.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── pages/        # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── PostProduct.jsx
│   │   │   ├── EditProduct.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Chats.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminUsers.jsx
│   │   │       └── AdminProducts.jsx
│   │   ├── context/      # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── services/     # API services
│   │   │   ├── api.js
│   │   │   ├── productService.js
│   │   │   ├── chatService.js
│   │   │   ├── paymentService.js
│   │   │   └── adminService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── server/                # Node.js backend
    ├── config/
    │   └── db.js         # Database configuration
    ├── controllers/      # Route controllers
    │   ├── authController.js
    │   ├── productController.js
    │   ├── chatController.js
    │   ├── adminController.js
    │   └── paymentController.js
    ├── middleware/       # Express middleware
    │   ├── auth.js
    │   ├── errorHandler.js
    │   └── upload.js
    ├── models/          # Mongoose models
    │   ├── User.js
    │   ├── Product.js
    │   ├── Chat.js
    │   └── Transaction.js
    ├── routes/          # API routes
    │   ├── authRoutes.js
    │   ├── productRoutes.js
    │   ├── chatRoutes.js
    │   ├── adminRoutes.js
    │   └── paymentRoutes.js
    ├── utils/           # Utility functions
    │   ├── generateToken.js
    │   └── cloudinary.js
    ├── server.js        # Entry point
    └── package.json
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Stripe account (for payments)
- Cloudinary account (optional, for image uploads)

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (edit `.env`)
   ```env
   PORT=5000
   NODE_ENV=development
   
   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/swapcycle
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/swapcycle
   
   # JWT
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   
   # Cloudinary (Optional)
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Stripe
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   
   # Client URL
   CLIENT_URL=http://localhost:3000
   ```

5. **Create uploads directory** (if using local storage)
   ```bash
   mkdir uploads
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (edit `.env`)
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Client will run on `http://localhost:3000`

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  avatar: String,
  rating: Number,
  reviewCount: Number,
  isActive: Boolean,
  createdAt: Date
}
```

### Product Model
```javascript
{
  title: String,
  description: String,
  category: String,
  condition: String,
  listingType: String (barter/donate/sell),
  price: Number,
  images: [{ url: String, public_id: String }],
  owner: ObjectId (ref: User),
  status: String (available/pending/completed/cancelled),
  interestedUsers: [ObjectId],
  location: {
    city: String,
    state: String,
    country: String
  },
  views: Number,
  tags: [String],
  createdAt: Date
}
```

### Chat Model
```javascript
{
  product: ObjectId (ref: Product),
  participants: [ObjectId (ref: User)],
  messages: [{
    sender: ObjectId (ref: User),
    content: String,
    timestamp: Date,
    read: Boolean
  }],
  lastMessage: Date,
  status: String (active/closed)
}
```

### Transaction Model
```javascript
{
  product: ObjectId (ref: Product),
  buyer: ObjectId (ref: User),
  seller: ObjectId (ref: User),
  amount: Number,
  transactionType: String (barter/donate/sell),
  paymentStatus: String,
  stripePaymentId: String,
  exchangedProduct: ObjectId (ref: Product),
  status: String,
  completedAt: Date
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updateprofile` - Update user profile
- `PUT /api/auth/updatepassword` - Update password

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)
- `GET /api/products/my/listings` - Get user's products (protected)
- `POST /api/products/:id/interest` - Mark interest (protected)

### Chats
- `GET /api/chats` - Get user chats (protected)
- `POST /api/chats` - Create or get chat (protected)
- `GET /api/chats/:id` - Get single chat (protected)
- `POST /api/chats/:id/messages` - Send message (protected)
- `PUT /api/chats/:id/read` - Mark as read (protected)

### Payments
- `POST /api/payment/create-intent` - Create payment intent (protected)
- `POST /api/payment/confirm` - Confirm payment (protected)
- `GET /api/payment/transactions` - Get transactions (protected)
- `POST /api/payment/transaction` - Create transaction (protected)

### Admin
- `GET /api/admin/stats` - Get dashboard stats (admin)
- `GET /api/admin/users` - Get all users (admin)
- `GET /api/admin/users/:id` - Get single user (admin)
- `PUT /api/admin/users/:id` - Update user (admin)
- `DELETE /api/admin/users/:id` - Delete user (admin)
- `GET /api/admin/products` - Get all products (admin)
- `DELETE /api/admin/products/:id` - Delete product (admin)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User registers or logs in
2. Server generates JWT token
3. Token is stored in localStorage
4. Token is sent with each API request in Authorization header
5. Server validates token and grants access

## 💳 Payment Integration

Stripe is integrated for secure payment processing:

1. User initiates purchase
2. Frontend creates payment intent via backend
3. Stripe handles card details securely
4. Backend confirms payment and creates transaction
5. Product status is updated

**Test Cards for Development:**
- Success: `4242 4242 4242 4242`
- Requires Authentication: `4000 0025 0000 3155`
- Declined: `4000 0000 0000 9995`

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects and transitions
- **Toast Notifications**: User-friendly feedback messages
- **Loading States**: Clear loading indicators
- **Form Validation**: Client and server-side validation
- **Image Galleries**: Multiple product images with preview

## 🚀 Production Deployment

### Backend Deployment (Heroku/Railway/Render)

1. **Prepare for deployment**
   ```bash
   # Ensure all dependencies are in package.json
   # Set NODE_ENV=production in environment variables
   ```

2. **Set environment variables** on hosting platform

3. **Deploy**
   ```bash
   git push heroku main
   # or use platform-specific deployment
   ```

### Frontend Deployment (Vercel/Netlify)

1. **Build the application**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy** the `dist` folder to hosting platform

3. **Configure environment variables** on hosting platform

## 📝 Usage Guide

### For Regular Users

1. **Register/Login**: Create an account or sign in
2. **Browse Products**: Use filters to find items you need
3. **Post a Product**: List items for barter, donation, or sale
4. **Contact Sellers**: Chat directly with product owners
5. **Make Purchase**: Complete secure payment for selling items
6. **Manage Dashboard**: Track your listings and transactions

### For Administrators

1. **Access Admin Panel**: Navigate to `/admin`
2. **Monitor Stats**: View platform analytics
3. **Manage Users**: View, edit, or remove user accounts
4. **Manage Products**: Moderate product listings
5. **Track Transactions**: Monitor all platform activity

## 🛡️ Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes and API endpoints
- Rate limiting on API requests
- Helmet for security headers
- Input validation and sanitization
- CORS configuration
- Secure payment processing with Stripe

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Check MongoDB is running
# Verify MONGODB_URI in .env
```

**Port Already in Use**
```bash
# Change PORT in server/.env
# Or kill process using the port
```

**Stripe Payment Not Working**
```bash
# Verify Stripe keys in .env files
# Check Stripe test mode is enabled
# Use test card numbers
```

**Images Not Uploading**
```bash
# Check Cloudinary credentials
# Or ensure uploads/ directory exists for local storage
```

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@swapcycle.com or open an issue in the repository.

---

**Built with ❤️ for sustainable commerce**
