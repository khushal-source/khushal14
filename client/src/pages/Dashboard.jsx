import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyProducts, deleteProduct } from '../services/productService';
import { getTransactions } from '../services/paymentService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus, FiEye } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsData, transactionsData] = await Promise.all([
        getMyProducts(),
        getTransactions()
      ]);
      setProducts(productsData.data);
      setTransactions(transactionsData.data);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteProduct(id);
      toast.success('Product deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Total Products</div>
            <div className="text-3xl font-bold text-primary-600">{products.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Active Listings</div>
            <div className="text-3xl font-bold text-green-600">
              {products.filter(p => p.status === 'available').length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Total Transactions</div>
            <div className="text-3xl font-bold text-purple-600">{transactions.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Total Views</div>
            <div className="text-3xl font-bold text-blue-600">
              {products.reduce((sum, p) => sum + (p.views || 0), 0)}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'products'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600'
                }`}
              >
                My Products
              </button>
              <button
                onClick={() => setActiveTab('transactions')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'transactions'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600'
                }`}
              >
                Transactions
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">My Listed Products</h2>
                  <Link to="/post-product" className="btn-primary flex items-center">
                    <FiPlus className="mr-2" />
                    Post New Product
                  </Link>
                </div>

                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">You haven't posted any products yet.</p>
                    <Link to="/post-product" className="btn-primary inline-flex items-center">
                      <FiPlus className="mr-2" />
                      Post Your First Product
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition"
                      >
                        <img
                          src={product.images?.[0]?.url || 'https://via.placeholder.com/100'}
                          alt={product.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-lg">{product.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className={`badge badge-${product.listingType}`}>
                              {product.listingType}
                            </span>
                            <span className="capitalize">{product.status}</span>
                            <span className="flex items-center">
                              <FiEye className="mr-1" />
                              {product.views} views
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/products/${product._id}`}
                            className="p-2 text-gray-600 hover:text-primary-600 transition"
                          >
                            <FiEye size={20} />
                          </Link>
                          <Link
                            to={`/edit-product/${product._id}`}
                            className="p-2 text-gray-600 hover:text-blue-600 transition"
                          >
                            <FiEdit size={20} />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="p-2 text-gray-600 hover:text-red-600 transition"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Transaction History</h2>
                
                {transactions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No transactions yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction._id}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                      >
                        <img
                          src={transaction.product?.images?.[0]?.url || 'https://via.placeholder.com/80'}
                          alt={transaction.product?.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold">{transaction.product?.title}</h3>
                          <p className="text-sm text-gray-600">
                            {transaction.buyer._id === user._id ? 'Purchased from' : 'Sold to'}{' '}
                            {transaction.buyer._id === user._id
                              ? transaction.seller.name
                              : transaction.buyer.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Status: <span className="capitalize">{transaction.status}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">${transaction.amount}</p>
                          <p className="text-sm text-gray-600 capitalize">{transaction.transactionType}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
