const Chat = require('../models/Chat');
const Product = require('../models/Product');

// @desc    Get or create chat between users for a product
// @route   POST /api/chats
// @access  Private
exports.getOrCreateChat = async (req, res, next) => {
  try {
    const { productId, receiverId } = req.body;
    const senderId = req.user.id;

    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if chat already exists
    let chat = await Chat.findOne({
      product: productId,
      participants: { $all: [senderId, receiverId] }
    }).populate('participants', 'name email avatar')
      .populate('product', 'title images');

    if (!chat) {
      // Create new chat
      chat = await Chat.create({
        product: productId,
        participants: [senderId, receiverId],
        messages: []
      });

      chat = await Chat.findById(chat._id)
        .populate('participants', 'name email avatar')
        .populate('product', 'title images');
    }

    res.status(200).json({
      success: true,
      data: chat
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all chats for logged in user
// @route   GET /api/chats
// @access  Private
exports.getUserChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      participants: req.user.id
    })
      .populate('participants', 'name email avatar')
      .populate('product', 'title images status')
      .sort('-lastMessage');

    res.status(200).json({
      success: true,
      count: chats.length,
      data: chats
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single chat
// @route   GET /api/chats/:id
// @access  Private
exports.getChat = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate('participants', 'name email avatar')
      .populate('product', 'title images owner status')
      .populate('messages.sender', 'name avatar');

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    // Check if user is participant
    const isParticipant = chat.participants.some(
      participant => participant._id.toString() === req.user.id
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this chat'
      });
    }

    res.status(200).json({
      success: true,
      data: chat
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send message in chat
// @route   POST /api/chats/:id/messages
// @access  Private
exports.sendMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    // Check if user is participant
    const isParticipant = chat.participants.some(
      participant => participant.toString() === req.user.id
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to send message in this chat'
      });
    }

    // Add message
    const message = {
      sender: req.user.id,
      content,
      timestamp: Date.now()
    };

    chat.messages.push(message);
    chat.lastMessage = Date.now();
    await chat.save();

    const updatedChat = await Chat.findById(chat._id)
      .populate('participants', 'name email avatar')
      .populate('product', 'title images')
      .populate('messages.sender', 'name avatar');

    res.status(200).json({
      success: true,
      data: updatedChat
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark messages as read
// @route   PUT /api/chats/:id/read
// @access  Private
exports.markAsRead = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found'
      });
    }

    // Mark all messages not sent by current user as read
    chat.messages.forEach(message => {
      if (message.sender.toString() !== req.user.id) {
        message.read = true;
      }
    });

    await chat.save();

    res.status(200).json({
      success: true,
      data: chat
    });
  } catch (error) {
    next(error);
  }
};
