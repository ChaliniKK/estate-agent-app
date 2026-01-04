import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyPage from '../PropertyPage';

describe('PropertyPage Component - Comprehensive Tests', () => {
  const mockProperty = {
    id: 'prop1',
    type: 'House',
    bedrooms: 3,
    price: 750000,
    description: 'Short description',
    location: 'Test Location BR1',
    postcode: 'BR1',
    pictures: [
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
      'image4.jpg',
      'image5.jpg',
      'image6.jpg'
    ],
    added: '2023-01-15',
    tenure: 'Freehold',
    longDescription: 'This is a very long detailed description of the property with all features and amenities listed in full detail.',
    floorPlan: 'floorplan1.jpg',
    coordinates: { lat: 51.5074, lng: -0.1278 }
  };

  const mockOnBack = jest.fn();
  const mockOnAddToFavourites = jest.fn();

  beforeEach(() => {
    mockOnBack.mockClear();
    mockOnAddToFavourites.mockClear();
  });

  test('1. Renders all property information correctly', () => {
    render(
      <PropertyPage
        property={mockProperty}
        onBack={mockOnBack}
        onAddToFavourites={mockOnAddToFavourites}
        isFavourite={false}
      />
    );

    expect(screen.getByText(/House in Test Location BR1/i)).toBeInTheDocument();
    expect(screen.getByText(/£750,000/)).toBeInTheDocument();
  });

  test('2. Back button functionality', () => {
    render(
      <PropertyPage
        property={mockProperty}
        onBack={mockOnBack}
        onAddToFavourites={mockOnAddToFavourites}
        isFavourite={false}
      />
    );

    fireEvent.click(screen.getByText(/← Back to Search/i));
    expect(mockOnBack).toHaveBeenCalled();
  });

  // Add more tests as needed
});

