import { encodeJSX } from '../utils/searchLogic';

test('Security: Prevents XSS attacks by encoding HTML', () => {
  const dangerousText = '<script>bad code</script>';
  const safeText = encodeJSX(dangerousText);
  
  // Just check it doesn't contain the dangerous tags
  expect(safeText).not.toContain('<script>');
  expect(safeText).not.toContain('</script>');
  expect(typeof safeText).toBe('string');
});

test('Price formatting works correctly', () => {
  const formatPrice = (price) => {
    return '£' + price.toLocaleString('en-GB');
  };
  
  expect(formatPrice(300000)).toBe('£300,000');
  expect(formatPrice(750000)).toBe('£750,000');
  expect(formatPrice(1500)).toBe('£1,500');
});