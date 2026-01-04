import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const PropertyPage = ({ property, onBack, onAddToFavourites, isFavourite }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? property.pictures.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === property.pictures.length - 1 ? 0 : prev + 1
    );
  };

  const getGoogleMapsUrl = () => {
    if (property.coordinates) {
      return `https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`;
    }
    return `https://www.google.com/maps?q=${property.location}&output=embed`;
  };

  return (
    <div className="property-page">
      <button onClick={onBack} className="back-button">
        ← Back to Search
      </button>
      <div className="property-header">
        <h1>
          {property.type} in {property.location}
        </h1>
        <div className="property-price">
          <h2>{formatPrice(property.price)}</h2>
          <button
            className={`favourite-btn-large ${isFavourite ? "active" : ""}`}
            onClick={() => onAddToFavourites(property)}
          >
            {isFavourite ? "★ Favourited" : "☆ Add to Favourites"}
          </button>
        </div>
      </div>
      <div className="property-gallery">
        <div className="main-image">
          <img
            src={property.pictures[selectedImage]}
            alt={`Property view ${selectedImage + 1}`}
            onClick={() => setIsModalOpen(true)}
          />
          <button className="nav-btn prev" onClick={handlePrevImage}>
            ‹
          </button>
          <button className="nav-btn next" onClick={handleNextImage}>
            ›
          </button>
        </div>

        <div className="thumbnails">
          {property.pictures.map((pic, index) => (
            <img
              key={index}
              src={pic}
              alt={`Thumbnail ${index + 1}`}
              className={selectedImage === index ? "active" : ""}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>
      
      <div className="property-details">
        <TabsComponent property={property} />
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <img
              src={property.pictures[selectedImage]}
              alt="Full size view"
              className="modal-image"
            />
            <div className="modal-thumbnails">
              {property.pictures.map((pic, index) => (
                <img
                  key={index}
                  src={pic}
                  alt={`Thumbnail ${index + 1}`}
                  className={selectedImage === index ? "active" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyPage;
