const plugin = require('tailwindcss/plugin');
const radixColors = require('@radix-ui/colors');

const radixColorsPlugin = plugin.withOptions(
  function (options) {
    return function ({ addComponents, addBase }) {
      let radixStyles = {};
      let lightColors = {};
      let darkColors = {};
      let radix = options.colors ?? [];
      radix.forEach((color) => {
        const light = { ...radixColors[color] };
        Object.keys(light).forEach(
          (oldKey) =>
            delete Object.assign(light, {
              ['--' + oldKey]: light[oldKey],
            })[oldKey]
        );
        const dark = { ...radixColors[color + 'Dark'] };
        Object.keys(dark).forEach(
          (oldKey) =>
            delete Object.assign(dark, {
              ['--' + oldKey]: dark[oldKey],
            })[oldKey]
        );
        darkColors = { ...darkColors, ...dark };
        lightColors = { ...lightColors, ...light };
        const styles = {
          ['.' + color + '-bg']: {
            backgroundColor: `var(--${color}3)`,
          },
          ['.' + color + '-bg-int']: {
            backgroundColor: `var(--${color}3)`,
          },
          ['.' + color + '-bg-int:hover']: {
            backgroundColor: `var(--${color}4)`,
          },
          ['.' + color + '-bg-int:focus']: {
            backgroundColor: `var(--${color}5)`,
          },
          ['.' + color + '-cta']: {
            backgroundColor: `var(--${color}4)`,
          },
          ['.' + color + '-cta-int']: {
            backgroundColor: `var(--${color}4)`,
          },
          ['.' + color + '-cta-int:hover']: {
            backgroundColor: `var(--${color}5)`,
          },
          ['.' + color + '-cta-int:focus']: {
            backgroundColor: `var(--${color}6)`,
          },
          ['.' + color + '-border']: {
            borderColor: `var(--${color}6)`,
          },
          ['.' + color + '-border-int']: {
            borderColor: `var(--${color}7)`,
          },
          ['.' + color + '-border-int:hover']: {
            borderColor: `var(--${color}8)`,
          },
          ['.' + color + '-solid']: {
            backgroundColor: `var(--${color}9)`,
          },
          ['.' + color + '-solid-int']: {
            backgroundColor: `var(--${color}9)`,
          },
          ['.' + color + '-solid-int:hover']: {
            backgroundColor: `var(--${color}10)`,
          },
        };
        radixStyles = { ...radixStyles, ...styles };
      });
      addBase({
        ':root': {
          ...lightColors,
        },
        '.dark': {
          ...darkColors,
        },
      });
      addComponents(radixStyles);

      // Add mappings
      mappedStyles = {};
      mappings = options.mappings ?? {};
      for (const [name, color] of Object.entries(mappings)) {
        const styles = {
          ['.' + name + '-app-bg']: {
            backgroundColor: `var(--${color}1)`,
          },
          ['.' + name + '-app-bg-subtl']: {
            backgroundColor: `var(--${color}2)`,
          },
          ['.' + name + '-bg']: {
            backgroundColor: `var(--${color}3)`,
          },
          ['.' + name + '-bg-int']: {
            backgroundColor: `var(--${color}3)`,
          },
          ['.' + name + '-bg-int:hover']: {
            backgroundColor: `var(--${color}4)`,
          },
          ['.' + name + '-bg-int:focus']: {
            backgroundColor: `var(--${color}5)`,
          },
          ['.' + name + '-cta']: {
            backgroundColor: `var(--${color}4)`,
          },
          ['.' + name + '-cta-int']: {
            backgroundColor: `var(--${color}4)`,
          },
          ['.' + name + '-cta-int:hover']: {
            backgroundColor: `var(--${color}5)`,
          },
          ['.' + name + '-cta-int:focus']: {
            backgroundColor: `var(--${color}6)`,
          },
          ['.' + name + '-border']: {
            borderColor: `var(--${color}6)`,
          },
          ['.' + name + '-border-int']: {
            borderColor: `var(--${color}7)`,
          },
          ['.' + name + '-border-int:hover']: {
            borderColor: `var(--${color}8)`,
          },
          ['.' + name + '-solid']: {
            backgroundColor: `var(--${color}9)`,
          },
          ['.' + name + '-solid-int']: {
            backgroundColor: `var(--${color}9)`,
          },
          ['.' + name + '-solid-int:hover']: {
            backgroundColor: `var(--${color}10)`,
          },
          ['.' + name + '-app-text']: {
            color: `var(--${color}11)`,
          },
          ['.' + name + '-app-text-contrast']: {
            color: `var(--${color}12)`,
          },
        };
        mappedStyles = { ...mappedStyles, ...styles };
      }
      addComponents(mappedStyles);
    };
  },
  function (options) {
    const chosen = options.colors ?? [];
    const filtered = Object.keys(radixColors)
      .filter((color) => chosen.includes(color) && !color.includes('A') && !color.includes('Dark'))
      .reduce((obj, key) => {
        Object.keys(radixColors[key]).forEach((color) => (obj[color] = `var(--${color})`));
        return obj;
      }, {});
    return {
      theme: {
        extend: {
          colors: {
            radix: {
              ...filtered,
            },
          },
        },
      },
      safelist: ['dark'],
    };
  }
);

module.exports = radixColorsPlugin;
