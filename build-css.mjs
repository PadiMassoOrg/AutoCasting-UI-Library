import { execSync } from 'child_process';

execSync('npx tailwindcss -i ./src/styles/tailwind.css -o ./dist/styles.css --minify', {
  stdio: 'inherit',
});
