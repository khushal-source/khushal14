const express = require('express');
const {
  getOrCreateChat,
  getUserChats,
  getChat,
  sendMessage,
  markAsRead
} = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getUserChats)
  .post(protect, getOrCreateChat);

router.get('/:id', protect, getChat);
router.post('/:id/messages', protect, sendMessage);
router.put('/:id/read', protect, markAsRead);

module.exports = router;
