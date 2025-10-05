# SwapCycle Quick Setup Guide

Follow these steps to get SwapCycle running on your local machine in minutes.

## ⚡ Quick Start (5 Minutes)

### Step 1: Clone and Install

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB if not already installed
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or start manually
mongod --config /usr/local/etc/mongod.conf
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Use it in your .env file

### Step 3: Configure Environment Variables

**Backend (.env in server/)**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
PORT=5000
NODE_ENV=development

# MongoDB - Choose one:
# Local:
MONGODB_URI=mongodb://localhost:27017/swapcycle
# Or Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/swapcycle

# JWT - Generate a random secret
JWT_SECRET=mysupersecretkey12345
JWT_EXPIRE=7d

# Cloudinary (Optional - skip for now)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Stripe (Optional - use test keys)
STRIPE_SECRET_KEY=sk_test_51xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxx

# Client URL
CLIENT_URL=http://localhost:3000
```

**Frontend (.env in client/)**
```bash
cd client
cp .env.example .env
```

Edit `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxx
```

### Step 4: Create Uploads Directory

```bash
cd server
mkdir uploads
```

### Step 5: Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### Step 6: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🎉 You're Done!

### Create Your First Admin User

1. Go to http://localhost:3000/register
2. Register a new account
3. In MongoDB, manually set this user's role to "admin":

```bash
# Connect to MongoDB
mongosh swapcycle

# Update user role
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

### Test the Application

1. **Register** a new user
2. **Login** with your credentials
3. **Post a product** from the dashboard
4. **Browse products** and use filters
5. **Contact sellers** via chat
6. **Access admin panel** (if admin user)

## 🔧 Optional Setup

### Cloudinary (Image Uploads)

1. Create account at https://cloudinary.com
2. Get your credentials from dashboard
3. Add to `server/.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Stripe (Payments)

1. Create account at https://stripe.com
2. Get test API keys from dashboard
3. Add to both `.env` files:

**Backend:**
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key
```

**Frontend:**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

### Test Credit Cards (Stripe Test Mode)
- **Success**: 4242 4242 4242 4242
- **Requires Authentication**: 4000 0025 0000 3155
- **Declined**: 4000 0000 0000 9995
- Use any future date for expiry and any 3 digits for CVC

## 🐛 Common Issues

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
brew services list

# Start MongoDB
brew services start mongodb-community
```

### "Port 5000 already in use"
```bash
# Change port in server/.env
PORT=5001

# Or kill process on port 5000
lsof -ti:5000 | xargs kill
```

### "Module not found" errors
```bash
# Reinstall dependencies
cd server && npm install
cd ../client && npm install
```

### Images not uploading
```bash
# Create uploads directory
cd server
mkdir uploads

# Or configure Cloudinary (recommended)
```

## 📚 Next Steps

- Check out the [full README](./README.md) for detailed documentation
- Explore the API endpoints in the documentation
- Customize the styling in Tailwind config
- Add more features!

## 💡 Tips

1. **Use two terminals**: One for backend, one for frontend
2. **Check console logs**: Helpful for debugging
3. **Use MongoDB Compass**: GUI for viewing database
4. **Install REST client**: Test API endpoints (Postman/Insomnia)
5. **Enable hot reload**: Code changes reflect automatically

## 🎨 Customize

### Change Colors
Edit `client/tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#0ea5e9', // Change this!
    600: '#0284c7',
    // ...
  }
}
```

### Add Categories
Edit `server/models/Product.js`:
```javascript
category: {
  enum: [
    'Electronics',
    'Your New Category', // Add here
    // ...
  ]
}
```

## 🚀 Production Deployment

See [README.md](./README.md) for production deployment instructions.

---

**Need help?** Open an issue on GitHub or check the main README.
