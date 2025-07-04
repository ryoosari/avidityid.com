import React from 'react';

interface ProductFiltersProps {
  categories: string[];
  tags: string[];
}

export default function ProductFilters({ categories, tags }: ProductFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Products</h3>
      
      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Tags</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {tags.slice(0, 10).map((tag) => (
            <label key={tag} className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">{tag}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-600">All Prices</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-600">$1 - $5</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="price"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-600">$5 - $10</span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        type="button"
        className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Clear Filters
      </button>
    </div>
  );
} 