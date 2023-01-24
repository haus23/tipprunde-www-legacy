import { defineNitroConfig } from 'nitropack';
export default defineNitroConfig({
  srcDir: './src',
  storage: {
    db: {
      driver: 'redis',
      /* redis connector options */
    },
  },
  devStorage: {
    db: {
      driver: 'fs',
      base: './data',
    },
  },
});
