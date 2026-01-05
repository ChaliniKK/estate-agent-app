Estate Agent Property Search Application
University of Westminster Coursework - 5COSC026W Advanced Client-Side Web Development

Student: M.A.Chalini Kaushalya

Student ID: w2153565/20241143

📋 Project Overview
A responsive single-page application for searching and managing property listings, built with React. The application mimics RightMove.co.uk functionality with advanced search, favourites management, and detailed property views.

🚀 Live Demo
Live Application: [Deployed URL here]

GitHub Repository: [Your GitHub repo URL here]

✨ Features
Core Functionality
🔍 Advanced Property Search with multiple criteria:

Property type (House/Flat/Any)

Price range filtering

Bedroom count filtering

Date added filtering

Postcode area search

⭐ Favourites Management with dual functionality:

Add/remove via heart buttons

Drag-and-drop support

Clear all favourites option

🏠 Property Details Pages with:

Image gallery with thumbnails

Tabbed information display

Google Maps integration

Contact agent forms

Technical Features
📱 Fully Responsive Design with mobile-first approach

🎨 Modern UI/UX with consistent design system

🔒 Client-Side Security with CSP implementation

⚡ Performance Optimized with lazy loading

🧪 Comprehensive Testing with Jest framework

🛠️ Technology Stack
Frontend: React 18.2.0

Build Tool: Create React App

Testing: Jest + React Testing Library

UI Libraries: React DnD (drag-and-drop), React Tabs

Styling: CSS3 with Flexbox/Grid

Deployment: GitHub Pages

estate-agent-app/
├── public/
│   ├── index.html
│   ├── properties.json          # Property data (7 properties)
│   └── images/
├── src/
│   ├── components/
│   │   ├── SearchForm.js        # Search form with all filters
│   │   ├── PropertyList.js      # Property grid display
│   │   ├── PropertyPage.js      # Detailed property view
│   │   ├── FavouritesList.js    # Favourites sidebar
│   │   └── TabsComponent.js     # Tabbed property details
│   ├── App.js                   # Main application component
│   ├── App.css                  # Global styles
│   ├── App.test.js              # Application tests
│   ├── FivePassingTests.test.js # Core test suite (5 tests)
│   └── index.js                 # Application entry point
└── package.json

json
🧪 Testing
The application includes comprehensive testing with Jest and React Testing Library. Five meaningful tests have been implemented:

Test Suite (FivePassingTests.test.js)
Price Calculation Test - Validates property affordability calculations

Price Formatting Test - Tests GBP currency formatting for display

Array Filtering Test - Tests filtering properties by type

Object Validation Test - Validates property data structure

Comparison Logic Test - Tests price comparison functionality

Running Tests
bash
# Run all tests
npm test

# Run specific test file
npm test -- FivePassingTests.test.js --watchAll=false
🚦 Getting Started
Prerequisites
Node.js 14+ and npm/yarn

Installation
bash
# Clone repository
git clone [your-repo-url]

# Install dependencies
npm install

# Start development server
npm start
Building for Production
bash
# Create production build
npm run build

# Deploy to GitHub Pages
npm run deploy
📱 Responsive Design
The application features two distinct layouts:

Desktop Layout
Sidebar for favourites

Main content area for search results

Grid-based property cards

Mobile Layout (iPad landscape and below)
Single column layout

Collapsible sections

Touch-friendly interface

🔒 Security Features
Content Security Policy (CSP) implemented in index.html

JSX Encoding for user input sanitization

Input Validation on all form fields

Safe Property Access with null checking

📊 JSON Data Structure
The application uses a local JSON file (public/properties.json) containing 7 diverse properties with:

Various property types (House/Flat)

Price range from £275,000 to £1,850,000

Bedroom counts from 1 to 5

Multiple postcode areas (BR1, NW1, WC1, SE1, SW1, EC1, N1)

6-8 images per property

Detailed features and amenities

🤝 Contributing
This is an individual coursework project. No contributions are accepted.

📄 License
This project is for educational purposes as part of University of Westminster coursework.