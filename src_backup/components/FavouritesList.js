import React from 'react';
import { useDrop } from 'react-dnd';

const FavouritesList = ({ favourites, onRemoveFavourite, onClearFavourites, onPropertyClick }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'property',
    drop: () => ({ type: 'remove' }),
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

  return (
    <div className="favourites-sidebar">
      <div className="favourites-header">
        <h3>Favourites ({favourites.length})</h3>
        {favourites.length > 0 && (
          <button 
            onClick={onClearFavourites}
            className="clear-btn"
            aria-label="Clear all favourites"
          >
            Clear All
          </button>
        )}
      </div>

      <div 
        ref={drop}
        className={`favourites-list ${isOver ? 'drop-remove' : ''}`}
      >
        {favourites.length === 0 ? (
          <div className="empty-favourites">
            <p>No favourites yet.</p>
            <p>Drag properties here or click the heart icon.</p>
          </div>
        ) : (
          <ul>
            {favourites.map(property => (
              <li key={property.id} className="favourite-item">
                <div className="favourite-info">
                  <h4 onClick={() => onPropertyClick(property)}>
                    {property.type} - {property.bedrooms} bed
                  </h4>
                  <p className="favourite-price">{formatPrice(property.price)}</p>
                  <p className="favourite-location">{property.location}</p>
                </div>
                <div className="favourite-actions">
                  <button 
                    onClick={() => onPropertyClick(property)}
                    className="view-btn"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => onRemoveFavourite(property.id)}
                    className="remove-btn"
                    aria-label="Remove from favourites"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="favourites-instructions">
        <p>💡 Drag properties here to add to favourites</p>
        <p>💡 Drag favourites out to remove</p>
      </div>
    </div>
  );
};

export default FavouritesList;