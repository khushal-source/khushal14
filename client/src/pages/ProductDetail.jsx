import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProduct, markInterest } from '../services/productService';
import { getOrCreateChat } from '../services/chatService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiMapPin, FiEye, FiHeart, FiMessageSquare, FiUser } from 'react-icons/fi';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await getProduct(id);
      setProduct(data.data);
    } catch (error) {
      toast.error('Failed to fetch product details');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleInterest = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to mark interest');
      navigate('/login');
      return;
    }

    try {
      await markInterest(id);
      toast.success('Interest marked successfully');
      fetchProduct();
    } catch (error) {
      toast.error('Failed to mark interest');
    }
  };

  const handleContactSeller = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to contact seller');
      navigate('/login');
      return;
    }

    try {
      const chatData = await getOrCreateChat(product._id, product.owner._id);
      navigate('/chats', { state: { chatId: chatData.data._id } });
    } catch (error) {
      toast.error('Failed to start chat');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const isOwner = user?._id === product.owner._id;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div>
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={product.images?.[selectedImage]?.url || 'https://via.placeholder.com/600'}
                  alt={product.title}
                  className="w-full h-96 object-cover"
                />
              </div>
              {product.images?.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-primary-600' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`badge badge-${product.listingType} mb-2`}>
                    {product.listingType}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                </div>
                {product.listingType === 'sell' && (
                  <div className="text-3xl font-bold text-primary-600">
                    ${product.price}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                <span className="flex items-center">
                  <FiEye className="mr-1" />
                  {product.views} views
                </span>
                <span>•</span>
                <span className="capitalize">{product.condition}</span>
                <span>•</span>
                <span>{product.category}</span>
              </div>

              <div className="prose max-w-none mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Seller Info */}
              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <h3 className="text-lg font-semibold mb-3">Seller Information</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={product.owner.avatar || 'https://via.placeholder.com/60'}
                    alt={product.owner.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{product.owner.name}</p>
                    <p className="text-sm text-gray-600">{product.owner.email}</p>
                    {product.owner.rating > 0 && (
                      <p className="text-sm text-gray-600">
                        ⭐ {product.owner.rating.toFixed(1)} ({product.owner.reviewCount} reviews)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {!isOwner && product.status === 'available' && (
                <div className="space-y-3">
                  <button
                    onClick={handleContactSeller}
                    className="w-full btn-primary flex items-center justify-center"
                  >
                    <FiMessageSquare className="mr-2" />
                    Contact Seller
                  </button>
                  <button
                    onClick={handleInterest}
                    className="w-full btn-outline flex items-center justify-center"
                  >
                    <FiHeart className="mr-2" />
                    {product.interestedUsers?.includes(user?._id) ? 'Remove Interest' : 'Mark Interest'}
                  </button>
                </div>
              )}

              {isOwner && (
                <div className="space-y-3">
                  <Link
                    to={`/edit-product/${product._id}`}
                    className="w-full btn-primary text-center block"
                  >
                    Edit Product
                  </Link>
                  <p className="text-sm text-gray-600 text-center">
                    Status: <span className="font-medium capitalize">{product.status}</span>
                  </p>
                </div>
              )}

              {product.status !== 'available' && !isOwner && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 font-medium">
                    This product is currently {product.status}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
