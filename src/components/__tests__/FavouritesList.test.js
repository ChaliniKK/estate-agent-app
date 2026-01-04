import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FavouritesList from '../FavouritesList';

describe('FavouritesList Component - Comprehensive Tests', () => {
  const mockFavourites = [
    {
      id: 'prop1',
      type: 'House',
      bedrooms: 3,
      price: 750000,
      location: 'Location 1 BR1'
    },
    {
      id: 'prop2',
      type: 'Flat',
      bedrooms: 2,
      price: 399995,
      location: 'Location 2 NW1'
    }
  ];

  const mockOnRemoveFavourite = jest.fn();
  const mockOnClearFavourites = jest.fn();
  const mockOnPropertyClick = jest.fn();

  beforeEach(() => {
    mockOnRemoveFavourite.mockClear();
    mockOnClearFavourites.mockClear();
    mockOnPropertyClick.mockClear();
  });

  test('1. Renders empty state correctly', () => {
    render(
      <FavouritesList
        favourites={[]}
        onRemoveFavourite={mockOnRemoveFavourite}
        onClearFavourites={mockOnClearFavourites}
        onPropertyClick={mockOnPropertyClick}
      />
    );

    expect(screen.getByText(/Favourites \(0\)/i)).toBeInTheDocument();
    expect(screen.getByText(/No favourites yet./i)).toBeInTheDocument();
    expect(screen.getByText(/Drag properties here or click the heart icon./i)).toBeInTheDocument();
    
    // Clear button should not be visible when empty
    expect(screen.queryByText(/Clear All/i)).not.toBeInTheDocument();
  });

  test('2. Renders favourites list correctly', () => {
    render(
      <FavouritesList
        favourites={mockFavourites}
        onRemoveFavourite={mockOnRemoveFavourite}
        onClearFavourites={mockOnClearFavourites}
        onPropertyClick={mockOnPropertyClick}
      />
    );

    expect(screen.getByText(/Favourites \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear All/i)).toBeInTheDocument();
    
    // Check favourite items are displayed
    expect(screen.getByText(/House - 3 bed/i)).toBeInTheDocument();
    expect(screen.getByText(/Flat - 2 bed/i)).toBeInTheDocument();
    
    // Check prices are formatted
    expect(screen.getByText(/£750,000/)).toBeInTheDocument();
    expect(screen.getByText(/£399,995/)).toBeInTheDocument();
    
    // Check locations
    expect(screen.getByText(/Location 1 BR1/i)).toBeInTheDocument();
    expect(screen.getByText(/Location 2 NW1/i)).toBeInTheDocument();
  });

  test('3. Remove individual favourite functionality', () => {
    render(
      <FavouritesList
        favourites={mockFavourites}
        onRemoveFavourite={mockOnRemoveFavourite}
        onClearFavourites={mockOnClearFavourites}
        onPropertyClick={mockOnPropertyClick}
      />
    );

    // Find and click remove buttons
    const removeButtons = screen.getAllByLabelText(/Remove from favourites/i);
    expect(removeButtons).toHaveLength(2);
    
    fireEvent.click(removeButtons[0]);
    expect(mockOnRemoveFavourite).toHaveBeenCalledWith('prop1');
    
    fireEvent.click(removeButtons[1]);
    expect(mockOnRemoveFavourite).toHaveBeenCalledWith('prop2');
  });

  test('4. Clear all favourites functionality', () => {
    render(
      <FavouritesList
        favourites={mockFavourites}
        onRemoveFavourite={mockOnRemoveFavourite}
        onClearFavourites={mockOnClearFavourites}
        onPropertyClick={mockOnPropertyClick}
      />
    );

    const clearButton = screen.getByText(/Clear All/i);
    fireEvent.click(clearButton);
    
    expect(mockOnClearFavourites).toHaveBeenCalled();
  });

  test('5. Property click functionality in favourites', () => {
    render(
      <FavouritesList
        favourites={mockFavourites}
        onRemoveFavourite={mockOnRemoveFavourite}
        onClearFavourites={mockOnClearFavourites}
        onPropertyClick={mockOnPropertyClick}
      />
    );

    // Click on property title
    fireEvent.click(screen.getByText(/House - 3 bed/i));
    expect(mockOnPropertyClick).toHaveBeenCalledWith(mockFavourites[0]);
    
    // Click on "View" button
    const viewButtons = screen.getAllByText(/View/i);
    fireEvent.click(viewButtons[0]);
    expect(mockOnPropertyClick).toHaveBeenCalledWith(mockFavourites[0]);
  });

  test('6. Drop zone for drag and drop', () => {
    render(
      <FavouritesList
        favourites={mockFavourites}
        onRemoveFavourite={mockOnRemoveFavourite}
        onClearFavourites={mockOnClearFavourites}
        onPropertyClick={mockOnPropertyClick}
      />
    );

    const dropZone = document.querySelector('.favourites-list');
    expect(dropZone).toBeInTheDocument();
  });

  test('7. Drop instructions display', () => {
    render(
      <FavouritesList
        favourites={mockFavourites}
        onRemoveFavourite={mockOnRemoveFavourite}
        onClearFavourites={mockOnClearFavourites}
        onPropertyClick={mockOnPropertyClick}
      />
    );

    expect(screen.getByText(/💡 Drag properties here to add to favourites/i)).toBeInTheDocument();
    expect(screen.getByText(/💡 Drag favourites out to remove/i)).toBeInTheDocument();
  });

  test('8. Responsive layout', () => {
    render(
      <FavouritesList
        favourites={mockFavourites}
        onRemoveFavourite={mockOnRemoveFavourite}
        onClearFavourites={mockOnClearFavourites}
        onPropertyClick={mockOnPropertyClick}
      />
    );

    const sidebar = document.querySelector('.favourites-sidebar');
    expect(sidebar).toBeInTheDocument();
    
    const favouritesList = document.querySelector('.favourites-list');
    expect(favouritesList).toBeInTheDocument();
  });

  test('9. Empty state after clearing all', () => {
    const { rerender } = render(
      <FavouritesList
        favourites={mockFavourites}
        onRemoveFavourite={mockOnRemoveFavourite}
        onClearFavourites={mockOnClearFavourites}
        onPropertyClick={mockOnPropertyClick}
      />
    );

    // Initially has favourites
    expect(screen.getByText(/Favourites \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear All/i)).toBeInTheDocument();
    
    // Re-render with empty favourites
    rerender(
      <FavouritesList
        favourites={[]}
        onRemoveFavourite={mockOnRemoveFavourite}
        onClearFavourites={mockOnClearFavourites}
        onPropertyClick={mockOnPropertyClick}
      />
    );

    // Should show empty state
    expect(screen.getByText(/Favourites \(0\)/i)).toBeInTheDocument();
    expect(screen.getByText(/No favourites yet./i)).toBeInTheDocument();
    expect(screen.queryByText(/Clear All/i)).not.toBeInTheDocument();
  });

  test('10. Accessibility features', () => {
    render(
      <FavouritesList
        favourites={mockFavourites}
        onRemoveFavourite={mockOnRemoveFavourite}
        onClearFavourites={mockOnClearFavourites}
        onPropertyClick={mockOnPropertyClick}
      />
    );

    // Check remove buttons have proper labels
    const removeButtons = screen.getAllByLabelText(/Remove from favourites/i);
    removeButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label', 'Remove from favourites');
    });
    
    // Check clear button
    const clearButton = screen.getByText(/Clear All/i);
    expect(clearButton).toHaveAttribute('aria-label', 'Clear all favourites');
  });
});