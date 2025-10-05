const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      maxLength: [1000, 'Message cannot be more than 1000 characters']
    },
    messageType: {
      type: String,
      enum: ['text', 'image', 'offer'],
      default: 'text'
    },
    offer: {
      type: {
        type: String,
        enum: ['price', 'barter']
      },
      amount: Number,
      productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'countered'],
        default: 'pending'
      }
    },
    readBy: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      readAt: { type: Date, default: Date.now }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  lastMessage: {
    content: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  },
  status: {
    type: String,
    enum: ['active', 'archived', 'blocked'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for efficient queries
chatSchema.index({ participants: 1 });
chatSchema.index({ product: 1 });
chatSchema.index({ 'lastMessage.createdAt': -1 });

// Add message to chat
chatSchema.methods.addMessage = function(senderId, content, messageType = 'text', offer = null) {
  const message = {
    sender: senderId,
    content,
    messageType,
    offer,
    readBy: [{ user: senderId }]
  };
  
  this.messages.push(message);
  this.lastMessage = {
    content,
    sender: senderId,
    createdAt: new Date()
  };
  
  return this.save();
};

// Mark messages as read
chatSchema.methods.markAsRead = function(userId) {
  this.messages.forEach(message => {
    if (!message.readBy.some(read => read.user.toString() === userId.toString())) {
      message.readBy.push({ user: userId });
    }
  });
  
  return this.save();
};

module.exports = mongoose.model('Chat', chatSchema);