import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropertyList from '../PropertyList';

describe('PropertyList Component - Comprehensive Tests', () => {
  const mockProperties = [
    {
      id: 'prop1',
      type: 'House',
      bedrooms: 3,
      price: 750000,
      description: 'Test property description 1',
      location: 'Location 1 BR1',
      pictures: ['image1.jpg']
    },
    {
      id: 'prop2',
      type: 'Flat',
      bedrooms: 2,
      price: 399995,
      description: 'Test property description 2',
      location: 'Location 2 NW1',
      pictures: ['image2.jpg']
    }
  ];

  const mockOnPropertyClick = jest.fn();
  const mockOnAddToFavourites = jest.fn();

  beforeEach(() => {
    mockOnPropertyClick.mockClear();
    mockOnAddToFavourites.mockClear();
  });

  test('1. Renders property cards with correct information', () => {
    render(
      <PropertyList
        properties={mockProperties}
        onPropertyClick={mockOnPropertyClick}
        onAddToFavourites={mockOnAddToFavourites}
        favourites={[]}
      />
    );

    // Check property count
    expect(screen.getByText(/Available Properties \(2\)/i)).toBeInTheDocument();
    
    // Check property details are displayed
    expect(screen.getByText(/House in Location 1 BR1/i)).toBeInTheDocument();
    expect(screen.getByText(/Flat in Location 2 NW1/i)).toBeInTheDocument();
    
    // Check prices are formatted
    expect(screen.getByText(/£750,000/)).toBeInTheDocument();
    expect(screen.getByText(/£399,995/)).toBeInTheDocument();
    
    // Check bedroom count
    expect(screen.getByText(/3 bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/2 bedrooms/i)).toBeInTheDocument();
    
    // Check descriptions
    expect(screen.getByText(/Test property description 1.../i)).toBeInTheDocument();
    expect(screen.getByText(/Test property description 2.../i)).toBeInTheDocument();
  });

  test('2. Displays "no results" message when empty', () => {
    render(
      <PropertyList
        properties={[]}
        onPropertyClick={mockOnPropertyClick}
        onAddToFavourites={mockOnAddToFavourites}
        favourites={[]}
      />
    );

    expect(screen.getByText(/No properties match your search criteria/i)).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting your filters/i)).toBeInTheDocument();
  });

  test('3. Property click functionality', () => {
    render(
      <PropertyList
        properties={mockProperties}
        onPropertyClick={mockOnPropertyClick}
        onAddToFavourites={mockOnAddToFavourites}
        favourites={[]}
      />
    );

    // Click on property title
    fireEvent.click(screen.getByText(/House in Location 1 BR1/i));
    expect(mockOnPropertyClick).toHaveBeenCalledWith(mockProperties[0]);
    
    // Click on "View Details" button
    const viewButtons = screen.getAllByText(/View Details/i);
    fireEvent.click(viewButtons[0]);
    expect(mockOnPropertyClick).toHaveBeenCalledWith(mockProperties[0]);
  });

  test('4. Add to favourites button functionality', () => {
    render(
      <PropertyList
        properties={mockProperties}
        onPropertyClick={mockOnPropertyClick}
        onAddToFavourites={mockOnAddToFavourites}
        favourites={[]}
      />
    );

    // Find and click favourite button
    const favouriteButtons = screen.getAllByLabelText(/Add to favourites/i);
    expect(favouriteButtons).toHaveLength(2);
    
    fireEvent.click(favouriteButtons[0]);
    expect(mockOnAddToFavourites).toHaveBeenCalledWith(mockProperties[0]);
    
    fireEvent.click(favouriteButtons[1]);
    expect(mockOnAddToFavourites).toHaveBeenCalledWith(mockProperties[1]);
  });

  test('5. Favourite button state for already favourited properties', () => {
    // Mark first property as favourite
    render(
      <PropertyList
        properties={mockProperties}
        onPropertyClick={mockOnPropertyClick}
        onAddToFavourites={mockOnAddToFavourites}
        favourites={[mockProperties[0]]}
      />
    );

    // First property should have active favourite button
    const favouriteButtons = screen.getAllByLabelText(/Add to favourites|Remove from favourites/i);
    expect(favouriteButtons[0]).toHaveAttribute('aria-label', 'Remove from favourites');
    expect(favouriteButtons[0]).toHaveClass('active');
    
    // Second property should have add favourite button
    expect(favouriteButtons[1]).toHaveAttribute('aria-label', 'Add to favourites');
  });

  test('6. Drag and drop attributes', () => {
    render(
      <PropertyList
        properties={mockProperties}
        onPropertyClick={mockOnPropertyClick}
        onAddToFavourites={mockOnAddToFavourites}
        favourites={[]}
      />
    );

    // Property cards should be draggable
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
      expect(card).toHaveAttribute('draggable', 'true');
    });
  });

  test('7. Responsive grid layout', () => {
    render(
      <PropertyList
        properties={mockProperties}
        onPropertyClick={mockOnPropertyClick}
        onAddToFavourites={mockOnAddToFavourites}
        favourites={[]}
      />
    );

    const propertiesGrid = document.querySelector('.properties-grid');
    expect(propertiesGrid).toBeInTheDocument();
    expect(propertiesGrid).toHaveStyle('display: grid');
  });

  test('8. Property images display', () => {
    render(
      <PropertyList
        properties={mockProperties}
        onPropertyClick={mockOnPropertyClick}
        onAddToFavourites={mockOnAddToFavourites}
        favourites={[]}
      />
    );

    const propertyImages = screen.getAllByRole('img');
    expect(propertyImages.length).toBeGreaterThan(0);
    
    // Check images have alt text
    propertyImages.forEach(img => {
      expect(img).toHaveAttribute('alt');
    });
  });

  test('9. Truncated description length', () => {
    const longDescriptionProperty = {
      id: 'prop3',
      type: 'House',
      bedrooms: 4,
      price: 1000000,
      description: 'This is a very long property description that should be truncated when displayed in the property list card. It contains many details about the property features, location, and amenities.',
      location: 'Long Location',
      pictures: ['image3.jpg']
    };

    render(
      <PropertyList
        properties={[longDescriptionProperty]}
        onPropertyClick={mockOnPropertyClick}
        onAddToFavourites={mockOnAddToFavourites}
        favourites={[]}
      />
    );

    // Description should be truncated
    const description = screen.getByText(/This is a very long property description that should be truncated.../i);
    expect(description).toBeInTheDocument();
    expect(description.textContent.endsWith('...')).toBe(true);
  });
});