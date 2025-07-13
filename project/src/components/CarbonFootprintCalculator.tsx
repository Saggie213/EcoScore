import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Zap, TrendingDown, Info } from 'lucide-react';

const CarbonFootprintCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    totalPurchases: '',
    avgDistance: '',
    preferredPackaging: 'cardboard',
    returnsPercentage: '',
    electricityUsage: '',
    travelDistance: '',
    serviceUsage: ''
  });

  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateCarbonFootprint = async () => {
    setIsCalculating(true);
    
    // Simulate API call to your ML model
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock calculation based on your model's logic
    const baseFootprint = 
      (parseFloat(formData.totalPurchases) || 0) * 2.5 +
      (parseFloat(formData.avgDistance) || 0) * 0.12 +
      (parseFloat(formData.electricityUsage) || 0) * 0.4 +
      (parseFloat(formData.travelDistance) || 0) * 0.2 +
      (parseFloat(formData.serviceUsage) || 0) * 1.8;
    
    const packagingMultiplier = formData.preferredPackaging === 'plastic' ? 1.2 : 
                               formData.preferredPackaging === 'cardboard' ? 1.0 : 0.8;
    
    const returnsImpact = (parseFloat(formData.returnsPercentage) || 0) * 0.5;
    
    const finalFootprint = (baseFootprint * packagingMultiplier) + returnsImpact;
    
    setResult(Math.round(finalFootprint));
    setIsCalculating(false);
  };

  const getFootprintCategory = (footprint: number) => {
    if (footprint < 50) return { category: 'Excellent', color: 'green', description: 'Well below average' };
    if (footprint < 100) return { category: 'Good', color: 'emerald', description: 'Below average' };
    if (footprint < 150) return { category: 'Average', color: 'yellow', description: 'Typical footprint' };
    if (footprint < 200) return { category: 'High', color: 'orange', description: 'Above average' };
    return { category: 'Very High', color: 'red', description: 'Significantly above average' };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Carbon Footprint Calculator</h1>
        <p className="text-gray-600">Calculate your environmental impact using our AI-powered model</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Purchases (per month)
              </label>
              <input
                type="number"
                name="totalPurchases"
                value={formData.totalPurchases}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g., 15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Shipping Distance (km)
              </label>
              <input
                type="number"
                name="avgDistance"
                value={formData.avgDistance}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g., 450"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Packaging
              </label>
              <select
                name="preferredPackaging"
                value={formData.preferredPackaging}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="cardboard">Cardboard</option>
                <option value="plastic">Plastic</option>
                <option value="biodegradable">Biodegradable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Returns Percentage (%)
              </label>
              <input
                type="number"
                name="returnsPercentage"
                value={formData.returnsPercentage}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g., 3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Electricity Usage (kWh)
              </label>
              <input
                type="number"
                name="electricityUsage"
                value={formData.electricityUsage}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g., 320"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Travel Distance (km)
              </label>
              <input
                type="number"
                name="travelDistance"
                value={formData.travelDistance}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g., 1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Usage (hours/month)
              </label>
              <input
                type="number"
                name="serviceUsage"
                value={formData.serviceUsage}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                placeholder="e.g., 25"
              />
            </div>

            <button
              onClick={calculateCarbonFootprint}
              disabled={isCalculating}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isCalculating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Calculate Footprint</span>
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
          {result !== null && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Carbon Footprint</h3>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  {result} kg CO₂e
                </div>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  getFootprintCategory(result).color === 'green' ? 'bg-green-100 text-green-800' :
                  getFootprintCategory(result).color === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                  getFootprintCategory(result).color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                  getFootprintCategory(result).color === 'orange' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {getFootprintCategory(result).category}
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  {getFootprintCategory(result).description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Global Average</span>
                  <span className="font-medium">120 kg CO₂e</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <span className="text-sm text-gray-600">Your Footprint</span>
                  <span className="font-medium text-emerald-600">{result} kg CO₂e</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-gray-600">Difference</span>
                  <span className={`font-medium flex items-center space-x-1 ${
                    result < 120 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingDown className="w-4 h-4" />
                    <span>{Math.abs(result - 120)} kg CO₂e {result < 120 ? 'below' : 'above'}</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">Reduction Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Choose biodegradable packaging when possible</li>
              <li>• Reduce return rates by reading product descriptions carefully</li>
              <li>• Use renewable energy sources for electricity</li>
              <li>• Combine purchases to reduce shipping frequency</li>
              <li>• Consider local products to reduce shipping distances</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;