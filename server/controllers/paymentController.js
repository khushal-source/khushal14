const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Transaction = require('../models/Transaction');
const Product = require('../models/Product');

// @desc    Create payment intent
// @route   POST /api/payment/create-intent
// @access  Private
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.listingType !== 'sell') {
      return res.status(400).json({
        success: false,
        message: 'This product is not for sale'
      });
    }

    if (product.status !== 'available') {
      return res.status(400).json({
        success: false,
        message: 'This product is no longer available'
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(product.price * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        productId: product._id.toString(),
        buyerId: req.user.id,
        sellerId: product.owner.toString()
      }
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      amount: product.price
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Confirm payment and create transaction
// @route   POST /api/payment/confirm
// @access  Private
exports.confirmPayment = async (req, res, next) => {
  try {
    const { paymentIntentId, productId } = req.body;

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        message: 'Payment was not successful'
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Create transaction record
    const transaction = await Transaction.create({
      product: productId,
      buyer: req.user.id,
      seller: product.owner,
      amount: product.price,
      transactionType: 'sell',
      paymentStatus: 'completed',
      stripePaymentId: paymentIntentId,
      status: 'completed',
      completedAt: Date.now()
    });

    // Update product status
    product.status = 'completed';
    await product.save();

    res.status(200).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user transactions
// @route   GET /api/payment/transactions
// @access  Private
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ buyer: req.user.id }, { seller: req.user.id }]
    })
      .populate('product', 'title images price')
      .populate('buyer', 'name email')
      .populate('seller', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create barter/donation transaction
// @route   POST /api/payment/transaction
// @access  Private
exports.createTransaction = async (req, res, next) => {
  try {
    const { productId, exchangedProductId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const transactionData = {
      product: productId,
      buyer: req.user.id,
      seller: product.owner,
      amount: product.price || 0,
      transactionType: product.listingType,
      paymentStatus: product.listingType === 'sell' ? 'pending' : 'completed',
      status: 'pending'
    };

    if (exchangedProductId) {
      transactionData.exchangedProduct = exchangedProductId;
    }

    const transaction = await Transaction.create(transactionData);

    // Update product status
    product.status = 'pending';
    await product.save();

    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};
