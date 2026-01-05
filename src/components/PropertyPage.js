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
            src={`${process.env.PUBLIC_URL}/${property.pictures[selectedImage]}`}
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
              src={`${process.env.PUBLIC_URL}/${pic}`}
              alt={`Thumbnail ${index + 1}`}
              className={selectedImage === index ? "active" : ""}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      </div>
      
      <div className="property-details">
        <Tabs>
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Features</Tab>
            <Tab>Location</Tab>
            <Tab>Contact</Tab>
          </TabList>
          
          <TabPanel>
            <div className="overview-section">
              <h3>Property Overview</h3>
              <p><strong>Property Type:</strong> {property.type}</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
              <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
              <p><strong>Size:</strong> {property.size || "N/A"} sq ft</p>
              <p><strong>Year Built:</strong> {property.yearBuilt || "N/A"}</p>
              <p><strong>Description:</strong> {property.description}</p>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="features-section">
              <h3>Key Features</h3>
              <ul>
                {property.features && property.features.length > 0 ? (
                  property.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))
                ) : (
                  <li>No specific features listed</li>
                )}
              </ul>
              <div className="amenities">
                <h4>Amenities</h4>
                <ul>
                  <li>Parking: {property.parking || "Not specified"}</li>
                  <li>Garden: {property.garden ? "Yes" : "No"}</li>
                  <li>Balcony: {property.balcony ? "Yes" : "No"}</li>
                  <li>Fireplace: {property.fireplace ? "Yes" : "No"}</li>
                </ul>
              </div>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="location-section">
              <h3>Location Details</h3>
              <p><strong>Address:</strong> {property.address || property.location}</p>
              <p><strong>Postcode:</strong> {property.postcode || "N/A"}</p>
              <p><strong>Neighborhood:</strong> {property.neighborhood || "N/A"}</p>
              
              <div className="map-container">
                <h4>Map Location</h4>
                <iframe
                  title="Property Location"
                  src={getGoogleMapsUrl()}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="contact-section">
              <h3>Contact Agent</h3>
              <div className="agent-info">
                <p><strong>Agent:</strong> {property.agent || "ABC Real Estate"}</p>
                <p><strong>Phone:</strong> {property.agentPhone || "020 7123 4567"}</p>
                <p><strong>Email:</strong> {property.agentEmail || "agent@abcrealestate.com"}</p>
                <p><strong>Office:</strong> {property.agentOffice || "123 High Street, London"}</p>
              </div>
              <form className="contact-form">
                <h4>Send an Inquiry</h4>
                <div className="form-group">
                  <label htmlFor="name">Your Name:</label>
                  <input type="text" id="name" placeholder="John Cena" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email:</label>
                  <input type="email" id="email" placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Your Phone:</label>
                  <input type="tel" id="phone" placeholder="07123 456789" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea 
                    id="message" 
                    placeholder="I'm interested in this property and would like to arrange a viewing..."
                    rows="4"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Inquiry
                </button>
              </form>
            </div>
          </TabPanel>
        </Tabs>
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
              src={`${process.env.PUBLIC_URL}/${property.pictures[selectedImage]}`}
              alt="Full size view"
              className="modal-image"
            />
            <div className="modal-thumbnails">
              {property.pictures.map((pic, index) => (
                <img
                  key={index}
                  src={`${process.env.PUBLIC_URL}/${pic}`}
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