import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchForm from './components/SearchForm';
import PropertyList from './components/PropertyList';
import PropertyPage from './components/PropertyPage';
import FavouritesList from './components/FavouritesList';
import './App.css';

function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    // Load properties from JSON file
    fetch(`${process.env.PUBLIC_URL}/properties.json`)
    .then(response => response.json())
      .then(data => {
        setProperties(data.properties);
        setFilteredProperties(data.properties);
      })
      .catch(error => console.error('Error loading properties:', error));
    
    // Load favourites from localStorage
    const savedFavourites = localStorage.getItem('propertyFavourites');
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }
  }, []);

  useEffect(() => {
    // Save favourites to localStorage
    localStorage.setItem('propertyFavourites', JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = (criteria) => {
    setSearchPerformed(true);
    
    let filtered = properties;

    // Type filter
    if (criteria.type && criteria.type !== 'any') {
      filtered = filtered.filter(p => p.type === criteria.type);
    }

    // Price filter
    if (criteria.minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(criteria.minPrice));
    }
    if (criteria.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(criteria.maxPrice));
    }

    // Bedrooms filter
    if (criteria.minBedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(criteria.minBedrooms));
    }
    if (criteria.maxBedrooms) {
      filtered = filtered.filter(p => p.bedrooms <= parseInt(criteria.maxBedrooms));
    }

    // Date filter
    if (criteria.dateFrom) {
      filtered = filtered.filter(p => new Date(p.added) >= new Date(criteria.dateFrom));
    }
    if (criteria.dateTo) {
      filtered = filtered.filter(p => new Date(p.added) <= new Date(criteria.dateTo));
    }

    // Postcode filter
    if (criteria.postcode) {
      filtered = filtered.filter(p => 
        p.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  };

  const handleAddToFavourites = (property) => {
    if (!favourites.some(fav => fav.id === property.id)) {
      setFavourites(prev => [...prev, property]);
    }
  };

  const handleRemoveFavourite = (propertyId) => {
    setFavourites(prev => prev.filter(fav => fav.id !== propertyId));
  };

  const handleClearFavourites = () => {
    setFavourites([]);
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
  };

  const handleBackToSearch = () => {
    setSelectedProperty(null);
  };

  const isPropertyFavourite = (propertyId) => {
    return favourites.some(fav => fav.id === propertyId);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <header className="app-header">
          <h1> 𖡼.𖤣𖥧 🏠︎ RightMove Property Search 𖠿 𖡼.𖤣𖥧</h1>
          <p>Find your dream home with our advanced search</p>
        </header>

        <div className="app-container">
          {selectedProperty ? (
            <PropertyPage
              property={selectedProperty}
              onBack={handleBackToSearch}
              onAddToFavourites={handleAddToFavourites}
              isFavourite={isPropertyFavourite(selectedProperty.id)}
            />
          ) : (
            <>
              <div className="search-section">
                <div className="search-container">
                  <SearchForm 
                    onSearch={handleSearch} 
                    properties={properties}
                  />
                </div>

                <div className="main-content">
                  <FavouritesList
                    favourites={favourites}
                    onRemoveFavourite={handleRemoveFavourite}
                    onClearFavourites={handleClearFavourites}
                    onPropertyClick={handlePropertyClick}
                    onAddToFavourites={handleAddToFavourites} 
                  />

                  <div className="results-section">
                    {searchPerformed ? (
                      <PropertyList
                        properties={filteredProperties}
                        onPropertyClick={handlePropertyClick}
                        onAddToFavourites={handleAddToFavourites}
                        favourites={favourites}
                      />
                    ) : (
                      <div className="welcome-message">
                        <h2>Welcome to Property Search</h2>
                        <p>Use the search form to find properties matching your criteria.</p>
                        <p>Total properties available: {properties.length}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <footer className="app-footer">
          <p>© 2023 Property Search Application | University of Westminster Coursework</p>
          <p>This is a client-side React application for educational purposes.</p>
          <div className="security-badge">
            Client-Side Security: CSP & JSX Encoding Implemented
          </div>
        </footer>
      </div>
    </DndProvider>
  );
}

export default App;