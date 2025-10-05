const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    maxLength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxLength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Electronics',
      'Clothing',
      'Books',
      'Furniture',
      'Sports',
      'Toys',
      'Home & Garden',
      'Automotive',
      'Musical Instruments',
      'Art & Crafts',
      'Other'
    ]
  },
  condition: {
    type: String,
    required: [true, 'Condition is required'],
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor']
  },
  images: [{
    url: { type: String, required: true },
    publicId: { type: String } // For Cloudinary
  }],
  listingType: {
    type: String,
    required: [true, 'Listing type is required'],
    enum: ['barter', 'donation', 'sale']
  },
  price: {
    type: Number,
    required: function() {
      return this.listingType === 'sale';
    },
    min: [0, 'Price cannot be negative']
  },
  barterPreferences: [{
    type: String,
    trim: true
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    address: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    zipCode: { type: String, required: true, trim: true },
    coordinates: {
      latitude: { type: Number },
      longitude: { type: Number }
    }
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'completed', 'withdrawn'],
    default: 'available'
  },
  views: {
    type: Number,
    default: 0
  },
  inquiries: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true,
      maxLength: [500, 'Message cannot be more than 500 characters']
    },
    offerDetails: {
      type: mongoose.Schema.Types.Mixed // For barter offers or price negotiations
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    }
  }
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({
  title: 'text',
  description: 'text',
  category: 'text'
});

// Index for location-based searches
productSchema.index({ 'location.coordinates': '2dsphere' });

// Index for filtering
productSchema.index({ category: 1, listingType: 1, status: 1 });
productSchema.index({ owner: 1 });
productSchema.index({ createdAt: -1 });

// Increment views
productSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Check if product is available
productSchema.methods.isAvailable = function() {
  return this.status === 'available' && this.expiresAt > new Date();
};

module.exports = mongoose.model('Product', productSchema);