# Radix colors plugin for Tailwind

> Fork of https://github.com/samrobbins85/radix-colors-for-tailwind
>
> Main changes:
>
> - Update tailwind version
> - Safelist dark class
>
> Todo: typings

This adds the [radix color palette](https://www.radix-ui.com/colors) to Tailwind CSS

## Usage

You can add this plugin under the `plugins` key of your `tailwind.config.js` as follows:

```js
plugins: [
    require("radix-colors-plugin")({
      colors: ["blue", "cyan", "lime"],
    }),
],
```

Replace the colours in the `colors` array with whatever colours you want including

Colours can then be accessed under the `radix` property, so the second step of blue would be `radix-blue2`, or if you were to use this for example with text colour, `text-radix-blue2`.

## Additional features

This package also includes a range of component classes to speed up development, these are based on the suggestions for how to use [the scale](https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale)

### `color-bg`

If you do `color-bg` e.g. `blue-bg`, you will get a background color of step `3`, this follows the pattern explained [here](https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale#steps-35-component-backgrounds). If you want to make this interactive, instead use the class `color-bg-int`, and you will also have states for hover and focus.

### `color-cta`

Following a similar pattern, `color-cta` will give you a background color of step `4` for a darker look, and similarly gives you the option of `color-cta-int` to have hover and focus states

### `color-border`

If you want to add borders to your components, you can use the `color-border` pattern, this uses step `6` by default, but will use step `7` if you do `color-border-int`

### `color-solid`

If you want solid backgrounds to your components rather than the lighter ones provided by the other classes, then you can use `color-solid`, giving you a background of step `9`, again, there's a `color-solid-int` option that also gives you a hover state at step `10`

## Additions by me

You can add a semantic mapping:

```js
plugins: [
    require("radix-colors-plugin")({
      colors: ["blue", "cyan", "lime", "violet", "mauve"],
      mappings: { "brand": "violet", "neutral": "mauve" }
    }),
],
```

The mapped colors must be in the colors array.

This will generate additional component classes `brand-bg`, `brand-bg-int`,`neutral-bg`, ... and
the following helper classes:

### `name-app-bg`

Will give you background-color of mapped color of step 1

### `name-app-bg-subtl`

Will give you background-color of mapped color of step 2

### `name-app-text`

Will give you background-color of mapped color of step 11

### `name-app-text-contrast`

Will give you background-color of mapped color of step 12
