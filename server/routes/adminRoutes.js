const express = require('express');
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getAllProducts,
  deleteProduct,
  getDashboardStats
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getDashboardStats);

router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/products')
  .get(getAllProducts);

router.route('/products/:id')
  .delete(deleteProduct);

module.exports = router;
