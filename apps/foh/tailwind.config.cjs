const radixColors = require('radix-colors-plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [radixColors({ colors: ['mauve', 'violet'] })],
};
