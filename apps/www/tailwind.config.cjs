const radixColors = require('radix-colors-plugin');

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['index.html', 'src/**/*.{css,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
    },
  },
  darkMode: 'class',
  plugins: [
    radixColors({
      colors: ['violet', 'mauve', 'red'],
      mappings: { brand: 'violet', neutral: 'mauve' },
    }),
  ],
};

module.exports = config;
