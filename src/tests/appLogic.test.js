test('Favourites: Cannot add same property twice', () => {
  const favourites = [
    { id: 1, type: 'House' },
    { id: 2, type: 'Flat' }
  ];
  
  const newProperty = { id: 2, type: 'Flat' }; // Same as existing
  
  const isAlreadyFavourite = favourites.some(fav => fav.id === newProperty.id);
  
  expect(isAlreadyFavourite).toBe(true); // Should detect duplicate
});

test('Favourites: Can remove property', () => {
  let favourites = [
    { id: 1, type: 'House' },
    { id: 2, type: 'Flat' },
    { id: 3, type: 'House' }
  ];
  
  // Remove property with id 2
  favourites = favourites.filter(fav => fav.id !== 2);
  
  expect(favourites.length).toBe(2);
  expect(favourites.find(f => f.id === 2)).toBeUndefined();
});