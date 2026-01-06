import { filterProperties } from '../utils/searchLogic';

test('Search: Filters by house type', () => {
  const properties = [
    { type: 'House', price: 300000, bedrooms: 3 },
    { type: 'Flat', price: 200000, bedrooms: 2 },
    { type: 'House', price: 400000, bedrooms: 4 }
  ];
  
  const result = filterProperties(properties, { type: 'House' });
  
  expect(result.length).toBe(2); // Should find 2 houses
  expect(result[0].type).toBe('House');
  expect(result[1].type).toBe('House');
});

test('Search: Filters by price range', () => {
  const properties = [
    { price: 200000 },
    { price: 300000 },
    { price: 400000 }
  ];
  
  const result = filterProperties(properties, { minPrice: 250000, maxPrice: 350000 });
  
  expect(result.length).toBe(1); // Only 300000 is in range
  expect(result[0].price).toBe(300000);
});

test('Search: Finds properties with 3+ bedrooms', () => {
  const properties = [
    { bedrooms: 2 },
    { bedrooms: 3 },
    { bedrooms: 4 },
    { bedrooms: 1 }
  ];
  
  const result = filterProperties(properties, { minBedrooms: 3 });
  
  expect(result.length).toBe(2); // 3 and 4 bedrooms
  expect(result[0].bedrooms).toBeGreaterThanOrEqual(3);
});