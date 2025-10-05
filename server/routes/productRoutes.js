const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getUserProducts,
  getMyProducts,
  markInterest
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, upload.array('images', 5), createProduct);

router.get('/my/listings', protect, getMyProducts);
router.get('/user/:userId', getUserProducts);

router.route('/:id')
  .get(getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

router.post('/:id/interest', protect, markInterest);

module.exports = router;
