import { Link } from 'react-router-dom';
import { FiArrowRight, FiRefreshCw, FiHeart, FiDollarSign } from 'react-icons/fi';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to SwapCycle
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Exchange, Donate, or Sell Used Products
            </p>
            <p className="text-lg mb-10 max-w-2xl mx-auto">
              Join our sustainable marketplace where you can give your items a second life while helping others and earning money.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Browse Products
              </Link>
              <Link to="/register" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How SwapCycle Works
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Three simple ways to give your items a new purpose
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiRefreshCw className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Barter</h3>
              <p className="text-gray-600">
                Exchange your items with other users' products. Find what you need while helping others find what they need.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Donate</h3>
              <p className="text-gray-600">
                Give away items you no longer need for free. Make someone's day while decluttering your space.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiDollarSign className="text-purple-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sell</h3>
              <p className="text-gray-600">
                List your items for sale at your desired price. Earn money from things you no longer use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join thousands of users who are already trading, donating, and selling on SwapCycle
            </p>
            <Link
              to="/register"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Create Your Account
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">50K+</div>
              <div className="text-gray-600">Products Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">25K+</div>
              <div className="text-gray-600">Successful Trades</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
