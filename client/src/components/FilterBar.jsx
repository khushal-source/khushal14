import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    listingType: 'all',
    condition: '',
    minPrice: '',
    maxPrice: ''
  });

  const categories = [
    'all',
    'Electronics',
    'Clothing',
    'Books',
    'Furniture',
    'Sports',
    'Toys',
    'Home & Garden',
    'Vehicles',
    'Other'
  ];

  const listingTypes = ['all', 'barter', 'donate', 'sell'];
  const conditions = ['', 'New', 'Like New', 'Good', 'Fair', 'Poor'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="input-field"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          <select
            name="listingType"
            value={filters.listingType}
            onChange={handleChange}
            className="input-field"
          >
            {listingTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <select
            name="condition"
            value={filters.condition}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">All Conditions</option>
            {conditions.slice(1).map((cond) => (
              <option key={cond} value={cond}>
                {cond}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min Price"
            className="input-field"
          />

          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max Price"
            className="input-field"
          />
        </div>

        <button type="submit" className="btn-primary w-full md:w-auto">
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default FilterBar;
