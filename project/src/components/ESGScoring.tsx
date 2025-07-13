import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';

const ESGScoring: React.FC = () => {
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    sentiment: 'neutral',
    environmentalScore: ''
  });

  const [result, setResult] = useState<{
    esgScore: number;
    category: string;
    recommendations: string[];
  } | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const analyzeESGScore = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call to your ML model
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock ESG scoring based on your model's logic
    const baseScore = parseFloat(formData.environmentalScore) || 50;
    const sentimentMultiplier = 
      formData.sentiment === 'positive' ? 1.2 :
      formData.sentiment === 'negative' ? 0.8 : 1.0;
    
    // Text analysis simulation (would use your TF-IDF model)
    const sustainabilityKeywords = ['eco', 'green', 'sustainable', 'renewable', 'organic', 'recycled'];
    const negativeKeywords = ['toxic', 'polluting', 'waste', 'harmful', 'chemical'];
    
    const text = (formData.productName + ' ' + formData.description).toLowerCase();
    const positiveMatches = sustainabilityKeywords.filter(word => text.includes(word)).length;
    const negativeMatches = negativeKeywords.filter(word => text.includes(word)).length;
    
    const textScore = (positiveMatches * 5) - (negativeMatches * 8);
    
    const finalScore = Math.max(0, Math.min(100, Math.round(
      (baseScore * sentimentMultiplier) + textScore
    )));

    const getCategory = (score: number) => {
      if (score >= 80) return 'Excellent';
      if (score >= 60) return 'Good';
      if (score >= 40) return 'Fair';
      return 'Poor';
    };

    const getRecommendations = (score: number) => {
      if (score >= 80) {
        return [
          'Maintain current sustainable practices',
          'Consider becoming a sustainability leader in your industry',
          'Share best practices with stakeholders'
        ];
      } else if (score >= 60) {
        return [
          'Implement additional renewable energy sources',
          'Improve waste reduction strategies',
          'Enhance supply chain transparency'
        ];
      } else if (score >= 40) {
        return [
          'Develop comprehensive sustainability strategy',
          'Invest in cleaner technologies',
          'Establish environmental management systems'
        ];
      } else {
        return [
          'Urgent need for environmental impact assessment',
          'Implement immediate waste reduction measures',
          'Consider switching to sustainable materials'
        ];
      }
    };

    setResult({
      esgScore: finalScore,
      category: getCategory(finalScore),
      recommendations: getRecommendations(finalScore)
    });
    
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'emerald';
    if (score >= 40) return 'yellow';
    return 'red';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ESG Score Analysis</h1>
        <p className="text-gray-600">Analyze Environmental, Social, and Governance performance using AI</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., Solar-powered Water Heater"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Describe the product's environmental impact, sustainability features, and social benefits..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Market Sentiment
              </label>
              <select
                name="sentiment"
                value={formData.sentiment}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Environmental Score (0-100)
              </label>
              <input
                type="number"
                name="environmentalScore"
                value={formData.environmentalScore}
                onChange={handleInputChange}
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="e.g., 75"
              />
            </div>

            <button
              onClick={analyzeESGScore}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <BarChart3 className="w-5 h-5" />
                  <span>Analyze ESG Score</span>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-4">ESG Score Results</h3>
                
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {result.esgScore}/100
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    getScoreColor(result.esgScore) === 'green' ? 'bg-green-100 text-green-800' :
                    getScoreColor(result.esgScore) === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                    getScoreColor(result.esgScore) === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {result.category}
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Environmental</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-green-500 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min(100, result.esgScore + 5)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Math.min(100, result.esgScore + 5)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Social</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-500 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.max(0, result.esgScore - 10)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{Math.max(0, result.esgScore - 10)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Governance</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-purple-500 rounded-full transition-all duration-1000"
                          style={{ width: `${result.esgScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{result.esgScore}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
                </div>
                <ul className="space-y-3">
                  {result.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Information Panel */}
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">About ESG Scoring</h3>
            </div>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>Environmental:</strong> Climate impact, resource usage, waste management</p>
              <p><strong>Social:</strong> Labor practices, community impact, product safety</p>
              <p><strong>Governance:</strong> Business ethics, transparency, stakeholder rights</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ESGScoring;