import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TabsComponent = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getGoogleMapsUrl = () => {
    if (property.coordinates) {
      return `https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`;
    }
    return `https://www.google.com/maps?q=${property.location}&output=embed`;
  };

  return (
    <Tabs>
      <TabList>
        <Tab>Description</Tab>
        <Tab>Floor Plan</Tab>
        <Tab>Location</Tab>
        <Tab>Details</Tab>
      </TabList>

      <TabPanel>
        <div className="tab-content">
          <h3>Full Description</h3>
          <p>{property.longDescription || property.description}</p>
        </div>
      </TabPanel>

      <TabPanel>
        <div className="tab-content">
          <h3>Floor Plan</h3>
          {property.floorPlan ? (
            <img 
              src={property.floorPlan} 
              alt="Floor plan" 
              className="floor-plan"
            />
          ) : (
            <p>Floor plan not available.</p>
          )}
        </div>
      </TabPanel>

      <TabPanel>
        <div className="tab-content">
          <h3>Location</h3>
          <div className="map-container">
            <iframe
              title="Property location"
              src={getGoogleMapsUrl()}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </TabPanel>

      <TabPanel>
        <div className="tab-content">
          <h3>Property Details</h3>
          <div className="details-grid">
            <div className="detail-item">
              <strong>Type:</strong>
              <span>{property.type}</span>
            </div>
            <div className="detail-item">
              <strong>Bedrooms:</strong>
              <span>{property.bedrooms}</span>
            </div>
            <div className="detail-item">
              <strong>Price:</strong>
              <span>{formatPrice(property.price)}</span>
            </div>
            <div className="detail-item">
              <strong>Tenure:</strong>
              <span>{property.tenure}</span>
            </div>
            <div className="detail-item">
              <strong>Postcode:</strong>
              <span>{property.postcode}</span>
            </div>
            <div className="detail-item">
              <strong>Added:</strong>
              <span>{property.added}</span>
            </div>
          </div>
        </div>
      </TabPanel>
    </Tabs>
  );
};

export default TabsComponent;