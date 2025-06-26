// scripts/fix-tailwind.mjs
import { existsSync, mkdirSync, chmodSync, createWriteStream } from 'fs';
import { dirname } from 'path';
import https from 'https';

const BIN_PATH = './node_modules/.bin/tailwindcss';
const TAILWIND_URL = 'https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64';

// Solo descargar si no existe
if (!existsSync(BIN_PATH)) {
  console.log('🔧 Tailwind bin not found. Downloading...');

  mkdirSync(dirname(BIN_PATH), { recursive: true });

  const file = createWriteStream(BIN_PATH);
  https
    .get(TAILWIND_URL, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          chmodSync(BIN_PATH, 0o755);
          console.log('✅ Tailwind downloaded and ready.');
        });
      });
    })
    .on('error', (err) => {
      console.error('❌ Error downloading Tailwind:', err);
    });
} else {
  console.log('✅ Tailwind binary already exists.');
}
