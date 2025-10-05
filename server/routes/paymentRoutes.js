const express = require('express');
const {
  createPaymentIntent,
  confirmPayment,
  getTransactions,
  createTransaction
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/create-intent', createPaymentIntent);
router.post('/confirm', confirmPayment);
router.get('/transactions', getTransactions);
router.post('/transaction', createTransaction);

module.exports = router;
