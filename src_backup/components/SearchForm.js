import React, { useState } from 'react';

const SearchForm = ({ onSearch, properties }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: '',
    dateTo: '',
    postcode: ''
  });

  const propertyTypes = ['any', 'House', 'Flat'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchCriteria);
  };

  const handleReset = () => {
    setSearchCriteria({
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: '',
      dateTo: '',
      postcode: ''
    });
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="property-type">Property Type:</label>
          <select 
            id="property-type"
            name="type" 
            value={searchCriteria.type}
            onChange={handleChange}
            className="form-select"
          >
            {propertyTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="min-price">Min Price (£):</label>
          <input
            id="min-price"
            type="number"
            name="minPrice"
            value={searchCriteria.minPrice}
            onChange={handleChange}
            min="0"
            placeholder="Min price"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="max-price">Max Price (£):</label>
          <input
            id="max-price"
            type="number"
            name="maxPrice"
            value={searchCriteria.maxPrice}
            onChange={handleChange}
            min="0"
            placeholder="Max price"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="min-bedrooms">Min Bedrooms:</label>
          <input
            id="min-bedrooms"
            type="number"
            name="minBedrooms"
            value={searchCriteria.minBedrooms}
            onChange={handleChange}
            min="0"
            placeholder="Min"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="max-bedrooms">Max Bedrooms:</label>
          <input
            id="max-bedrooms"
            type="number"
            name="maxBedrooms"
            value={searchCriteria.maxBedrooms}
            onChange={handleChange}
            min="0"
            placeholder="Max"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date-from">Added After:</label>
          <input
            id="date-from"
            type="date"
            name="dateFrom"
            value={searchCriteria.dateFrom}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date-to">Added Before:</label>
          <input
            id="date-to"
            type="date"
            name="dateTo"
            value={searchCriteria.dateTo}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="postcode">Postcode Area:</label>
          <input
            id="postcode"
            type="text"
            name="postcode"
            value={searchCriteria.postcode}
            onChange={handleChange}
            placeholder="e.g., BR1, NW1"
            className="form-input"
            pattern="[A-Za-z]{1,2}[0-9]{1,2}"
            title="Enter postcode area (e.g., BR1, NW1)"
          />
        </div>
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          Search Properties
        </button>
        <button type="button" onClick={handleReset} className="btn btn-secondary">
          Reset Filters
        </button>
      </div>
    </form>
  );
};


export default SearchForm;