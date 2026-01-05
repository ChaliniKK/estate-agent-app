#Estate Agent Property Search Application
**University of Westminster Coursework - 5COSC026W Advanced Client-Side Web Development**

**Student: M.A.Chalini Kaushalya**

**Student ID: w2153565/20241143**

##Project Overview
A responsive single-page application for searching and managing property listings, built with React. The application mimics RightMove.co.uk functionality with advanced search, favourites management, and detailed property views.


##Live Application
**URL:** https://chalinikk.github.io/estate-agent-app/

##GitHub Repository
**URL:** https://github.com/ChaliniKK/estate-agent-app

## Technical Implementation

### **Core Components**
- `App.js` - Main application with state management
- `SearchForm.js` - Advanced search with 5 filtering criteria
- `PropertyList.js` - Responsive property grid display
- `PropertyPage.js` - Detailed property view with tabs
- `FavouritesList.js` - Drag-and-drop favourites sidebar

### **Key Features**
1. **Advanced Search** - Filter by type, price, bedrooms, date, postcode
2. **Favourites System** - Add via button or drag-and-drop
3. **Property Gallery** - 6-8 images per property with navigation
4. **Responsive Design** - Mobile-first approach with media queries
5. **Client-Side Security** - CSP headers and input validation

### **Testing**
- 5 meaningful Jest tests in `FivePassingTests.test.js`
- Tests cover: price calculation, formatting, filtering, validation, comparisons
- All tests pass successfully

## Running Tests
```bash
npm test -- FivePassingTests.test.js --watchAll=false
