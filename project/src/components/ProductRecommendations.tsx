import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, TrendingUp, Filter, Heart } from 'lucide-react';

const ProductRecommendations: React.FC = () => {
  const [preferences, setPreferences] = useState({
    category: 'all',
    priceRange: 'all',
    sustainabilityLevel: 'all',
    brand: ''
  });

  const [recommendations, setRecommendations] = useState<Array<{
    id: number;
    name: string;
    brand: string;
    category: string;
    price: number;
    rating: number;
    sustainabilityScore: number;
    carbonFootprint: number;
    waterUsage: number;
    purchaseLikelihood: number;
    image: string;
    features: string[];
  }>>([]);

  const [isLoading, setIsLoading] = useState(false);

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value
    });
  };

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate API call to your ML model
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock product recommendations based on your model
    const mockProducts = [
      {
        id: 1,
        name: 'Organic Cotton T-Shirt',
        brand: 'EcoWear',
        category: 'Clothing',
        price: 29.99,
        rating: 4.8,
        sustainabilityScore: 92,
        carbonFootprint: 2.1,
        waterUsage: 45,
        purchaseLikelihood: 89,
        image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300',
        features: ['100% Organic Cotton', 'Fair Trade Certified', 'Carbon Neutral Shipping']
      },
      {
        id: 2,
        name: 'Bamboo Fiber Yoga Mat',
        brand: 'ZenEco',
        category: 'Sports',
        price: 79.99,
        rating: 4.6,
        sustainabilityScore: 88,
        carbonFootprint: 1.8,
        waterUsage: 12,
        purchaseLikelihood: 85,
        image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=300',
        features: ['Biodegradable Material', 'Non-Toxic', 'Recyclable Packaging']
      },
      {
        id: 3,
        name: 'Solar-Powered Phone Charger',
        brand: 'SunTech',
        category: 'Electronics',
        price: 49.99,
        rating: 4.7,
        sustainabilityScore: 85,
        carbonFootprint: 3.2,
        waterUsage: 8,
        purchaseLikelihood: 82,
        image: 'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=300',
        features: ['Renewable Energy', 'Durable Design', 'Weather Resistant']
      },
      {
        id: 4,
        name: 'Recycled Glass Water Bottle',
        brand: 'PureFlow',
        category: 'Home',
        price: 24.99,
        rating: 4.9,
        sustainabilityScore: 94,
        carbonFootprint: 1.2,
        waterUsage: 5,
        purchaseLikelihood: 91,
        image: 'https://images.pexels.com/photos/3737631/pexels-photo-3737631.jpeg?auto=compress&cs=tinysrgb&w=300',
        features: ['100% Recycled Glass', 'BPA-Free', 'Lifetime Warranty']
      },
      {
        id: 5,
        name: 'Hemp Seed Protein Powder',
        brand: 'PlantPower',
        category: 'Food',
        price: 34.99,
        rating: 4.5,
        sustainabilityScore: 90,
        carbonFootprint: 0.8,
        waterUsage: 15,
        purchaseLikelihood: 78,
        image: 'https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=300',
        features: ['Plant-Based', 'Organic Certified', 'Minimal Processing']
      },
      {
        id: 6,
        name: 'Biodegradable Phone Case',
        brand: 'EcoShield',
        category: 'Electronics',
        price: 19.99,
        rating: 4.4,
        sustainabilityScore: 87,
        carbonFootprint: 0.5,
        waterUsage: 3,
        purchaseLikelihood: 76,
        image: 'https://images.pexels.com/photos/4666748/pexels-photo-4666748.jpeg?auto=compress&cs=tinysrgb&w=300',
        features: ['Compostable Material', 'Drop Protection', 'Natural Colors']
      }
    ];

    // Filter based on preferences
    let filteredProducts = mockProducts;
    
    if (preferences.category !== 'all') {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === preferences.category.toLowerCase()
      );
    }
    
    if (preferences.priceRange !== 'all') {
      const [min, max] = preferences.priceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(p => 
        p.price >= min && (max ? p.price <= max : true)
      );
    }
    
    if (preferences.sustainabilityLevel !== 'all') {
      const minScore = preferences.sustainabilityLevel === 'high' ? 85 : 70;
      filteredProducts = filteredProducts.filter(p => 
        p.sustainabilityScore >= minScore
      );
    }

    // Sort by purchase likelihood
    filteredProducts.sort((a, b) => b.purchaseLikelihood - a.purchaseLikelihood);
    
    setRecommendations(filteredProducts);
    setIsLoading(false);
  };

  const getSustainabilityColor = (score: number) => {
    if (score >= 90) return 'green';
    if (score >= 80) return 'emerald';
    if (score >= 70) return 'yellow';
    return 'orange';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Product Recommendations</h1>
        <p className="text-gray-600">Discover sustainable products tailored to your preferences using AI</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={preferences.category}
              onChange={handlePreferenceChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            >
              <option value="all">All Categories</option>
              <option value="clothing">Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="home">Home</option>
              <option value="food">Food</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select
              name="priceRange"
              value={preferences.priceRange}
              onChange={handlePreferenceChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            >
              <option value="all">All Prices</option>
              <option value="0-25">$0 - $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100">$100+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sustainability</label>
            <select
              name="sustainabilityLevel"
              value={preferences.sustainabilityLevel}
              onChange={handlePreferenceChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            >
              <option value="all">All Levels</option>
              <option value="high">High (85+)</option>
              <option value="medium">Medium (70+)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={generateRecommendations}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  <span>Get Recommendations</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Product Grid */}
      {recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {recommendations.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getSustainabilityColor(product.sustainabilityScore) === 'green' ? 'bg-green-100 text-green-800' :
                    getSustainabilityColor(product.sustainabilityScore) === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                    getSustainabilityColor(product.sustainabilityScore) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {product.sustainabilityScore}% Eco
                  </div>
                </div>
                <button className="absolute top-3 left-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                    <p className="text-xs text-gray-600">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">${product.price}</div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Purchase Likelihood</span>
                    <span className="font-medium text-teal-600">{product.purchaseLikelihood}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-teal-500 h-1.5 rounded-full transition-all duration-1000"
                      style={{ width: `${product.purchaseLikelihood}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-gray-600">Carbon</div>
                    <div className="font-medium">{product.carbonFootprint} kg CO₂</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-gray-600">Water</div>
                    <div className="font-medium">{product.waterUsage}L</div>
                  </div>
                </div>

                <div className="space-y-1 mb-4">
                  {product.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all duration-200">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {recommendations.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center py-12"
        >
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Recommendations Yet</h3>
          <p className="text-gray-600 mb-6">Set your preferences and click "Get Recommendations" to discover sustainable products</p>
        </motion.div>
      )}
    </div>
  );
};

export default ProductRecommendations;