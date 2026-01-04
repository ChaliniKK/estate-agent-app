import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../SearchForm';

describe('SearchForm Component - Comprehensive Tests', () => {
  const mockOnSearch = jest.fn();
  
  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('1. Renders all form elements with proper labels', () => {
    render(<SearchForm onSearch={mockOnSearch} properties={[]} />);
    
    // Check all form controls
    expect(screen.getByLabelText(/Property Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Min Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Max Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Min Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Max Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Added After/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Added Before/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postcode Area/i)).toBeInTheDocument();
    
    // Check buttons
    expect(screen.getByText(/Search Properties/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset Filters/i)).toBeInTheDocument();
  });

  test('2. Property type dropdown has correct options', () => {
    render(<SearchForm onSearch={mockOnSearch} properties={[]} />);
    
    const typeSelect = screen.getByLabelText(/Property Type/i);
    expect(typeSelect).toHaveValue('any');
    
    // Check options
    const options = typeSelect.querySelectorAll('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveValue('any');
    expect(options[1]).toHaveValue('House');
    expect(options[2]).toHaveValue('Flat');
  });

  test('3. Form submission with complete data', () => {
    render(<SearchForm onSearch={mockOnSearch} properties={[]} />);
    
    // Fill all form fields
    fireEvent.change(screen.getByLabelText(/Property Type/i), {
      target: { value: 'House' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Min price/i), {
      target: { value: '100000' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Max price/i), {
      target: { value: '500000' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Min/i), {
      target: { value: '2' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Max/i), {
      target: { value: '4' }
    });
    fireEvent.change(screen.getByLabelText(/Added After/i), {
      target: { value: '2023-01-01' }
    });
    fireEvent.change(screen.getByLabelText(/Added Before/i), {
      target: { value: '2023-12-31' }
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g., BR1, NW1/i), {
      target: { value: 'BR1' }
    });
    
    // Submit form
    fireEvent.click(screen.getByText(/Search Properties/i));
    
    // Verify onSearch called with correct data
    expect(mockOnSearch).toHaveBeenCalledWith({
      type: 'House',
      minPrice: '100000',
      maxPrice: '500000',
      minBedrooms: '2',
      maxBedrooms: '4',
      dateFrom: '2023-01-01',
      dateTo: '2023-12-31',
      postcode: 'BR1'
    });
  });

  test('4. Form reset functionality', () => {
    render(<SearchForm onSearch={mockOnSearch} properties={[]} />);
    
    // Fill some fields
    fireEvent.change(screen.getByPlaceholderText(/Min price/i), {
      target: { value: '100000' }
    });
    fireEvent.change(screen.getByPlaceholderText(/e.g., BR1, NW1/i), {
      target: { value: 'BR1' }
    });
    fireEvent.change(screen.getByLabelText(/Property Type/i), {
      target: { value: 'Flat' }
    });
    
    // Reset form
    fireEvent.click(screen.getByText(/Reset Filters/i));
    
    // Verify fields are cleared/reset
    expect(screen.getByPlaceholderText(/Min price/i).value).toBe('');
    expect(screen.getByPlaceholderText(/e.g., BR1, NW1/i).value).toBe('');
    expect(screen.getByLabelText(/Property Type/i).value).toBe('any');
    
    // Verify onSearch called with empty criteria (showing all)
    expect(mockOnSearch).toHaveBeenCalledWith({});
  });

  test('5. Partial form submission (single criteria)', () => {
    render(<SearchForm onSearch={mockOnSearch} properties={[]} />);
    
    // Fill only one field
    fireEvent.change(screen.getByPlaceholderText(/Min price/i), {
      target: { value: '200000' }
    });
    
    fireEvent.click(screen.getByText(/Search Properties/i));
    
    expect(mockOnSearch).toHaveBeenCalledWith({
      type: 'any',
      minPrice: '200000',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: '',
      dateTo: '',
      postcode: ''
    });
  });

  test('6. Number input validation', () => {
    render(<SearchForm onSearch={mockOnSearch} properties={[]} />);
    
    const minPriceInput = screen.getByPlaceholderText(/Min price/i);
    const maxPriceInput = screen.getByPlaceholderText(/Max price/i);
    
    // Test negative numbers
    fireEvent.change(minPriceInput, { target: { value: '-100' } });
    fireEvent.change(maxPriceInput, { target: { value: '-50' } });
    
    // HTML5 validation should prevent negative, but we'll check
    expect(minPriceInput).toHaveAttribute('min', '0');
    expect(maxPriceInput).toHaveAttribute('min', '0');
  });

  test('7. Postcode pattern validation', () => {
    render(<SearchForm onSearch={mockOnSearch} properties={[]} />);
    
    const postcodeInput = screen.getByPlaceholderText(/e.g., BR1, NW1/i);
    
    // Check pattern attribute exists
    expect(postcodeInput).toHaveAttribute('pattern', '[A-Za-z]{1,2}[0-9]{1,2}');
    expect(postcodeInput).toHaveAttribute('title', 'Enter postcode area (e.g., BR1, NW1)');
  });

  test('8. Form accessibility features', () => {
    render(<SearchForm onSearch={mockOnSearch} properties={[]} />);
    
    // Check all inputs have proper labels
    const inputs = screen.getAllByRole('textbox', 'spinbutton', 'combobox');
    inputs.forEach(input => {
      expect(input).toHaveAttribute('id');
      const label = document.querySelector(`label[for="${input.id}"]`);
      expect(label).toBeInTheDocument();
    });
    
    // Check buttons have proper types
    expect(screen.getByText(/Search Properties/i)).toHaveAttribute('type', 'submit');
    expect(screen.getByText(/Reset Filters/i)).toHaveAttribute('type', 'button');
  });

  test('9. Default form state', () => {
    render(<SearchForm onSearch={mockOnSearch} properties={[]} />);
    
    expect(screen.getByLabelText(/Property Type/i)).toHaveValue('any');
    expect(screen.getByPlaceholderText(/Min price/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/Max price/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/Min/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/Max/i)).toHaveValue('');
    expect(screen.getByLabelText(/Added After/i)).toHaveValue('');
    expect(screen.getByLabelText(/Added Before/i)).toHaveValue('');
    expect(screen.getByPlaceholderText(/e.g., BR1, NW1/i)).toHaveValue('');
  });
});