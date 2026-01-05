export const filterProperties = (properties, criteria) => {
  let filtered = [...properties];

  // Type filter
  if (criteria.type && criteria.type !== 'any') {
    filtered = filtered.filter(p => p.type === criteria.type);
  }

  // Price filter
  if (criteria.minPrice) {
    filtered = filtered.filter(p => p.price >= parseInt(criteria.minPrice));
  }
  if (criteria.maxPrice) {
    filtered = filtered.filter(p => p.price <= parseInt(criteria.maxPrice));
  }

  // Bedrooms filter
  if (criteria.minBedrooms) {
    filtered = filtered.filter(p => p.bedrooms >= parseInt(criteria.minBedrooms));
  }
  if (criteria.maxBedrooms) {
    filtered = filtered.filter(p => p.bedrooms <= parseInt(criteria.maxBedrooms));
  }

  // Date filter
  if (criteria.dateFrom) {
    filtered = filtered.filter(p => new Date(p.added) >= new Date(criteria.dateFrom));
  }
  if (criteria.dateTo) {
    filtered = filtered.filter(p => new Date(p.added) <= new Date(criteria.dateTo));
  }

  // Postcode filter
  if (criteria.postcode) {
    filtered = filtered.filter(p => 
      p.postcode.toLowerCase().includes(criteria.postcode.toLowerCase())
    );
  }

  return filtered;
};

// JSX encoding function for security
export const encodeJSX = (text) => {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};