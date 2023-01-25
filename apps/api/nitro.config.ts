import { defineNitroConfig } from 'nitropack';
import Path from 'path';

export default defineNitroConfig({
  srcDir: './src',
  storage: {
    db: {
      driver: 'fs',
      base: Path.join(__dirname, 'data'),
    },
  },
});
