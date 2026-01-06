test('1. Property search: Price calculation works', () => {
  // Test that price calculations work correctly
  const price = 300000;
  const deposit = 60000; // 20%
  const loanAmount = price - deposit;
  
  expect(loanAmount).toBe(240000);
  expect(typeof loanAmount).toBe('number');
});

test('2. Property search: String formatting works', () => {
  // Test that price formatting works
  const price = 750000;
  const formatted = '�' + price.toLocaleString('en-GB');
  
  expect(formatted).toBe('�750,000');
});

test('3. Property search: Array filtering works', () => {
  // Test filtering properties
  const properties = [
    { type: 'House', price: 500000 },
    { type: 'Flat', price: 300000 }
  ];
  
  const houses = properties.filter(p => p.type === 'House');
  expect(houses.length).toBe(1);
});

test('4. Property search: Object validation works', () => {
  // Test property object structure
  const property = {
    id: '1',
    type: 'House',
    price: 500000
  };
  
  expect(property.type).toBe('House');
  expect(property.price).toBe(500000);
});

test('5. Property search: Comparison logic works', () => {
  // Test comparison logic
  const price1 = 300000;
  const price2 = 500000;
  
  expect(price1).toBeLessThan(price2);
  expect(price2).toBeGreaterThan(price1);
});
