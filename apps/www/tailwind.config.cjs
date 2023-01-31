const config = require('tailwind-config');
const radixColors = require('radix-colors-plugin');

module.exports = {
  ...config,
  plugins: [
    radixColors({ colors: ['violet', 'mauve'], mappings: { brand: 'violet', neutral: 'mauve' } }),
  ],
};
