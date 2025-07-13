import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Recycle, Truck, AlertTriangle } from 'lucide-react';

const PackagingSuggestions: React.FC = () => {
  const [formData, setFormData] = useState({
    materialType: 'plastic',
    productWeight: '',
    fragility: 'low',
    recyclable: 'yes',
    transportMode: 'land',
    lcaEmission: ''
  });

  const [result, setResult] = useState<{
    suggestedPackaging: string;
    sustainability: string;
    costEfficiency: string;
    environmentalImpact: string;
  } | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generatePackagingSuggestion = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call to your ML model
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock packaging suggestion based on your model's logic
    const weight = parseFloat(formData.productWeight) || 0;
    const emission = parseFloat(formData.lcaEmission) || 0;
    
    let suggestedPackaging = 'Standard Cardboard';
    let sustainability = 'Good';
    let costEfficiency = 'Medium';
    let environmentalImpact = 'Low';
    
    // Decision logic based on your model
    if (formData.fragility === 'high') {
      if (weight > 500) {
        suggestedPackaging = 'Reinforced Eco-Foam';
        sustainability = 'Fair';
        costEfficiency = 'High';
        environmentalImpact = 'Medium';
      } else {
        suggestedPackaging = 'Biodegradable Bubble Wrap';
        sustainability = 'Excellent';
        costEfficiency = 'Medium';
        environmentalImpact = 'Very Low';
      }
    } else if (formData.materialType === 'glass') {
      suggestedPackaging = 'Recycled Cardboard with Molded Pulp';
      sustainability = 'Excellent';
      costEfficiency = 'Medium';
      environmentalImpact = 'Very Low';
    } else if (weight > 1000) {
      suggestedPackaging = 'Heavy-Duty Recycled Cardboard';
      sustainability = 'Good';
      costEfficiency = 'High';
      environmentalImpact = 'Low';
    } else if (formData.recyclable === 'no') {
      suggestedPackaging = 'Compostable Packaging';
      sustainability = 'Excellent';
      costEfficiency = 'Low';
      environmentalImpact = 'Very Low';
    }
    
    // Adjust based on transport mode
    if (formData.transportMode === 'air') {
      suggestedPackaging = 'Lightweight ' + suggestedPackaging;
      environmentalImpact = environmentalImpact === 'Very Low' ? 'Low' : 
                           environmentalImpact === 'Low' ? 'Medium' : 'High';
    }
    
    setResult({
      suggestedPackaging,
      sustainability,
      costEfficiency,
      environmentalImpact
    });
    
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: string) => {
    switch (score.toLowerCase()) {
      case 'excellent': return 'green';
      case 'good': return 'emerald';
      case 'fair': case 'medium': return 'yellow';
      case 'poor': case 'low': return 'orange';
      case 'very low': return 'green';
      case 'high': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Packaging Suggestions</h1>
        <p className="text-gray-600">Get AI-powered recommendations for sustainable packaging solutions</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material Type
              </label>
              <select
                name="materialType"
                value={formData.materialType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="plastic">Plastic</option>
                <option value="glass">Glass</option>
                <option value="metal">Metal</option>
                <option value="ceramic">Ceramic</option>
                <option value="textile">Textile</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Weight (grams)
              </label>
              <input
                type="number"
                name="productWeight"
                value={formData.productWeight}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="e.g., 150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fragility Level
              </label>
              <select
                name="fragility"
                value={formData.fragility}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recyclable Product
              </label>
              <select
                name="recyclable"
                value={formData.recyclable}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transport Mode
              </label>
              <select
                name="transportMode"
                value={formData.transportMode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="land">Land</option>
                <option value="sea">Sea</option>
                <option value="air">Air</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LCA Emission (kg CO₂)
              </label>
              <input
                type="number"
                step="0.01"
                name="lcaEmission"
                value={formData.lcaEmission}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="e.g., 1.89"
              />
            </div>

            <button
              onClick={generatePackagingSuggestion}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Package className="w-5 h-5" />
                  <span>Get Suggestion</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {result && (
            <>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Packaging</h3>
                
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Package className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {result.suggestedPackaging}
                  </h4>
                </div>

                {/* Metrics */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Recycle className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Sustainability</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getScoreColor(result.sustainability) === 'green' ? 'bg-green-100 text-green-800' :
                      getScoreColor(result.sustainability) === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                      getScoreColor(result.sustainability) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {result.sustainability}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Cost Efficiency</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getScoreColor(result.costEfficiency) === 'green' ? 'bg-green-100 text-green-800' :
                      getScoreColor(result.costEfficiency) === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                      getScoreColor(result.costEfficiency) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      getScoreColor(result.costEfficiency) === 'red' ? 'bg-red-100 text-red-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {result.costEfficiency}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-600">Environmental Impact</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getScoreColor(result.environmentalImpact) === 'green' ? 'bg-green-100 text-green-800' :
                      getScoreColor(result.environmentalImpact) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                      getScoreColor(result.environmentalImpact) === 'orange' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {result.environmentalImpact}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Packaging Benefits</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Optimized for your product's specific requirements</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Reduces environmental impact through sustainable materials</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Balances protection with cost-effectiveness</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Suitable for your chosen transport method</span>
                  </li>
                </ul>
              </div>
            </>
          )}

          {/* Information Panel */}
          <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-center space-x-2 mb-4">
              <Recycle className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">Sustainable Packaging</h3>
            </div>
            <div className="space-y-2 text-sm text-green-800">
              <p>• <strong>Biodegradable:</strong> Breaks down naturally without harming the environment</p>
              <p>• <strong>Recyclable:</strong> Can be processed and reused for new products</p>
              <p>• <strong>Compostable:</strong> Decomposes into nutrient-rich soil</p>
              <p>• <strong>Minimal:</strong> Uses the least amount of material necessary</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PackagingSuggestions;