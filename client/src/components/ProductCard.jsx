import { Link } from 'react-router-dom';
import { FiEye, FiMapPin } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const getBadgeClass = (type) => {
    switch (type) {
      case 'barter':
        return 'badge-barter';
      case 'donate':
        return 'badge-donate';
      case 'sell':
        return 'badge-sell';
      default:
        return 'badge-barter';
    }
  };

  return (
    <Link to={`/products/${product._id}`} className="card overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.images?.[0]?.url || 'https://via.placeholder.com/400x300'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <span className={`badge ${getBadgeClass(product.listingType)} absolute top-3 right-3`}>
          {product.listingType}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            {product.listingType === 'sell' ? (
              <p className="text-xl font-bold text-primary-600">${product.price}</p>
            ) : (
              <p className="text-sm text-gray-500 capitalize">{product.listingType}</p>
            )}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <FiEye className="mr-1" />
            {product.views || 0}
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{product.condition}</span>
            <span className="text-xs text-gray-500">{product.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
