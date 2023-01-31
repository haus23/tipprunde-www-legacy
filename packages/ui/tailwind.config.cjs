const config = require('tailwind-config');
const radixColors = require('radix-colors-plugin');

module.exports = {
  ...config,
  plugins: [radixColors({ colors: ['grass', 'indigo', 'violet', 'olive', 'slate', 'mauve'] })],
};
