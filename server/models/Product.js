const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot be more than 1000 characters']
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
      'Beauty & Health',
      'Other'
    ]
  },
  condition: {
    type: String,
    required: [true, 'Product condition is required'],
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor']
  },
  type: {
    type: String,
    required: [true, 'Product type is required'],
    enum: ['barter', 'donation', 'sale']
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: function(value) {
        if (this.type === 'sale' && (!value || value <= 0)) {
          return false;
        }
        return true;
      },
      message: 'Price is required for sale items'
    }
  },
  barterFor: {
    type: String,
    trim: true,
    validate: {
      validator: function(value) {
        if (this.type === 'barter' && (!value || value.trim() === '')) {
          return false;
        }
        return true;
      },
      message: 'Barter description is required for barter items'
    }
  },
  images: [{
    type: String,
    required: [true, 'At least one image is required']
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'sold', 'donated', 'exchanged'],
    default: 'available'
  },
  location: {
    city: String,
    state: String,
    country: String
  },
  tags: [String],
  views: {
    type: Number,
    default: 0
  },
  interestedUsers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  exchangeWith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  soldTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  soldAt: Date
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, type: 1, status: 1 });
productSchema.index({ owner: 1 });

module.exports = mongoose.model('Product', productSchema);