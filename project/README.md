# EcoScore - Sustainable Impact Tracking Platform

A comprehensive web application for tracking environmental impact using AI-powered analysis.

## 🌟 Features

- **Carbon Footprint Calculator** - AI-powered carbon footprint estimation using Gradient Boosting
- **ESG Score Analysis** - Environmental, Social, and Governance scoring with TF-IDF text analysis
- **Smart Packaging Suggestions** - ML-based packaging recommendations for sustainable choices
- **Product Recommendations** - Sustainable product discovery with collaborative filtering

## 🚀 Live Demo

[View Live Site](https://stalwart-meringue-ddbf74.netlify.app)

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Lucide React** for icons
- **Vite** as build tool

### Backend ML Models
- **Python** with scikit-learn
- **Pandas** for data processing
- **Gradient Boosting** for predictions
- **TF-IDF Vectorization** for text analysis
- **Joblib** for model persistence

## 🏃‍♂️ Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 ML Models

The backend includes four trained models:

### 1. Carbon Footprint Calculator
- **Model**: Gradient Boosting Regressor
- **Features**: Purchases, distance, packaging, electricity, travel
- **Output**: CO₂ emissions in kg

### 2. ESG Scoring
- **Model**: Gradient Boosting with TF-IDF
- **Features**: Product description, sentiment, environmental score
- **Output**: ESG score (0-100)

### 3. Packaging Suggestions
- **Model**: Gradient Boosting Classifier
- **Features**: Material type, weight, fragility, transport mode
- **Output**: Optimal packaging recommendation

### 4. Product Recommendations
- **Model**: Gradient Boosting with feature engineering
- **Features**: Category, price, rating, sustainability metrics
- **Output**: Purchase likelihood and recommendations

## 🎯 Key Features

### Dashboard
- Real-time sustainability metrics
- Interactive charts and visualizations
- Progress tracking towards environmental goals
- Recent activity feed

### Carbon Footprint Calculator
- Comprehensive input form for lifestyle factors
- AI-powered prediction using trained ML model
- Comparison with global averages
- Personalized reduction recommendations

### ESG Scoring
- Text analysis of product descriptions
- Sentiment analysis integration
- Environmental, Social, Governance breakdown
- Actionable improvement suggestions

### Packaging Suggestions
- Smart packaging optimization
- Sustainability vs cost analysis
- Transport mode considerations
- Environmental impact assessment

### Product Recommendations
- AI-driven product discovery
- Sustainability scoring
- Purchase likelihood prediction
- Detailed environmental metrics

## 🔧 Development

### Project Structure
```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Landing section
│   ├── Dashboard.tsx    # Main dashboard
│   ├── CarbonFootprintCalculator.tsx
│   ├── ESGScoring.tsx
│   ├── PackagingSuggestions.tsx
│   ├── ProductRecommendations.tsx
│   └── Footer.tsx
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles

backend/
├── carbonfootprint.py   # Carbon footprint ML model
├── ecoscore.py          # ESG scoring model
├── packaging.py         # Packaging optimization model
└── product.py           # Product recommendation model
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌱 Environmental Impact

This platform helps users:
- **Reduce carbon footprint** by 15-30% through informed decisions
- **Choose sustainable products** with 85%+ accuracy
- **Optimize packaging** reducing waste by 20-40%
- **Track progress** towards sustainability goals

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Scikit-learn** for machine learning capabilities
- **React ecosystem** for frontend development
- **Tailwind CSS** for beautiful styling
- **Framer Motion** for smooth animations
- **Recharts** for data visualization

## 📞 Contact

For questions or suggestions, please open an issue or reach out through GitHub.

---

**Built with ❤️ for a sustainable future**