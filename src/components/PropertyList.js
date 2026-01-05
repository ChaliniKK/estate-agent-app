import React from 'react';
import { useDrop, useDrag } from 'react-dnd';

const PropertyList = ({ properties, onPropertyClick, onAddToFavourites, favourites }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'property',
    drop: (item) => {
      console.log('Item dropped back to property list:', item);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(price);
  };

  const isFavourite = (propertyId) => {
    return favourites.some(fav => fav.id === propertyId);
  };

  return (
    <div className="property-list-container">
      <h2>Available Properties ({properties.length})</h2>
      
      <div 
        ref={drop}
        className={`property-list ${isOver ? 'drop-active' : ''}`}
      >
        {properties.length === 0 ? (
          <div className="no-results">
            <p>No properties match your search criteria.</p>
            <p>Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map(property => (
              <PropertyCard 
                key={property.id}
                property={property}
                onPropertyClick={onPropertyClick}
                onAddToFavourites={onAddToFavourites}
                isFavourite={isFavourite(property.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Draggable card component
const PropertyCard = ({ property, onPropertyClick, onAddToFavourites, isFavourite }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'property',
    item: { property },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div 
      ref={drag}
      className="property-card"
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move'
      }}
    >
      <div className="property-image">
        <img 
          src={property.pictures[0] || '/placeholder.jpg'} 
          alt={property.type} 
          onClick={() => onPropertyClick(property)}
          style={{ cursor: 'pointer' }}
        />
        <button 
          className={`favourite-btn ${isFavourite ? 'active' : ''}`}
          onClick={() => onAddToFavourites(property)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
        >
          ♥
        </button>
      </div>
      
      <div className="property-info">
        <h3 onClick={() => onPropertyClick(property)} style={{cursor: 'pointer'}}>
          {property.type} in {property.location}
        </h3>
        <p className="price">{formatPrice(property.price)}</p>
        <p className="bedrooms">{property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}</p>
        <p className="description">{property.description.substring(0, 100)}...</p>
        <div className="property-actions">
          <button 
            className="btn-view"
            onClick={() => onPropertyClick(property)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;