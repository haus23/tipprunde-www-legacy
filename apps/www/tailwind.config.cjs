const radixColors = require('radix-colors-plugin');

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['index.html', 'src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
    },
  },
  darkMode: 'class',
  plugins: [
    radixColors({ colors: ['violet', 'mauve'], mappings: { brand: 'violet', neutral: 'mauve' } }),
  ],
};

module.exports = config;
