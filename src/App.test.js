import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// Mock fetch for properties
const mockProperties = {
  properties: [
    {
      id: "prop1",
      type: "House",
      bedrooms: 3,
      price: 750000,
      description: "Test property 1",
      location: "Test Location BR1",
      postcode: "BR1",
      pictures: ["test1.jpg", "test2.jpg"],
      added: "2023-01-15",
      tenure: "Freehold",
      coordinates: { lat: 51.5, lng: -0.1 }
    },
    {
      id: "prop2",
      type: "Flat",
      bedrooms: 2,
      price: 399995,
      description: "Test property 2",
      location: "Test Location NW1",
      postcode: "NW1",
      pictures: ["test3.jpg", "test4.jpg"],
      added: "2023-02-20",
      tenure: "Leasehold",
      coordinates: { lat: 51.52, lng: -0.12 }
    },
    {
      id: "prop3",
      type: "House",
      bedrooms: 4,
      price: 1200000,
      description: "Test property 3",
      location: "Test Location WC1",
      postcode: "WC1",
      pictures: ["test5.jpg", "test6.jpg"],
      added: "2023-03-10",
      tenure: "Freehold",
      coordinates: { lat: 51.51, lng: -0.13 }
    }
  ]
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockProperties)
  })
);

beforeEach(() => {
  fetch.mockClear();
  localStorage.clear();
});

describe('Property Search Application - Comprehensive Tests', () => {
  test('1. Application loads and displays initial properties', async () => {
    render(<App />);
    
    // Check header
    expect(await screen.findByText(/RightMove Property Search/i)).toBeInTheDocument();
    
    // Check welcome message
    expect(screen.getByText(/Welcome to Property Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Total properties available: 3/i)).toBeInTheDocument();
    
    // Check search form is present
    expect(screen.getByLabelText(/Property Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Min Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Search Properties/i)).toBeInTheDocument();
  });

  test('2. Search functionality with single criteria', async () => {
    render(<App />);
    
    // Wait for properties to load
    await screen.findByText(/Welcome to Property Search/i);
    
    // Search by property type
    const typeSelect = screen.getByLabelText(/Property Type/i);
    fireEvent.change(typeSelect, { target: { value: 'House' } });
    
    const searchButton = screen.getByText(/Search Properties/i);
    fireEvent.click(searchButton);
    
    // Should show only houses
    await waitFor(() => {
      expect(screen.getByText(/Available Properties \(2\)/i)).toBeInTheDocument();
    });
  });

  test('3. Search functionality with multiple criteria', async () => {
    render(<App />);
    
    await screen.findByText(/Welcome to Property Search/i);
    
    // Set multiple search criteria
    fireEvent.change(screen.getByLabelText(/Property Type/i), { 
      target: { value: 'House' } 
    });
    fireEvent.change(screen.getByPlaceholderText(/Min price/i), {
      target: { value: '500000' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Max price/i), {
      target: { value: '1000000' }
    });
    
    fireEvent.click(screen.getByText(/Search Properties/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Available Properties \(1\)/i)).toBeInTheDocument();
    });
  });

  test('4. Favourites functionality - Add and Remove', async () => {
    render(<App />);
    
    await screen.findByText(/Welcome to Property Search/i);
    
    // Perform search to see properties
    fireEvent.click(screen.getByText(/Search Properties/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Available Properties \(3\)/i)).toBeInTheDocument();
    });
    
    // Initially no favourites
    expect(screen.getByText(/No favourites yet/i)).toBeInTheDocument();
    
    // Find and click favourite button on first property
    const favouriteButtons = screen.getAllByLabelText(/Add to favourites/i);
    expect(favouriteButtons.length).toBeGreaterThan(0);
    
    fireEvent.click(favouriteButtons[0]);
    
    // Should now have 1 favourite
    expect(screen.getByText(/Favourites \(1\)/i)).toBeInTheDocument();
    
    // Remove from favourites
    const removeButtons = screen.getAllByLabelText(/Remove from favourites/i);
    fireEvent.click(removeButtons[0]);
    
    // Should be back to no favourites
    expect(screen.getByText(/No favourites yet/i)).toBeInTheDocument();
  });

  test('5. Favourites persistence with localStorage', async () => {
    render(<App />);
    
    await screen.findByText(/Welcome to Property Search/i);
    fireEvent.click(screen.getByText(/Search Properties/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Available Properties \(3\)/i)).toBeInTheDocument();
    });
    
    // Add to favourites
    const favouriteButtons = screen.getAllByLabelText(/Add to favourites/i);
    fireEvent.click(favouriteButtons[0]);
    
    // Check localStorage was updated
    expect(JSON.parse(localStorage.getItem('propertyFavourites'))).toHaveLength(1);
    
    // Simulate page reload/remount
    const { unmount } = render(<App />);
    unmount();
    
    // Re-render app
    render(<App />);
    
    // Favourites should persist
    await waitFor(() => {
      expect(screen.getByText(/Favourites \(1\)/i)).toBeInTheDocument();
    });
  });

  test('6. Clear all favourites functionality', async () => {
    render(<App />);
    
    await screen.findByText(/Welcome to Property Search/i);
    fireEvent.click(screen.getByText(/Search Properties/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Available Properties \(3\)/i)).toBeInTheDocument();
    });
    
    // Add multiple favourites
    const favouriteButtons = screen.getAllByLabelText(/Add to favourites/i);
    fireEvent.click(favouriteButtons[0]);
    fireEvent.click(favouriteButtons[1]);
    
    expect(screen.getByText(/Favourites \(2\)/i)).toBeInTheDocument();
    
    // Clear all favourites
    const clearButton = screen.getByText(/Clear All/i);
    fireEvent.click(clearButton);
    
    // Should be empty
    expect(screen.getByText(/No favourites yet/i)).toBeInTheDocument();
  });

  test('7. Property page navigation and tabs', async () => {
    render(<App />);
    
    await screen.findByText(/Welcome to Property Search/i);
    fireEvent.click(screen.getByText(/Search Properties/i));
    
    await waitFor(() => {
      expect(screen.getByText(/Available Properties \(3\)/i)).toBeInTheDocument();
    });
    
    // Click "View Details" on first property
    const viewButtons = screen.getAllByText(/View Details/i);
    fireEvent.click(viewButtons[0]);
    
    // Should be on property page
    expect(screen.getByText(/Back to Search/i)).toBeInTheDocument();
    expect(screen.getByText(/Test property 1/i)).toBeInTheDocument();
    
    // Check tabs are present
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/Floor Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
  });

  test('8. Responsive design elements', () => {
    render(<App />);
    
    // Check responsive CSS classes are present
    const appContainer = document.querySelector('.app-container');
    expect(appContainer).toBeInTheDocument();
    
    const searchForm = document.querySelector('.search-form');
    expect(searchForm).toBeInTheDocument();
    
    // Check grid layouts
    const formGrid = document.querySelector('.form-grid');
    expect(formGrid).toHaveStyle('display: grid');
    
    const propertiesGrid = document.querySelector('.properties-grid');
    expect(propertiesGrid).toBeInTheDocument();
  });

  test('9. Security implementation verification', () => {
    render(<App />);
    
    // Check security badge
    expect(screen.getByText(/Client-Side Security/i)).toBeInTheDocument();
    
    // Check no inline event handlers (React handles these differently)
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      // In React, onclick handlers are added differently
      expect(button.getAttribute('onclick')).toBeNull();
    });
    
    // Check for CSP meta tag in head
    const metaTags = document.getElementsByTagName('meta');
    let hasCSP = false;
    for (let meta of metaTags) {
      if (meta.getAttribute('http-equiv') === 'Content-Security-Policy') {
        hasCSP = true;
        break;
      }
    }
    expect(hasCSP).toBe(true);
  });

  test('10. Form validation and reset functionality', async () => {
    render(<App />);
    
    await screen.findByText(/Welcome to Property Search/i);
    
    // Fill form with values
    const minPriceInput = screen.getByPlaceholderText(/Min price/i);
    const maxPriceInput = screen.getByPlaceholderText(/Max price/i);
    const postcodeInput = screen.getByPlaceholderText(/e.g., BR1, NW1/i);
    
    fireEvent.change(minPriceInput, { target: { value: '100000' } });
    fireEvent.change(maxPriceInput, { target: { value: '500000' } });
    fireEvent.change(postcodeInput, { target: { value: 'BR1' } });
    
    // Verify values are set
    expect(minPriceInput.value).toBe('100000');
    expect(maxPriceInput.value).toBe('500000');
    expect(postcodeInput.value).toBe('BR1');
    
    // Test reset functionality
    const resetButton = screen.getByText(/Reset Filters/i);
    fireEvent.click(resetButton);
    
    // Verify form is cleared
    expect(minPriceInput.value).toBe('');
    expect(maxPriceInput.value).toBe('');
    expect(postcodeInput.value).toBe('');
    
    // Verify property type resets to 'any'
    expect(screen.getByLabelText(/Property Type/i).value).toBe('any');
  });

  test('11. Date filter functionality', async () => {
    render(<App />);
    
    await screen.findByText(/Welcome to Property Search/i);
    
    // Set date filters
    const dateFromInput = screen.getByLabelText(/Added After/i);
    const dateToInput = screen.getByLabelText(/Added Before/i);
    
    fireEvent.change(dateFromInput, { target: { value: '2023-02-01' } });
    fireEvent.change(dateToInput, { target: { value: '2023-03-31' } });
    
    fireEvent.click(screen.getByText(/Search Properties/i));
    
    await waitFor(() => {
      // Should show properties added between Feb and Mar 2023
      expect(screen.getByText(/Available Properties \(2\)/i)).toBeInTheDocument();
    });
  });

  test('12. Postcode filter functionality', async () => {
    render(<App />);
    
    await screen.findByText(/Welcome to Property Search/i);
    
    // Filter by postcode
    const postcodeInput = screen.getByPlaceholderText(/e.g., BR1, NW1/i);
    fireEvent.change(postcodeInput, { target: { value: 'BR1' } });
    
    fireEvent.click(screen.getByText(/Search Properties/i));
    
    await waitFor(() => {
      // Should show only BR1 properties
      expect(screen.getByText(/Available Properties \(1\)/i)).toBeInTheDocument();
    });
  });

  test('13. No results message display', async () => {
    render(<App />);
    
    await screen.findByText(/Welcome to Property Search/i);
    
    // Set impossible search criteria
    fireEvent.change(screen.getByPlaceholderText(/Min price/i), {
      target: { value: '5000000' } // 5 million - no properties match
    });
    
    fireEvent.click(screen.getByText(/Search Properties/i));
    
    await waitFor(() => {
      expect(screen.getByText(/No properties match your search criteria/i)).toBeInTheDocument();
      expect(screen.getByText(/Try adjusting your filters/i)).toBeInTheDocument();
    });
  });

  test('14. Bedroom filter functionality', async () => {
    render(<App />);
    
    await screen.findByText(/Welcome to Property Search/i);
    
    // Filter by bedrooms
    fireEvent.change(screen.getByPlaceholderText(/Min Bedrooms/i), {
      target: { value: '3' }
    });
    
    fireEvent.click(screen.getByText(/Search Properties/i));
    
    await waitFor(() => {
      // Should show properties with 3+ bedrooms
      expect(screen.getByText(/Available Properties \(2\)/i)).toBeInTheDocument();
    });
  });

  test('15. Price formatting verification', async () => {
    render(<App />);
    
    await screen.findByText(/Welcome to Property Search/i);
    fireEvent.click(screen.getByText(/Search Properties/i));
    
    await waitFor(() => {
      // Check prices are formatted as currency
      const priceElements = screen.getAllByText(/£/);
      expect(priceElements.length).toBeGreaterThan(0);
      
      // Check specific formatting
      expect(screen.getByText(/£750,000/)).toBeInTheDocument();
      expect(screen.getByText(/£399,995/)).toBeInTheDocument();
      expect(screen.getByText(/£1,200,000/)).toBeInTheDocument();
    });
  });
});