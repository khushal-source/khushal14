const Product = require('../models/Product');
const { uploadImage, deleteImage } = require('../utils/cloudinary');

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res, next) => {
  try {
    const {
      category,
      listingType,
      status = 'available',
      search,
      minPrice,
      maxPrice,
      condition,
      sort = '-createdAt',
      page = 1,
      limit = 12
    } = req.query;

    // Build query
    const query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (listingType && listingType !== 'all') {
      query.listingType = listingType;
    }

    if (status) {
      query.status = status;
    }

    if (condition) {
      query.condition = condition;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    
    const products = await Product.find(query)
      .populate('owner', 'name email avatar rating')
      .sort(sort)
      .limit(Number(limit))
      .skip(skip);

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('owner', 'name email phone avatar rating reviewCount address');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Increment views
    product.views += 1;
    await product.save();

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private
exports.createProduct = async (req, res, next) => {
  try {
    req.body.owner = req.user.id;

    // Handle image uploads if files are provided
    if (req.files && req.files.length > 0) {
      const imageUploads = req.files.map(file => uploadImage(file.path));
      const images = await Promise.all(imageUploads);
      req.body.images = images;
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Make sure user is product owner
    if (product.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Make sure user is product owner
    if (product.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    // Delete images from cloudinary
    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        if (image.public_id) {
          await deleteImage(image.public_id);
        }
      }
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's products
// @route   GET /api/products/user/:userId
// @access  Public
exports.getUserProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ owner: req.params.userId })
      .populate('owner', 'name email avatar rating')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my products
// @route   GET /api/products/my/listings
// @access  Private
exports.getMyProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ owner: req.user.id })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark interest in a product
// @route   POST /api/products/:id/interest
// @access  Private
exports.markInterest = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if already interested
    const alreadyInterested = product.interestedUsers.includes(req.user.id);

    if (alreadyInterested) {
      // Remove interest
      product.interestedUsers = product.interestedUsers.filter(
        userId => userId.toString() !== req.user.id
      );
    } else {
      // Add interest
      product.interestedUsers.push(req.user.id);
    }

    await product.save();

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};
