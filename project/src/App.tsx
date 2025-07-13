import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import CarbonFootprintCalculator from './components/CarbonFootprintCalculator';
import ESGScoring from './components/ESGScoring';
import PackagingSuggestions from './components/PackagingSuggestions';
import ProductRecommendations from './components/ProductRecommendations';
import Footer from './components/Footer';

type ActiveSection = 'dashboard' | 'carbon' | 'esg' | 'packaging' | 'products';

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'carbon':
        return <CarbonFootprintCalculator />;
      case 'esg':
        return <ESGScoring />;
      case 'packaging':
        return <PackagingSuggestions />;
      case 'products':
        return <ProductRecommendations />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {activeSection === 'dashboard' && <Hero setActiveSection={setActiveSection} />}
      
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-8"
      >
        {renderActiveSection()}
      </motion.main>
      
      <Footer />
    </div>
  );
}

export default App;